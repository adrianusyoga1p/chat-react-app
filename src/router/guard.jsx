import { Navigate } from "react-router-dom";

const GuardedRoute = ({
  auth,
  component: Component,
  redirectPath = "/",
  ...rest
}) => {
  return auth ? (
    <Component {...rest} />
  ) : (
    <Navigate to={redirectPath} replace />
  );
};

export default GuardedRoute;
