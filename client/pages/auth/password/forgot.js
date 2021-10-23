import {useState} from 'react';
import axios from 'axios';
import {showSuccessMessage , showErrorMessage } from '../../../helpers/alert';
import {API} from '../../../config';
import Router from 'next/router';
import Layout from '../../../components/Layout';

const ForgotPassword = ()=>{
    const [state,setState] = useState({
        email:'',
        buttonText:'Submit',
        success:'',
        error:''
    });

    const {email,buttonText,success,error} = state;
    const handelChange = (e)=>{ 
        setState({
            ...state,
            email: e.target.value,success:'',error:''
        });
    }

    const handelSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await axios.put(`${API}/forgot-password`,{email});
            setState({
                ...state,email:'',buttonText:'Done',success:response.data.message
            })
        }catch (error) {
           setState({ ...state,error:error.response.data.error,success:'' });
        }
    }

    const passwordForgotForm = ()=>(
        <form onSubmit={handelSubmit}>
            <div className="form-group">
                <input required type="text" className="form-control" placeholder="Email" value={email} onChange={handelChange}/>
            </div>
            <div> <button className="btn btn-primary">{buttonText}</button></div>
        </form>
    );

    return <Layout>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1> Forgot Password </h1>
                <br/>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {passwordForgotForm()}
            </div>
        </div>
    </Layout>
}
export default ForgotPassword