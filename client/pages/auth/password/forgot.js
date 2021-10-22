import {useState,useEffect} from 'react';
import axios from 'axios';
import {showSuccessMessage , showErrorMessage } from '../../../helpers/alert';
import {API} from '../../../config';
import Router from 'next/router';
import Layout from '../../../components/Layout';

const ForgotPassword = ()=>{
    const [state,setState] = useState({
        email:'',
        buttonText:'Submit',
        success:false,
        error:''
    });

    const {email,buttonText,success,error} = state;
    const handelChange = (e)=>{ 
        setState({
            ...state,
            email: e.target.value
        });
    }

    const handelSubmit = async (e)=>{
        e.preventDefault();

    }

    const passwordForgotForm = ()=>(
        <form onSubmit={handelSubmit}>
            <div className="form-group">
                <input require type="text" className="form-control" placeholder="Email" value={email} onChange={handelChange}/>
            </div>
            <div> <button className="btn btn-primary">{buttonText}</button></div>
        </form>
    );

    return <Layout>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1> Forgot Password </h1>
                <br/>
                {passwordForgotForm()}
            </div>
        </div>
    </Layout>
}




export default ForgotPassword