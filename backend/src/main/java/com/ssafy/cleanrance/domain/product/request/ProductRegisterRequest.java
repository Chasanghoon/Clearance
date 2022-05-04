package com.ssafy.cleanrance.domain.product.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ProductRegisterRequest")
public class ProductRegisterRequest {
    @ApiModelProperty(name = "카테고리 ID", example = "1")
    int category_id;
    @ApiModelProperty(name = "매장 ID", example = "storeTest1")
    String store_user_id;
    @ApiModelProperty(name = "제품 이름", example = "촉촉한 초코빵")
    String product_name;
    @ApiModelProperty(name = "상품 정가", example = "2000")
    int product_price;
    @ApiModelProperty(name = "할인율", example = "0.5")
    float product_discount;
    @ApiModelProperty(name = "재고", example = "30")
    int product_stock;
    @ApiModelProperty(name = "유통기한", example = "20221225")
    String product_expDate;
}
