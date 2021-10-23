import {useState,useEffect} from 'react';
import axios from 'axios';
import {showSuccessMessage , showErrorMessage } from '../../../../helpers/alert';
import {API} from '../../../../config';
import Router,{withRouter} from 'next/router';
import Layout from '../../../../components/Layout';
import jwt from 'jsonwebtoken'


const ResetPassword = ({router}) => {
    const [state,setState] = useState({
        name:'',
        token:'',
        newPassword:'',
        buttonText:'Reset Password',
        success:'',
        error:''
    });

    const {name,token,newPassword,buttonText,success,error} = state;

    useEffect(()=>{
        const decoded = jwt.decode(router.query.id);
        if(decoded){
            setState({...state,name:decoded.name,token:router.query.id});
        }
    },[router]);
    const handelChange = (e)=>{ 
        setState({...state,newPassword:e.target.value,success:'',error:''});
    }

    const handelSubmit = async (e)=>{
        e.preventDefault();
        setState({...state,buttonText:'Resetting...'});
        try {
            const response = await axios.put(`${API}/reset-password`,{resetPasswordLink:token,newPassword});
            setState({
                ...state,newPassword:'',buttonText:'Done',success:response.data.message
            })
        }catch (error) {
           setState({ ...state,error:"Error While Resettign Password Try Again!!",success:'' });
        }
    }

    const passwordResetForm = ()=>(
        <form onSubmit={handelSubmit}>
            <div className="form-group">
                <input required type="password" className="form-control" placeholder="New Password" value={newPassword} onChange={handelChange}/>
            </div>
            <div> <button className="btn btn-primary">{buttonText}</button></div>
        </form>
    );

    return <Layout>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1> Hi {name}!!! Ready To Reset Password... </h1>
                <br/>
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {passwordResetForm()}
            </div>
        </div>
    </Layout>
}

export default withRouter(ResetPassword);