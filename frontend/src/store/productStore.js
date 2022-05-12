import create from 'zustand'


// 상품 상세 페이지에 사용될 전역 변수들
const productStore = create((set) => ({

    product_id: -1, // 해당 상품의 정보를 가져오기 위한 키값
    setProductId: (id) => {
        set(() => ({
            product_id: id,
        }))
    },

    category_id: 20, // 해당 상품의 카테고리
    setCategoryId: (id) => {
        set(() => ({
            category_id: id,
        }))
    },

    store_user_id: "", // 해당 상품을 올린 매점 id
    setStoreUserId: (id) => {
        set(() => ({
            store_user_id: id,
        }))
    },
    product_price: 0, // 상품 가격
    setProductPrice: (id) => {
        set(() => ({
            product_price: id,
        }))
    },
    product_name: "", // 상품 이름
    setProductName: (id) => {
        set(() => ({
            product_name: id,
        }))
    },
    product_discount: 1, // 상품 할인률(0~1)
    setProductDiscount: (id) => {
        set(() => ({
            product_discount: id,
        }))
    },

    product_discountedPrice: 0, // 할인된 가격
    setProductDiscountedPrice: (id) => {
        set(() => ({
            product_discountedPrice : id,
        }))
    },
    product_stock: 0, // 재고량
    setProductStock: (id) => {
        set(() => ({
            product_stock: id,
        }))
    },
    product_expdate: new Date('9999-12-31'), // 유통기한 만료일
    setProductExpDate: (id) => {
        set(() => ({
            product_expdate: id,
        }))
    },

    product_imgfront: "", // 앞면 이미지
    setProductImgFront: (id) => {
        set(() => ({
            product_imgfront: id,
        }))
    },

    product_imgback: "", // 뒷면 이미지
    setProductImgBack: (id) => {
        set(() => ({
            product_imgback: id,
        }))
    },

    basket_cnt: 1, 
    setBasketCnt: (id) => {
        set(() => ({
            basket_cnt: id,
        }))
    }
}))


export default productStore;