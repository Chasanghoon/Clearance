package com.ssafy.cleanrance.domain.product.service;

import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;
import com.ssafy.cleanrance.domain.product.db.repository.BooksRepository;
import com.ssafy.cleanrance.domain.product.db.repository.BooksRepositorySupport;
import com.ssafy.cleanrance.domain.product.db.repository.ProductCategoryRepository;
import com.ssafy.cleanrance.domain.product.db.repository.ProductCategoryRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("bookService")
public class BookServiceImpl implements BookService{

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @Autowired
    ProductCategoryRepositorySupport productCategoryRepositorySupport;

    @Autowired
    BooksRepository booksRepository;

    @Autowired
    BooksRepositorySupport booksRepositorySupport;

    @Override
    public List<ProductCategory> findStore(int categoryId, String storeId) {
        List<ProductCategory> categories = productCategoryRepository.findAll();
        List<Float> list = new ArrayList<>();
        float i = 0;
        for (i=0; i<15; i++){
            float value = booksRepositorySupport.findProductByCategoryId(categoryId, storeId);
            list.add(value);
            System.out.println(value);
        }
        return null;
    }
}
