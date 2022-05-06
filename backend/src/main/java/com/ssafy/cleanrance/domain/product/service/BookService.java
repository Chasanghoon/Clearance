package com.ssafy.cleanrance.domain.product.service;

import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;

import java.util.List;

public interface BookService {
    List<ProductCategory> findStore(int categoryId, String storeId);
}
