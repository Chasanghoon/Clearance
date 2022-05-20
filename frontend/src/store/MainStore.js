import create from 'zustand'

const useMainStore = create((set) => ({
    position: {
        lat: null,
        lng: null,
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
    },

    category: null, // 선택된 카테고리(default : 선택된 카테고리가 없음)
    setCategory: (data) => { 
        set(() => ({
            category: data // 선택된 하나의 카테고리로 변경
        }))
    },

    categoryList: [],
    setCategoryList: (data) => {
        set(() => ({
            categoryList: data
        }))
    },

}))

export default useMainStore;