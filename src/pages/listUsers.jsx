import { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  IconButton,
  Snackbar,
  Alert, // Importação corrigida
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../axios/axios";
import { X } from "@mui/icons-material";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []); // Esse efeito só vai rodar uma vez, quando o componente for montado

  async function getUsers() {
    try {
      const response = await api.getUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error("Erro ao deletar usuários:", error);
    }
  }

  async function deleteUser(id) {
    try {
      await api.deleteUser(id);
      await getUsers();
      showAlert("Usuário deletado com sucesso!!", "success");
      // Aqui a lista de usuários é atualizada removendo o usuário deletado
      setUsers(users.filter((user) => user.id_usuario !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      showAlert(error.response.data.message, "error");
    }
  }

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      {users.length === 0 ? (
        <h1>Carregando usuários...</h1>
      ) : (
        <div>
          <h5>Lista de usuários</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead style={{ backgroundColor: "brown" }}>
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id_usuario}>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => deleteUser(user.id_usuario)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            to="/"
            onClick={logout}
            style={{ marginTop: "10px" }}
          >
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListUsers;