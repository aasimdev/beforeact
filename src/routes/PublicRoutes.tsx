// React Imports
import { Navigate } from "react-router-dom";

const PublicRoutes = (props: any) => {
  if (localStorage.getItem("user")) {
    return <Navigate to="/brands" />;
  } else {
    return props.children;
  }
};

export default PublicRoutes;
