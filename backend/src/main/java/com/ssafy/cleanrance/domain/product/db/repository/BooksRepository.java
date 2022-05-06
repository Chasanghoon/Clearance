package com.ssafy.cleanrance.domain.product.db.repository;

import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BooksRepository extends JpaRepository<Book, Integer> {
}
