import create from 'zustand'
import axios from 'axios';

const ReservationStore = create((set) => ({
    lat: "",
    lng: "",
    // lat: "33.450701",
    // lng: "126.570667",
    setLat: (e) => set({lat: e}),      
    setLng: (e) => set({ lng: e }), 
    
    storeId: "",
    setStoreId: (e) => set({ storeId: e }),
<<<<<<< HEAD
    bookSet: "",
    setBookSet: (e) => set({ bookSet: e }),
=======

    expdate: "99999999", // 예약 시 받게 될 최소 유통기한(max값으로 설정)
    setExpdate: (e) => set({expdate: e}),
>>>>>>> de70c822c2c8e45e4a39c7db8aa14a98ca1fa8c6
}))

export default ReservationStore;