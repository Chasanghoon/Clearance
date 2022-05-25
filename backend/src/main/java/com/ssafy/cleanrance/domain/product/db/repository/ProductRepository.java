package com.ssafy.cleanrance.domain.product.db.repository;

import com.ssafy.cleanrance.domain.product.db.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findBystoreUserIdAndProductNameContains(String storeId, String productName, Pageable pageable);
    Page<Product> findBystoreUserId(String storeId, Pageable pageable);

    List<Product> findByProductExpdateGreaterThanEqualAndStoreUserIdIn(String strDate, String[] arr);
    List<Product> findByProductExpdateGreaterThanEqualAndStoreUserId(String strDate,String storeId);
    List<Product> findByProductExpdateGreaterThanEqualAndCategoryIdAndStoreUserId(String strDate, int categoryId,String storeId);
    List<Product> findByProductExpdateGreaterThanEqualAndStoreUserIdAndProductNameContains(String strDate, String streId, String word);
    List<Product> findByProductExpdateGreaterThanEqualAndProductNameContainsAndStoreUserIdIn(String strDate,String word, String[] arr);
    List<Product> findByProductExpdateGreaterThanEqualAndStoreUserIdInAndCategoryId(String strDate, String[] arr,int categoryId);
    List<Product> findByProductExpdateGreaterThanEqualAndStoreUserIdInAndCategoryIdAndProductNameContains(String strDate,String[] arr,int categoryId, String word);
    List<Product> findByProductExpdateGreaterThanEqualAndStoreUserIdAndCategoryIdAndProductNameContains(String strDate, String storeId, int categoryId, String word);
    //    @Query(value = "select product_imagefront, product_name, product_stock, product_expdate\n" +
//            "from product\n" +
//            "where store_user_id=:userId and product_expdate=:date", nativeQuery = true)
//    List<Product> findProductByDate(String userId, String date);

//    @Modifying(clearAutomatically = true)
//    @Transactional
//    @Query("update Product p set p.categorgId = :categorgId, p.productName = :productName, p.productPrice= :productPrice, p.productDiscount=:productDiscount, p.productDiscountPrice=:productDiscountPrice, p.productStock=:productStock, p.productExpdate= :productExpdate where p.productId = :productId")
//    int productModifyByProductId(int productId, int categorgId, String productName, int productPrice, float productDiscount, int productDiscountPrice, int productStock, String productExpdate);
}
