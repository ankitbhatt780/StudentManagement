// import logo from "./logo.svg";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoutes from "./Componets/AllRoutes/AllRoute";
import Header from "./Componets/Layouts/Header";
// import { Time } from "./Componets/Pages/Time";
// import SideBar from "./Componets/Pages/SideBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <AllRoutes />
      </BrowserRouter>
      {/* <Time /> */}
    </div>
  );
}

export default App;
