import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUsers from "./pages/listUsers";
import ListEventos from "./pages/listEventos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEvent from "./pages/CreateEvents";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <ListUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/eventos"
            element={
              <ProtectedRoute>
                <ListEventos />
              </ProtectedRoute>
            }
          />
          <Route path="/CreateEvent" element={<CreateEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
