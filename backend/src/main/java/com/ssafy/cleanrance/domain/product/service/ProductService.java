package com.ssafy.cleanrance.domain.product.service;

import com.ssafy.cleanrance.domain.product.db.entity.Product;
import com.ssafy.cleanrance.domain.product.request.ProductRegisterRequest;
import com.ssafy.cleanrance.domain.product.request.ProductUpdatePutRequest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {
    // 상품 등록
    String createStore(ProductRegisterRequest productRegisterRequest, MultipartFile image1, MultipartFile image2) throws IOException;
    // 상품 상세조회
    Product findById(int productId);
    // 상품 삭제
    @Transactional
    void removeProduct(Integer productId);

    // 상품정보 수정
    Product updateStore(ProductUpdatePutRequest productUpdatePutRequest, MultipartFile image1, MultipartFile image2) throws IOException;
}
