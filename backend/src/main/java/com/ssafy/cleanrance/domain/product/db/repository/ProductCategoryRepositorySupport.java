package com.ssafy.cleanrance.domain.product.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.product.db.entity.QProduct;
import com.ssafy.cleanrance.domain.product.db.entity.QProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProductCategoryRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QProduct Qproduct = QProduct.product;

}
