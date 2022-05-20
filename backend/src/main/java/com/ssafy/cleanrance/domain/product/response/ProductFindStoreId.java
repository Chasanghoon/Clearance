package com.ssafy.cleanrance.domain.product.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@ApiModel("ProductFindStoreId")
public class ProductFindStoreId {
    Integer product_id;
    Integer category_id;
    String product_name;
    Integer product_price;
    Float product_discount;
    int product_discountprice;
    Date product_expdate;
    String product_imagefront;
}
