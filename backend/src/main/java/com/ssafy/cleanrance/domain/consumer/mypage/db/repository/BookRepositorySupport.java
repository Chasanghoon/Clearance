package com.ssafy.cleanrance.domain.consumer.mypage.db.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Coalesce;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.consumer.mypage.bean.ProductName;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.QBook;
import com.ssafy.cleanrance.domain.product.db.entity.Product;
import com.ssafy.cleanrance.domain.product.db.entity.QProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class BookRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBook qBook = QBook.book;

    QProduct qProduct = QProduct.product;

    public List<Book> findBookByuserId(String userId){
        return jpaQueryFactory.select(qBook).from(qBook)
                .where(qBook.userId.eq(userId)).fetch();
    }
    public List<ProductName> findBookByuserIdAndbookSet(int bookSet){
        return jpaQueryFactory.select(Projections.constructor(ProductName.class, qProduct.productImagefront, qProduct.productName, qProduct.productStock, qProduct.productExpdate, qBook.bookStatus))
                .from(qProduct)
                .leftJoin(qBook).on(qProduct.productId.eq(qBook.productId))
                .where(qBook.bookSet.eq(bookSet)).fetch();
    }

    public List<Book> findByBookSet(int book_set) {
        return jpaQueryFactory.select(qBook).from(qBook)
                .where(qBook.bookSet.eq(book_set)).fetch();
    }

//    public void BookSetModify(int bookId) {
//        return jpaQueryFactory.update(qBook).set(qBook.bookStatus.equals(1))
//                .where(qBook.bookSet.equals(bookId)).execute();
//    }
}
