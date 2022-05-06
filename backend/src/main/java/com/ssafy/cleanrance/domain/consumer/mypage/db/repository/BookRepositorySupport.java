package com.ssafy.cleanrance.domain.consumer.mypage.db.repository;


import com.querydsl.core.types.dsl.Coalesce;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.QBook;
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
    public List<Book> findBookByuserIdAndbookSet(String userId, int bookSet){
        return jpaQueryFactory.select(qBook).from(qBook)
                .where(qBook.userId.eq(userId).and(qBook.bookSet.eq(bookSet))).fetch();
    }

}
