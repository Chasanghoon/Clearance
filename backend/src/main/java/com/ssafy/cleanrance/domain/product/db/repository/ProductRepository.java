package com.ssafy.cleanrance.domain.product.db.repository;

import com.ssafy.cleanrance.domain.product.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findBystoreUserIdAndProductNameContaining(String storeUserId, String productName);

//    @Modifying(clearAutomatically = true)
//    @Transactional
//    @Query("update Product p set p.categorgId = :categorgId, p.productName = :productName, p.productPrice= :productPrice, p.productDiscount=:productDiscount, p.productDiscountPrice=:productDiscountPrice, p.productStock=:productStock, p.productExpdate= :productExpdate where p.productId = :productId")
//    int productModifyByProductId(int productId, int categorgId, String productName, int productPrice, float productDiscount, int productDiscountPrice, int productStock, String productExpdate);
}
