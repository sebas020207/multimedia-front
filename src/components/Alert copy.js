import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const btnStyle = {
  background: "#4d4d4d",
  color: "white",
  marginRight: '0.5rem'
};

const Alert = (props) => {
  return (
    <Modal open={props.visible} onClose={props.onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {props.message}
        </Typography>
        <div className="space-between" style={{ marginTop: "2rem" }}>
          {props.onCancel && (
            <Button onClick={props.onCancel} style={btnStyle}>
              Cancelar
            </Button>
          )}
          {props.onAccept && (
            <Button onClick={props.onAccept} style={btnStyle}>
              Aceptar
            </Button>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default Alert;
