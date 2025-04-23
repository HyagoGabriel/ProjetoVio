import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";

function ConfirmDelete({ open, onClose, onConfirm, userName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar exclusao</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Deseja mesmo excluir o usuario </Typography>
        <p>{userName}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="error" onClick={onConfirm}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ConfirmDelete;
