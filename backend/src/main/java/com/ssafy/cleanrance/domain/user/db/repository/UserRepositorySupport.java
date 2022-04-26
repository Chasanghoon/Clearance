package com.ssafy.cleanrance.domain.user.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.user.db.entity.QUser;
import com.ssafy.cleanrance.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    public User findById(String userId){
        return jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId)).fetchOne();
    }
}
