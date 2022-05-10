package com.ssafy.cleanrance.domain.consumer.mypage.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BookSetUpdatePutRequest")
public class BookSetUpdatePutRequest {
    @ApiModelProperty(name = "거래번호", example = "1")
    int book_set;
//    @ApiModelProperty(name = "거래완료여부", example = "1")
//    int book_status;
}
