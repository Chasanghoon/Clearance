package com.ssafy.cleanrance.domain.product.db.repository;

import com.ssafy.cleanrance.domain.product.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
}
