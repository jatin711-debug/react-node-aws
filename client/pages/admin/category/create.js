import {useState , useEffect} from 'react';
import Layout from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import {showSuccessMessage , showErrorMessage} from "../../../helpers/alert";
import axios from "axios";
import Resizer from 'react-image-file-resizer'; 
import {API} from "../../../config";

const Create = ({user,token})=>{
    const [state , setState] = useState({
        name:'',
        content:'',
        error:'',
        success:'',
        buttonText:'Create',
        imageUploadText:'Upload',
        image:''
    });

    const [imageUploadButton , setImageUploadButton] = useState('Upload Image'); 

    const {name , content , error , success , image , buttonText } = state;

    const handelChange = (name) => (e) =>{
        setState({...state,[name]:e.target.value,error:'',success:''});
    }

    const handelImage = (event) =>{
        let fileInput = false;
        if(event.target.files[0]){
            fileInput = true;
        }
        setImageUploadButton(event.target.files[0].name);
        if(fileInput){
            Resizer.imageFileResizer(
                event.target.files[0],
                300,
                300,
                'PNG',
                100,
                0,
                uri => {
                    setState({...state,image:uri});
                },
                'base64'
                )
        }
    }

    const handelSubmit = async (e) =>{
        e.preventDefault();
        setState({...state,buttonText:'Creating...'});
        try{
            const res = await axios.post(`${API}/category`,{name,content,image},{
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
                {imageUploadButton}
                <input required  accept="image/*" type="file" className="form-control" onChange={handelImage} hidden/>
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