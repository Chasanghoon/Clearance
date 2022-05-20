package com.ssafy.cleanrance.domain.product.service;

import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;

import java.util.List;

public interface BookService {
    // 매장 호출 API
    List<Float> findStore(String StoreId);
    // 사용자 호출 API
    List<Float> findUser(String userId);
}
