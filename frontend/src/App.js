import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Main from './components/main/Main';
import SignupUser from './components/register/SignupUser';
import SignupStore from './components/register/SignupStore';
import Start from './components/Start';
import Footer from './components/Footer';
import Basket from './components/product/Basket';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Start /> } />
          <Route path="/main" element={<Main></Main>} />
          <Route path="/signupUser" element={<SignupUser />} />
          <Route path="/signupStore" element={<SignupStore />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/basket" element={<Basket />} />

        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;


