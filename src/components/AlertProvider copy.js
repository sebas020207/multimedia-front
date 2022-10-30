import React, { useState, useMemo, createContext } from "react";
import Alert from "./Alert";

export const AlertContext = createContext({
  show: false,
  message: "",
  setMessage: () => {},
});

function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Emitter.prototype.emit = function (type) {
  if (this.events[type]) {
    this.events[type].forEach(function (listener) {
      listener();
    });
  }
};

const modal = new Emitter();
export const on = (event, handler) => {
  modal.on(event, handler);
};

const AlertProvider = (props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const onAccept = () => {
    modal.emit("accept");
    setShow(false);
  };

  const onCancel = () => {
    modal.emit("cancel");
    setShow(false);
  };

  const value = useMemo(() => ({ message, setMessage, setShow }), [
    message,
    setMessage,
    setShow,
  ]);

  return (
    <AlertContext.Provider value={value}>
      <Alert
        visible={show}
        message={message}
        onAccept={onAccept}
        onCancel={onCancel}
      />
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
