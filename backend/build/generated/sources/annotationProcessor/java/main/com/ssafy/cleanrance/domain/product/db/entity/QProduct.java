package com.ssafy.cleanrance.domain.product.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = 1265285338L;

    public static final QProduct product = new QProduct("product");

    public final NumberPath<Integer> categoryId = createNumber("categoryId", Integer.class);

    public final NumberPath<Float> productDiscount = createNumber("productDiscount", Float.class);

    public final NumberPath<Integer> productDiscountprice = createNumber("productDiscountprice", Integer.class);

    public final StringPath productExpdate = createString("productExpdate");

    public final NumberPath<Integer> productId = createNumber("productId", Integer.class);

    public final StringPath productImageback = createString("productImageback");

    public final StringPath productImagefront = createString("productImagefront");

    public final StringPath productName = createString("productName");

    public final NumberPath<Integer> productPrice = createNumber("productPrice", Integer.class);

    public final NumberPath<Integer> productStock = createNumber("productStock", Integer.class);

    public final StringPath storeUserId = createString("storeUserId");

    public QProduct(String variable) {
        super(Product.class, forVariable(variable));
    }

    public QProduct(Path<? extends Product> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProduct(PathMetadata metadata) {
        super(Product.class, metadata);
    }

}

