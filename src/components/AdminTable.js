import React from "react";


const AdminTable = (props) => {
  return (
    <div class="cart-table table-responsive ">
      <table style={props.style} className={props.className}>
        {props.children}
      </table>
    </div>
  );
};

export default AdminTable;
