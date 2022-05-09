package com.ssafy.cleanrance.domain.consumer.mypage.service;

import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.consumer.mypage.db.repository.BookRepository;
import com.ssafy.cleanrance.domain.consumer.mypage.db.repository.BookRepositorySupport;
import com.ssafy.cleanrance.domain.product.db.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("consumerService")
public class ConsumerServiceImpl implements ConsumerService{

    @Autowired
    BookRepositorySupport bookRepositorySupport;

    @Override
    public List<Book> findBookByuserId(String userId) {
        return bookRepositorySupport.findBookByuserId(userId);
    }

    @Override
    public List<Product> findBookByDate(String userId, String date) {
        return null;
    }
}
