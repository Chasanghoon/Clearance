import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Main from './components/main/Main';
import SignupUser from './components/register/SignupUser';
import SignupStore from './components/register/SignupStore';
import Reservation from './components/reservation/Reservation';
import ReservationResult from './components/reservation/ReservationResult';
import Start from './components/common/Start';
import Basket from './components/product/Basket';
import StoreMyPage from './components/myPage/store/StoreMyPage';
import StoreProfile from './components/myPage/store/StoreProfile';
import ProductManagement from './components/myPage/store/product/ProductManagement';
import AllProductManagement from './components/myPage/store/product/AllProductManagement';
import RegistrationProduct from './components/myPage/store/product/RegistrationProduct';
import UpdateProduct from './components/myPage/store/product/UpdateProduct';
import CheckReservation from './components/myPage/store/CheckReservation';
import StoreCarbon from './components/myPage/store/StoreCarbon';
import UserMyPage from './components/myPage/user/UserMyPage';
import UserProfile from './components/myPage/user/UserProfile';
import BookingHistory from './components/myPage/user/BookingHistory';
import UserCarbon from './components/myPage/user/UserCarbon';
import Product from './components/product/Product';
import KakaoCounseling from './components/common/KakaoCounseling';
import QrCheck from './components/myPage/store/QrCheck';
import NavBar from './components/common/NavBar';
// import Topbutton from './components/Topbutton';




function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={ <Start /> } />
          <Route path="/kakaoCounseling" element={ <KakaoCounseling /> } />
          <Route path="/main" element={<Main></Main>} />
          <Route path="/signupUser" element={<SignupUser />} />
          <Route path="/signupStore" element={<SignupStore />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservationResult" element={<ReservationResult />} />

          {/* 스토어 마이페이지 */}
          <Route path="/storeMyPage" element={<StoreMyPage />} />
          <Route path="/storeProfile" element={<StoreProfile />} />
          <Route path="/productManagement" element={<ProductManagement />} />
          <Route path="/allProductManagement" element={<AllProductManagement />} />
          <Route path="/registrationProduct" element={<RegistrationProduct />} />
          <Route path="/updateProduct" element={<UpdateProduct />} />
          <Route path="/checkReservation" element={<CheckReservation />} />
          <Route path="/storeCarbon" element={<StoreCarbon />} />
          <Route path="/QrCheck" element={<QrCheck />} />

          {/* 유저 마이페이지 */}
          <Route path="/userMyPage" element={<UserMyPage />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/bookingHistory" element={<BookingHistory />} />
          <Route path="/userCarbon" element={<UserCarbon />} />

          
          
          <Route path="/login" element={<Login />} />
          
          {/* 상품 관련 페이지 */}
          <Route path="/basket" element={<Basket />} />
          <Route path="/product" element={<Product/> } />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;


