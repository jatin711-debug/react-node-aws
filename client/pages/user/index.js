import Layout from "../../components/Layout";
import axios from "axios";
import {API} from '../../config';
import {getCookie} from '../../helpers/auth';

const User = ({user}) => <Layout>{JSON.stringify(user)}</Layout>

User.getInitialProps = async () => {

    const token = getCookie('token');
    try {
        const response = await axios.get(`${API}/user`,{
            headers:{
                authorization: `Bearer ${token}`,
                contentType: 'application/json'
            }
        });
        return{user: response.data}

    } catch (error) {
        if(error.response.status === 401){
            return {user: 'No User'}
        }
    }
};

export default User;