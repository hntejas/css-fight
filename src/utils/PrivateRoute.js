import { Route, Navigate, useParams } from "react-router-dom";
import { useUser } from "../store/user";

export default function PrivateRoute({ path, ...props }) {
  const { user } = useUser();
  const { fightId } = useParams();

  if (fightId) {
    path = path.replace(":fightId", fightId);
  }
  return user.isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} to="/login" replace />
  );
}
