package com.ssafy.cleanrance.domain.user.db.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.user.bean.LocationFind;
import com.ssafy.cleanrance.domain.user.db.entity.QLocation;
import com.ssafy.cleanrance.domain.user.db.entity.QUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LocationRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QLocation qLocation = QLocation.location;
    QUser qUser = QUser.user;

    public List<LocationFind> findList(){
        return jpaQueryFactory.select(Projections.constructor(LocationFind.class,qLocation.locationId,qLocation.userId,qLocation.locationXpoint, qLocation.locationYpoint, qUser.userName))
                .from(qLocation)
                .join(qUser).on(qLocation.userId.eq(qUser.userId)).fetch();
    }
}
