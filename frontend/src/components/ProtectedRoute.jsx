import { Redirect, Route } from "react-router-dom";
import { useUser } from "../contexts/CurrentUserContext";

function ProtectedRoute({ component: Component, isLoggedIn, ...props }) {
  const [currentUser] = useUser();

  return (
    <Route>
      {currentUser ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;
