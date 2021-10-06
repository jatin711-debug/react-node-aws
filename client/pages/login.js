import Layout from "../components/Layout";
import { useState,useEffect } from "react";
import Link from "next/link";
import Router from 'next/router'
import axios from "axios"
import {showSuccessMessage,showErrorMessage} from '../helpers/alert'
import {API} from '../config';
import { authenticate,isAuth } from "../helpers/auth";

const Login = () => {
    const [state,setState] = useState({
        email: "jatinmahajan712@gmail.com",
        password: "1234567",
        error: "",
        success: "",
        buttonText: "Login",
    });

    useEffect(()=>{
        isAuth() && Router.push('/')
    },[])

    const {email,password,error,success,buttonText} = state;

    const handelChange = (name) => (e) =>{
        setState({...state,[name]:e.target.value,error:'',success:'',buttonText:'Login'})
    }

    const handelSubmit = async e =>{

        e.preventDefault();
        setState({...state,buttonText:'...Logging In ...'});

        try {
            const response = await axios.post(`${API}/login`,{email,password});
            authenticate(response,() => isAuth() && isAuth().role == 'admin'? Router.push('/admin') :Router.push('/user')); 
            
        } catch (error) {
            setState({...state,buttonText:'Register',error:error.response.data.error});
        }
    }

    const loginForm = ()=> (
        <form onSubmit={handelSubmit}>
            <div className="form-group">
                <input onChange={ handelChange('email') } type="email" className="form-control" value={email} placeholder="Email:" required />
            </div>
            <div className="form-group">
                <input onChange={ handelChange('password') } type="password" className="form-control" value={password} placeholder="Password:" required />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    )
    
    return <Layout>
        <div className="col-md-6 offset-md-3">
            <h1>Login</h1>
            <br />
            {success && showSuccessMessage(success)}
            {error && showErrorMessage(error)}
            {loginForm()}
            <hr />
        </div>

    </Layout>
}
export default Login;