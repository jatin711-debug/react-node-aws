import Layout from '../../../components/Layout'
import { useState, useEffect} from 'react';
import axios from 'axios';
import {API} from '../../../config';
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alert';
const Create = () =>{
    const [state, setState] = useState({
        title: '',
        url: '',
        categories: [],
        loadedCategories:[],
        success:'',
        error:'',
        medium:''
    });

    const {title, url, categories, loadedCategories, success, error, medium} = state;

    useEffect(()=>{
        loadCategories();

    },[success]);

    const loadCategories = async () =>{
        try{
            const res = await axios.get(`${API}/categories`);
            setState({...state, loadedCategories:res.data});
        }catch(err){
            console.log(err);
        }
    };

    const handleChange = name => event =>{}

    const handleSubmit = async event =>{

    }

    const handleTitleChange = event =>{
        setState({...state, title:event.target.value});
    }

    const handleURLChange = event =>{
        setState({...state, url:event.target.value});
    }

    const submitLinkForm = () =>(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" className="form-control" onChange={handleTitleChange} value={title}/>
            </div>
            <div className="form-group">
                <label className="text-muted">URL</label>
                <input type="url" className="form-control" onChange={handleURLChange} value={url}/>
            </div>
            <div>
                <button className="btn btn-outline-warning" type="submit">Submit</button>
            </div>
        </form>
    );

    return(
        <Layout>
            <div className="row">
                <div className="col-md-12">
                <h1>Submit Link</h1>
                <br />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    xxxx
                </div>
                <div className="col-md-8">
                    {submitLinkForm()}
                </div>
            </div>
        </Layout>
    );
}

export default Create;