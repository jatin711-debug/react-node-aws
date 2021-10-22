import Layout from "../../components/Layout"
import withAdmin from "../withAdmin";

const Admin = () => <Layout>Hello Admin!!!</Layout>

export default withAdmin(Admin);