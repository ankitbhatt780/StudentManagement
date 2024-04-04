
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
//import {Table } from 'react-bootstrap';  
//import Home from './components/allroutes/Pages/sidebar';
import Allroutes from './components/allroutes/allroutes';
//import SideBar from './components/allroutes/Pages/sidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Allroutes/>
      </BrowserRouter>      
    </div>
  );
}
export default App;
