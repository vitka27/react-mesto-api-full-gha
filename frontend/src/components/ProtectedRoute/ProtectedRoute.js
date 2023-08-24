import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ isAuthorezed }) {
  return isAuthorezed ? <Outlet /> : <Navigate to="/sign-in" replace />;
}
