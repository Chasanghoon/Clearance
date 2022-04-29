package com.ssafy.cleanrance.domain.product.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;

@Entity
@Getter
@Setter
public class ProductCategory implements Serializable {
    @Id
    @Column(name = "category_id", updatable = false)
    int categoryId;
    @Column(name = "category_name")
    String category_name;
    @Column(name = "category_cal")
    String categoryCal;
}
