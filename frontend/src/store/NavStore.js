import create from 'zustand'

const NavStore = create((set) => ({
    navHeader: " ",
    setNavHeader: (e) => set({ navHeader: e }),
   
}))

export default NavStore;