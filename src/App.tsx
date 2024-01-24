import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Brands from "./views/Brands";
import Dashboard from "./views/Dahboard";
import Users from "./views/Users";
import Roles from "./views/Roles";
import EditBrand from "./views/Brands/components/EditBrand";
import Login from "./views/Login";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
      </Routes>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/brands"
          element={
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/brands/:id"
          element={
            <ProtectedRoutes>
              <EditBrand />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoutes>
              <Users />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoutes>
              <Roles />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
