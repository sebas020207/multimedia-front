import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export const createContextOption = (label, func) => ({ label, func });

const ContextMenu = ({ id = "", options = [], ButtonComponent = null }) => {
  const handleClick = (popupState, option) => {
    if (option.func) {
      option.func(id);
    }
    popupState.close();
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          {ButtonComponent ? (
            <ButtonComponent {...bindTrigger(popupState)} />
          ) : null}
          <Menu {...bindMenu(popupState)}>
            {options.map((op, index) => (
              <MenuItem onClick={() => handleClick(popupState, op)} key={index}>
                {op.label}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default ContextMenu;
