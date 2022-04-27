import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Main from './components/Main';
import UserRegister from './components/register/UserRegister';



function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
          <Route path="/" element={ <Main /> } />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


