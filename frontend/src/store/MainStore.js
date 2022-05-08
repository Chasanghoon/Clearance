import create from 'zustand'

const useMainStore = create((set) => ({
    position: {
        lat: 1,
        lng: 12,
    },
    setPosition: (nlat,nlng) => {
        set(() => ({
            position: {
                lat: nlat,
                lng: nlng,
            }
        }))
    }
    , nearStore: [] // 가까운 점포의 위치
    , setNearStore: (data) => {
        set(() => ({
            nearStore: data
        }))
    },
    nearProduct: [], // 점포가 등록해놓은 상품 목록(맵 입장 : 근처 모든 점포의 상품 리스트 // 점포 클릭 : 해당 점포가 등록한 상품만 출력)
    setNearProduct: (data) => {
        set(() => ({
            nearProduct: data
        }))
    }
}))

export default useMainStore;