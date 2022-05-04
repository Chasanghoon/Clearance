package com.ssafy.cleanrance.domain.consumer.mypage.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBook is a Querydsl query type for Book
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBook extends EntityPathBase<Book> {

    private static final long serialVersionUID = -1096432358L;

    public static final QBook book = new QBook("book");

    public final NumberPath<Integer> basketId = createNumber("basketId", Integer.class);

    public final ListPath<Basket, QBasket> baskets = this.<Basket, QBasket>createList("baskets", Basket.class, QBasket.class, PathInits.DIRECT2);

    public final DateTimePath<java.util.Date> bookDate = createDateTime("bookDate", java.util.Date.class);

    public final StringPath bookHour = createString("bookHour");

    public final NumberPath<Integer> bookId = createNumber("bookId", Integer.class);

    public final NumberPath<Integer> bookPrice = createNumber("bookPrice", Integer.class);

    public final NumberPath<Integer> bookStatus = createNumber("bookStatus", Integer.class);

    public final NumberPath<Integer> productId = createNumber("productId", Integer.class);

    public final StringPath storeUserId = createString("storeUserId");

    public final StringPath userId = createString("userId");

    public QBook(String variable) {
        super(Book.class, forVariable(variable));
    }

    public QBook(Path<? extends Book> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBook(PathMetadata metadata) {
        super(Book.class, metadata);
    }

}

