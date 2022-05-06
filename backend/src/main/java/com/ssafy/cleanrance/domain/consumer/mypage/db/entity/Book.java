package com.ssafy.cleanrance.domain.consumer.mypage.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
public class Book implements Serializable {
    @Id
    @Column(name = "book_id", updatable = false)
    int bookId;
    @Column(name = "basket_id")
    int basketId;
    @Column(name = "user_id")
    String userId;
    @Column(name = "product_id")
    int productId;
    @Column(name = "store_user_id")
    String storeUserId;
    @Column(name = "book_price")
    int bookPrice;
    @Column(name = "book_date")
    Date bookDate;
    @Column(name = "book_count")
    int bookCount;
    @Column(name = "book_hour")
    String bookHour;
    @Column(name = "book_status")
    int bookStatus;
    @Column(name ="book_set")
    int bookSet;
    @OneToMany(mappedBy = "book")
    @JsonBackReference //순환참조 방지
    private List<Basket> baskets = new ArrayList<>();
}
