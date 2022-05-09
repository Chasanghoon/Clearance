package com.ssafy.cleanrance.domain.consumer.mypage.db.repository;

import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.product.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository {
//    @Query(value = "select product.product_imagefront, product.product_name, product.product_stock, product.product_expdate\n" +
//            "from product\n" +
//            "left join book\n" +
//            "on product.store_user_id = book.store_user_id\n" +
//            "where book.store_user_id=:userId and book_date=:date", nativeQuery = true)
//    List<Product> findBookByDate(String userId, String date);
}
