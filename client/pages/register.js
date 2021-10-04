import Layout from "../components/Layout"
import { useState } from "react"
import axios from "axios"
import {showSuccessMessage,showErrorMessage} from '../helpers/alert'

const RegisterPage = () => {

    const [state,setState] = useState({
        name: "jatin",
        email: "jatinmahajan712@gmail.com",
        password: "1234567",
        error: "",
        success: "",
        buttonText: "Register",
    })

    const {name,email,password,error,success,buttonText} = state;

    const handelChange = (name) => (e) =>{
        setState({...state,[name]:e.target.value,error:'',success:'',buttonText:'Register'})
    }

    const handelSubmit = async e =>{
        e.preventDefault();
        setState({...state,buttonText:'...Registering...'});

        try {
            const response = await axios.post('http://localhost:8000/api/register',{name,email,password});
            setState({...state,name:'',email:'',password:'',buttonText:'Submitted',success:response.data.message})
        } catch (error) {
            setState({...state,buttonText:'Register',error:error.response.data.error});
        }
    }

    const registerForm = ()=> (
        <form onSubmit={handelSubmit}>
            <div className="form-group">
                <input onChange={ handelChange('name') } type="text" className="form-control" value={name} placeholder="Name:" />
            </div>
            <div className="form-group">
                <input onChange={ handelChange('email') } type="email" className="form-control" value={email} placeholder="Email:" />
            </div>
            <div className="form-group">
                <input onChange={ handelChange('password') } type="password" className="form-control" value={password} placeholder="Password:" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    )
    
    return <Layout>
        <div className="col-md-6 offset-md-3">
            <h1>REGISTER</h1>
            <br />
            {success && showSuccessMessage(success)}
            {error && showErrorMessage(error)}
            {registerForm()}
            <hr />
            {JSON.stringify(state)}
        </div>

    </Layout>
}
export default RegisterPage;