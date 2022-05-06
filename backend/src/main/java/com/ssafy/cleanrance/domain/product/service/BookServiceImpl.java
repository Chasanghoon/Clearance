package com.ssafy.cleanrance.domain.product.service;

import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;
import com.ssafy.cleanrance.domain.product.db.repository.BooksRepository;
import com.ssafy.cleanrance.domain.product.db.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("bookService")
public class BookServiceImpl implements BookService{

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @Autowired
    BooksRepository booksRepository;

    @Override
    public List<Float> findStore(String StoreId) {
        List<ProductCategory> categories = productCategoryRepository.findAll();
        List<Float> list = new ArrayList<>();
        int i = 0;
        for (i=0; i<15; i++){
            float value1 = booksRepository.findStoreByCategoryId(i, StoreId);
            float value2 = Float.parseFloat(categories.get(i).getCategoryCal());
            list.add(value1*value2);
            System.out.println(list.get(i));
        }
        return list;
    }

    @Override
    public List<Float> findUser(String userId) {
        List<ProductCategory> categories = productCategoryRepository.findAll();
        List<Float> list = new ArrayList<>();
        int i = 0;
        for (i=0; i<15; i++){
            float value1 = booksRepository.findUserByCategoryId(i, userId);
            float value2 = Float.parseFloat(categories.get(i).getCategoryCal());
            list.add(value1*value2);
            System.out.println(list.get(i));
        }
        return list;
    }
}
