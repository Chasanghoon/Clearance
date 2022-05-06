import create from 'zustand'

const userStore = create((set) => ({
    userId: "",
    userRole: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
    userLicenseNum: "",
    userImage: "img/default_image.png",
    setUserId: (e) => set({userId: e}),
    setUserRole: (e) => set({userRole: e}),
    setUserName: (e) => set({userName: e}),
    setUserEmail: (e) => set({userEmail: e}),
    setUserPhone: (e) => set({userPhone: e}),
    setUserAddress: (e) => set({userAddress: e}),
    setUserLicenseNum: (e) => set({userLicenseNum: e}),
    setUserImage: (e) => set({userImage: e}),

}))

export default userStore;