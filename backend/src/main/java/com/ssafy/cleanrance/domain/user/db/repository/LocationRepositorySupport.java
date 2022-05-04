package com.ssafy.cleanrance.domain.user.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.user.db.entity.QLocation;
import com.ssafy.cleanrance.domain.user.db.entity.QUser;
import com.ssafy.cleanrance.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LocationRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QLocation qLocation = QLocation.location;

}
