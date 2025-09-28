import { useLocation } from "react-router-dom";
import Layout from "../layout";
import PrivateContent from "./PrivateContent";
const AuthorizedContent = () => {
  const search = useLocation().search;

  return (
    <>
      <Layout>
        <PrivateContent />
      </Layout>
    </>
  );
};

export default AuthorizedContent;
