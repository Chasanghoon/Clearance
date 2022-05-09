package com.ssafy.cleanrance.domain.consumer.mypage.db.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.QBook;
import com.ssafy.cleanrance.domain.product.db.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBook qBook = QBook.book;

    public List<Book> findBookByuserId(String userId){
        return jpaQueryFactory.select(qBook).from(qBook)
                .where(qBook.userId.eq(userId)).fetch();
    }
}
