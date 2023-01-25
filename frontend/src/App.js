import './App.css';
import { Routes, Route} from "react-router-dom"
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={ <Login/> } />
        <Route path='/register' element={ <Register/> } />
        <Route path='/' element={ <Dashboard/> } />
      </Routes>

    </div>
  );
}

export default App;