import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Start from './components/Start';
import Main from './components/main/Main'
import UserRegister from './components/register/UserRegister';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Start /> } />

          <Route path="/main" element={<Main></Main>} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


