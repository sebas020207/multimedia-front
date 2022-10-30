
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HashRouter, Switch } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AlertProvider from "./components/AlertProvider";

function App() {
  const token = localStorage.getItem("token");
  
  const isLogged = token !== null && token !== "";

  const Routes = isLogged ? AdminRoutes : PublicRoutes;
  console.log(isLogged);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AlertProvider>
        <HashRouter>
          <Switch>
            <Routes />
          </Switch>
        </HashRouter>
      </AlertProvider>
    </LocalizationProvider>
  );
}

export default App;
