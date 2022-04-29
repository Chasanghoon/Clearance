package com.ssafy.cleanrance.domain.product.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ProductDeleteReq")
public class ProductDeleteReq {
    @ApiModelProperty(name = "상품 ID", example = "1")
    Integer productId;
}
