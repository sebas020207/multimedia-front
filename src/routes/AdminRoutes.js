import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import AdminProducts from "../views/adminpages/AdminProducts";
import AdminAddProduct from "../views/adminpages/AdminAddProduct";
import AdminUsers from "../views/adminpages/AdminUsers";
import AdminAddUser from "../views/adminpages/AdminAddUser";
import AdminQuotes from "../views/adminpages/AdminQuotes";
import AdminQuoteDetails from "../views/adminpages/AdminQuoteDetails";
import AdminHistorical from "../views/adminpages/AdminHistorical";
import AdminHome from "../views/adminpages/AdminHome";
import AdminViewUser from "../views/adminpages/AdminViewUser";
import AdminData from "../views/adminpages/AdminData";
import useAxios from "../hooks/useAxios";
import useAlert from "../hooks/useAlert";
import UserProvider from "../components/UserProvider"; 

const AdminRoutes = (props) => {
  const history = useHistory();
  const { openAlert } = useAlert();
  const { get, post } = useAxios();

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      refreshToken();
    });
    return () => unlisten();
  }, []);

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem("refresh");
      const response = await post("admin/token/refresh", { refresh: token });
      console.log({ response });
    } catch (error) {
      console.log({ error });
    
    }
  }; 

  return(
 <UserProvider>
      <Route path="/admin/home" exact component={AdminHome} />
      <Route path="/admin/edit" exact component={AdminData} />
      <Route path="/admin/products" exact component={AdminProducts} />
      <Route path="/admin/add/product" exact component={AdminAddProduct} />
      <Route path="/admin/edit/product/:id" exact component={AdminAddProduct} />
      <Route path="/admin/users" exact component={AdminUsers} />
      <Route path="/admin/add/user" exact component={AdminAddUser} />
      <Route path="/admin/edit/user/:id" exact component={AdminAddUser} />
      <Route path="/admin/view/user/:id" exact component={AdminViewUser} />
      <Route path="/admin/quotes" exact component={AdminQuotes} />
      <Route path="/admin/quote/:id" exact component={AdminQuoteDetails} />
      <Route path="/admin/historical" exact component={AdminHistorical} />
    </UserProvider> );
};

export default AdminRoutes;
