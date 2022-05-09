package com.ssafy.cleanrance.domain.product.service;

import com.querydsl.core.Tuple;
import com.ssafy.cleanrance.domain.product.db.entity.Product;
import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;
import com.ssafy.cleanrance.domain.product.request.ProductRegisterRequest;
import com.ssafy.cleanrance.domain.product.request.ProductUpdatePutRequest;
import com.ssafy.cleanrance.domain.product.response.ProductFindStoreId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    // 매장별 상품 조회
    List<Product> findProductByStoreId(String storeId);
    //카테고리 목록 조회
    List<ProductCategory> findProductCategory();
    //상품 수정
    Product updateProduct(ProductUpdatePutRequest productUpdatePutRequest);
    //날짜별 상품 조회
    List<Product> findProductByDate(String userId, String date);
    //입력값에 따른 상품 조회
    List<Product> findProductList(double ypoint, double xpoint, String storeId, int categoryId, String word);
    //매장별 상품 조회
    Page<Product> findProductByStoreId(String storeId, Pageable pageable);
}
