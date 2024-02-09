import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Brands from "./views/Brands";
import Dashboard from "./views/Dashboard";
import Users from "./views/Users";
import Roles from "./views/Roles";
import EditBrand from "./views/Brands/components/EditBrand";
import Login from "./views/Login";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import EditRole from "./views/Roles/components/EditRole";
import Players from "./views/Players";
import ViewPlayer from "./views/Players/components/ViewPlayer";
import Games from "./views/Games";
import GameList from "./views/Games/components/GameList";
import ViewSingleGame from "./views/Games/components/ViewSingleGame";
import CreateGameList from "./views/Games/components/CreateGameList";

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
          path="/players"
          element={
            <ProtectedRoutes>
              <Players />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/players/:id"
          element={
            <ProtectedRoutes>
              <ViewPlayer />
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
          path="/games"
          element={
            <ProtectedRoutes>
              <Games />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/games/game-list"
          element={
            <ProtectedRoutes>
              <GameList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/games/game-list/:id"
          element={
            <ProtectedRoutes>
              <ViewSingleGame />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/games/create-game-list"
          element={
            <ProtectedRoutes>
              <CreateGameList />
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
        <Route
          path="/roles/:id"
          element={
            <ProtectedRoutes>
              <EditRole />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
