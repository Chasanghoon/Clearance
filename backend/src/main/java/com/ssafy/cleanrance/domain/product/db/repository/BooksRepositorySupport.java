package com.ssafy.cleanrance.domain.product.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.QBook;
import com.ssafy.cleanrance.domain.product.db.entity.QProduct;
import com.ssafy.cleanrance.domain.product.db.entity.QProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BooksRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBook qBook = QBook.book;
    QProduct qProduct = QProduct.product;
    QProductCategory qproductcategory = QProductCategory.productCategory;
    public float findProductByCategoryId(int categoryId, String storeId){
        return jpaQueryFactory.select(qBook.bookCount.sum()).from(qBook)
                .join(qProduct).on(qProduct.productId.eq(qBook.productId))
                .where(qBook.bookStatus.eq(1).and(qProduct.categoryId.eq(categoryId)).and(qBook.storeUserId.eq(storeId))).fetchOne();
    }
}