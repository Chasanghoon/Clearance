import create from 'zustand'

const marketStore = create((set) => ({
    bookSet: "",
    setBookSet: (e) => set({ bookSet: e }),
    
    bookData: [],
    setBookData: (e) => set({bookdata: e}),

}))

export default marketStore;