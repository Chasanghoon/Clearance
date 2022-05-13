package com.ssafy.cleanrance.domain.user.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QLocation is a Querydsl query type for Location
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLocation extends EntityPathBase<Location> {

    private static final long serialVersionUID = -1382110408L;

    public static final QLocation location = new QLocation("location");

    public final NumberPath<Integer> locationId = createNumber("locationId", Integer.class);

    public final NumberPath<Double> locationXpoint = createNumber("locationXpoint", Double.class);

    public final NumberPath<Double> locationYpoint = createNumber("locationYpoint", Double.class);

    public final StringPath userId = createString("userId");

    public QLocation(String variable) {
        super(Location.class, forVariable(variable));
    }

    public QLocation(Path<? extends Location> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLocation(PathMetadata metadata) {
        super(Location.class, metadata);
    }

}

