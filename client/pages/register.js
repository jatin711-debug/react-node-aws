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


    const {name,email,password,error,success,buttonText} = state

    const handelChange = (name) => (e) =>{
        setState({...state,[name]:e.target.value,error:'',success:'',buttonText:'Register'})
    }

    const handelSubmit = (e) =>{
        e.preventDefault()

        console.table({name , email, password })
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
            {registerForm()}
            <hr />
            {JSON.stringify(state)}
        </div>

    </Layout>
}

export default RegisterPage;