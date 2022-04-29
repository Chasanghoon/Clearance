package com.ssafy.cleanrance.domain.product.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.product.db.entity.QProduct;
import com.ssafy.cleanrance.domain.product.db.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ProductRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QProduct qProduct = QProduct.product;

    public Product findById(int productId){
        return jpaQueryFactory.select(qProduct).from(qProduct)
                .where(qProduct.productId.eq(productId)).fetchOne();
    }

    public void deleteProductkByProductId(Integer productId) {
        jpaQueryFactory.delete(qProduct).where(qProduct.productId.eq(productId)).execute();
    }
}
