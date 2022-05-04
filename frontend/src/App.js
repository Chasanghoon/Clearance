import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Main from './components/main/Main';
import SignupUser from './components/register/SignupUser';
import SignupStore from './components/register/SignupStore';
import Reservation from './components/reservation/Reservation';
import ReservationResult from './components/reservation/ReservationResult';
import Start from './components/common/Start';
import Footer from './components/common/Footer';
import Basket from './components/product/Basket';
import StoreMyPage from './components/myPage/store/StoreMyPage';
import StoreProfile from './components/myPage/store/StoreProfile';
import ProductManagement from './components/myPage/store/ProductManagement';
import CheckReservation from './components/myPage/store/CheckReservation';
import StoreCarbon from './components/myPage/store/StoreCarbon';
import UserMyPage from './components/myPage/user/UserMyPage';
import UserProfile from './components/myPage/user/UserProfile';
import BookingHistory from './components/myPage/user/BookingHistory';
import UserCarbon from './components/myPage/user/UserCarbon';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Start /> } />
          <Route path="/main" element={<Main></Main>} />
          <Route path="/signupUser" element={<SignupUser />} />
          <Route path="/signupStore" element={<SignupStore />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservationResult" element={<ReservationResult />} />

          {/* 스토어 마이페이지 */}
          <Route path="/storeMyPage" element={<StoreMyPage />} />
          <Route path="/storeProfile" element={<StoreProfile />} />
          <Route path="/productManagement" element={<ProductManagement />} />
          <Route path="/checkReservation" element={<CheckReservation />} />
          <Route path="/storeCarbon" element={<StoreCarbon />} />

          {/* 유저 마이페이지 */}
          <Route path="/userMyPage" element={<UserMyPage />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/bookingHistory" element={<BookingHistory />} />
          <Route path="/userCarbon" element={<UserCarbon />} />

          
          
          <Route path="/login" element={<Login />} />
          <Route path="/basket" element={<Basket />} />

        </Routes>
      </BrowserRouter>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;


