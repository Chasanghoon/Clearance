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
    bookSet: "",
    setBookSet: (e) => set({ bookSet: e }),
}))

export default ReservationStore;