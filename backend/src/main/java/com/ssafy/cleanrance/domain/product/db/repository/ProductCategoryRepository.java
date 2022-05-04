package com.ssafy.cleanrance.domain.product.db.repository;

import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
}
