package com.ssafy.cleanrance.domain.product.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.cleanrance.domain.product.db.entity.QProduct;
import com.ssafy.cleanrance.domain.product.db.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QProduct qProduct = QProduct.product;

    public Product findById(int productId){
        return jpaQueryFactory.select(qProduct).from(qProduct)
                .where(qProduct.productId.eq(productId)).fetchOne();
    }

    public void deleteProductkByProductId(Integer productId) {
        jpaQueryFactory.delete(qProduct).where(qProduct.productId.eq(productId)).execute();
    }

    public List<Product> findProductByStoreId(String storeId){
        List<Product> list = jpaQueryFactory.select(qProduct)
                .from(qProduct)
                .where(qProduct.storeUserId.eq(storeId)).fetch();
        return list;
    }

    public List<Product> findProductByStoreIdAndCategoryId(String storeId,int categoryId){
        List<Product> list = jpaQueryFactory.select(qProduct).from(qProduct)
                .where(qProduct.storeUserId.eq(storeId).and(qProduct.categoryId.eq(categoryId))).fetch();
        return list;
    }

    public List<Product> findProductByStoreIdAndWord(String storeId,String word){
        List<Product> list = jpaQueryFactory.select(qProduct).from(qProduct)
                .where(qProduct.storeUserId.eq(storeId).and(qProduct.productName.contains(word))).fetch();
        return list;
    }

    public List<Product> findProductByDate(String userId, String date) {
        List<Product> list = jpaQueryFactory.select(qProduct).from(qProduct)
                .where(qProduct.storeUserId.eq(userId).and(qProduct.productExpdate.eq(date))).fetch();
        return list;
    }

    public List<Product> findProductByStoreIdAndCategoryIdAndWord(String storeId, int categoryId, String word){
        List<Product> list = jpaQueryFactory.select(qProduct).from(qProduct)
                .where(qProduct.storeUserId.eq(storeId).and(qProduct.categoryId.eq(categoryId).and(qProduct.productName.contains(word)))).fetch();
        return list;
    }
}
