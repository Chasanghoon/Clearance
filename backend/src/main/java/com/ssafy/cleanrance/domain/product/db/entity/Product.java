package com.ssafy.cleanrance.domain.product.db.entity;

import com.ssafy.cleanrance.domain.user.db.entity.Location;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Product implements Serializable {
    @Id
    @Column(name = "product_id", updatable = false)
    int productId;
    @Column(name = "category_id")
    int categoryId;
    @Column(name = "store_user_id")
    String storeUserId;
    @Column(name = "product_name")
    String productName;
    @Column(name = "product_price")
    int productPrice;
    @Column(name = "product_discount")
    float productDiscount;
    @Column(name = "product_discountprice")
    int productDiscountprice;
    @Column(name = "product_stock")
    int productStock;
    @Column(name = "product_expdate")
    String productExpdate;
    @Column(name = "product_imagefront")
    String productImagefront;
    @Column(name = "product_imageback")
    String productImageback;

//    @ManyToOne(targetEntity = ProductCategory.class, fetch=FetchType.LAZY)
//    @JoinColumn(name = "category_id",insertable = false,updatable = false)
//    private ProductCategory productCategory;
}
