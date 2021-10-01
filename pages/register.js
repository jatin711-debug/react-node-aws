import Layout from "../components/Layout"
import { useState } from "react"

const RegisterPage = () => {

    const [state,setState] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText: "Register",
    })


    const 

    const handelChange = (name) => (e) =>{
        setState({...state,[name]:e.target.value,error:'',success:'',buttonText:'Register'})
    }

    const handelSubmit = (e) =>{

    }

    const registerForm = ()=> (
        <form onSubmit={handelSubmit}>
            <div className="form-group">
                <input onChange={ handelChange('name') } type="text" className="form-control" placeholder="Name:" />
            </div>
            <div className="form-group">
                <input  onChange={ handelChange('email') } type="email" className="form-control" placeholder="Email:" />
            </div>
            <div className="form-group">
                <input  onChange={ handelChange('password') } type="password" className="form-control" placeholder="Password:" />
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-outline-warning">{state.buttonText}</button>
            </div>
        </form>
    )
    
    return <Layout>
        <div className="col-md-6 offset-md-3">
            <h1>REGISTER</h1>
            <br />
            {registerForm()}
        </div>

    </Layout>
}

export default RegisterPage;