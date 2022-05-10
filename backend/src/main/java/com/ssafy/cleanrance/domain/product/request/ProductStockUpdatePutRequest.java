package com.ssafy.cleanrance.domain.product.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ProductStockUpdatePutReq")
public class ProductStockUpdatePutRequest {
    @ApiModelProperty(name = "제품 ID", example = "1")
    int product_id;
    @ApiModelProperty(name = "재고", example = "30")
    int product_stock;
}
