import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./componet/routes/AllRoute";
import { BrowserRouter } from "react-router-dom";
import Header from "./componet/header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <AllRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
