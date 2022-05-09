package com.ssafy.cleanrance.domain.product.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.QBook;
import com.ssafy.cleanrance.domain.product.db.entity.QProduct;
import com.ssafy.cleanrance.domain.product.db.entity.QProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public abstract class BooksRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBook qBook = QBook.book;
    QProduct qProduct = QProduct.product;
    QProductCategory qproductcategory = QProductCategory.productCategory;
}

