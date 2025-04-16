import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";

function listUsers() {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({
    //visibilidade (false = oculto; true visível)
    open: false,

    //nível do alerta (sucess, error, warning, etc)
    severity: "",

    //mensagem que será exibida
    message: "",
  });
  const navigate = useNavigate();

  // Função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  // Fechar o alerta
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  async function getUsers() {
    try {
      const response = await api.getUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
      showAlert("error", "Erro ao buscar usuários");
    } 
  }

  async function deleteUser(id) {
    try {
      await api.deleteUser(id);
      await getUsers();
      showAlert("success", "Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
      showAlert(
        "error",
        error.response.data.error 
      );
    }
  }

  const listUsers = users.map((user) => (
    <TableRow key={user.id_usuario}>
      <TableCell align="center">{user.name}</TableCell>
      <TableCell align="center">{user.email}</TableCell>
      <TableCell align="center">{user.cpf}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => deleteUser(user.id_usuario)}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      {users.length === 0 ? (
        <h1>Carregando usuários</h1>
      ) : (
        <div>
          <h5>Lista de usuários</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "brown", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">CPF</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listUsers}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" onClick={logout}>
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}
export default listUsers;