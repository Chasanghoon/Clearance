package com.ssafy.cleanrance.domain.product.service;

import com.querydsl.core.Tuple;
import com.ssafy.cleanrance.domain.product.db.entity.Product;
import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;
import com.ssafy.cleanrance.domain.product.request.ProductRegisterRequest;
import com.ssafy.cleanrance.domain.product.request.ProductUpdatePutRequest;
import com.ssafy.cleanrance.domain.product.response.ProductFindStoreId;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

public interface ProductService {
    // 상품 등록
    String createStore(ProductRegisterRequest productRegisterRequest, MultipartFile image1, MultipartFile image2) throws IOException;
    // 상품 상세조회
    Product findById(int productId);
    // 상품 삭제
    @Transactional
    void removeProduct(Integer productId);
    // 상품정보 수정
    //Optional<Product> updateStore(Product product);
    // 매장별 상품 조회
    List<Product> findProductByStoreId(String storeId);
//    List<ProductFindStoreId> findProductByStoreId(String storeId) throws ParseException;
    //매장 & 카테고리별 상품 조회
    List<Product> findProductByStoreIdAndCategory(String storeId, int categoryId);
    //매장 & 검색어 상품 조회
    List<Product> findProductByStoreIdAndWord(String storeId, String word);
    //카테고리 목록 조회
    List<ProductCategory> findProductCategory();

    Product updateProduct(ProductUpdatePutRequest productUpdatePutRequest);

    List<Product> findProductByDate(String userId, String date);

    List<Product> findProductList(String storeId, int categoryId, String word);
}
