import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./Componets/Routes/AllRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
