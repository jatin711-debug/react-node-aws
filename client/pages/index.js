import Layout from "../components/Layout";
import axios from 'axios';
import {API} from '../config';
import Link from "next/link";

const HomePage= ({categories}) => {

    const listCategories = ()=> categories.map((category, index) => (
        <Link href="/" key={index}>
            <a key={index} style={{border: '1px solid grey'}} className="bg-light p-3 col-md-4">
                <div>
                    <div className="row">
                        <div className="col-md-4"> 
                            <img src={ category.image && category.image.url} 
                                alt={category.name} style={{width:'100px',height:'auto'}} className="pr-3"/>
                        </div>
                        <div style={{fontSize:'20px'}}className="col-md-8"> {category.name}</div>
                    </div>
                </div>
            </a>
        </Link>
    ))
    return (
        <Layout>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="font-weight-bold">Browser All Free Links </h1>
                    <br />

                </div>
            </div>

            <div className="row">{listCategories()}</div>
    </Layout>
    );
}

HomePage.getInitialProps = async () => {
    const response = await axios.get(`${API}/categories`);

    return{
        categories: response.data
    }
}

export default HomePage;