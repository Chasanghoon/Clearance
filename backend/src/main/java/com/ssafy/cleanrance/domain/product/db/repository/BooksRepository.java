package com.ssafy.cleanrance.domain.product.db.repository;

import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BooksRepository extends JpaRepository<Book, Integer> {

    @Query(value = "select ifnull(sum(book_count),0)\n" +
            "from book\n" +
            "left join product\n" +
            "on product.product_id=book.product_id\n" +
            "where product.category_id=:categoryId and book.book_status=1 and book.store_user_id= :storeId", nativeQuery = true)
    float findStoreByCategoryId(int categoryId, String storeId);

    @Query(value = "select ifnull(sum(book_count),0)\n" +
            "from book\n" +
            "left join product\n" +
            "on product.product_id=book.product_id\n" +
            "where product.category_id=:categoryId and book.book_status=1 and book.user_id= :userId", nativeQuery = true)
    float findUserByCategoryId(int categoryId, String userId);
}
