package com.ssafy.cleanrance.domain.consumer.mypage.db.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
public class Basket implements Serializable {
    @Id
    @Column(name = "basket_id", updatable = false)
    int basketId;
    @Column(name = "user_id")
    String userId;
    @Column(name = "product_id")
    int productId;
    @Column(name = "store_user_id")
    String storeUserId;
    @Column(name = "basket_count")
    int basketCount;
    @Column(name = "basket_bookcheck")
    int basketBookcheck;
    @ManyToOne
    @JsonManagedReference //순환참조 방지
    @JoinColumn(name = "basket_id",insertable = false,updatable = false)
    private Book book;
}
