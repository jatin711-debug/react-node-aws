import {useState , useEffect} from 'react';
import Layout from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import {showSuccessMessage , showErrorMessage} from "../../../helpers/alert";
import axios from "axios";

import {API} from "../../../config";

const Create = ({user,token})=>{
    const [state , setState] = useState({
        name:'',
        content:'',
        error:'',
        success:'',
        formData: process.browser && new FormData(),
        buttonText:'Create',
        imageUploadText:'Upload',
    });

    const {name , content , error , success , formData , buttonText , imageUploadText} = state;
    const handelChange = (name) => (e) =>{
        const value = name === 'image' ? e.target.files[0] : e.target.value;
        const imageName = name === 'image' ? e.target.files[0].name : 'Upload Image';
        formData.set(name, value);
        setState({...state,[name]:value,error:'',success:'',imageUploadText:imageName});
    }
    const handelSubmit = async (e) =>{
        e.preventDefault();
        setState({...state,buttonText:'Creating...'});
        try{
            const res = await axios.post(`${API}/category`,formData,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            });
            console.log(res);
            setState({
                ...state,
                name:'',
                content:'',
                error:'',
                success:'SuccessFully Upload in New category',
                buttonText:'Done',
                imageUploadText:'Upload',
                formData: process.browser && new FormData(),
            });
        }catch(e) {
            console.log(e);
            setState({...state,error:'Error Creating category, Try Again',success:'',buttonText:'Create'});

        }
    }
    const createCategoryForm = () => (
        <form onSubmit={handelSubmit}>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input  required type="text" className="form-control" value={name} onChange={handelChange('name')}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Content</label>
            <textarea required className="form-control" value={content} onChange={handelChange('content')}/>
        </div>
        <div className="form-group">
            <label className="btn btn-outline-secondary">
                {imageUploadText}
                <input required  accept="image/*" type="file" className="form-control" onChange={handelChange('image')} hidden/>
            </label>
        </div>

        <div>
            <button className="btn btn-outline-primary" onClick={handelSubmit}>{buttonText}</button>
        </div>
        </form>
    )

    return(
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Create Category</h1>
                    <br/>
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {createCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default withAdmin(Create);