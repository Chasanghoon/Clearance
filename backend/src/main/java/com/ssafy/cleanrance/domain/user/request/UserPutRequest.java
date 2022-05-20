package com.ssafy.cleanrance.domain.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserPutRequest")
public class UserPutRequest {
    @ApiModelProperty(name = "회원 아이디", example = "user1")
    String user_id;
    @ApiModelProperty(name = "회원 이름", example = "구매자1")
    String user_name;
    @ApiModelProperty(name = "회원 이메일",example = "user1@ssafy.com")
    String user_email;
    @ApiModelProperty(name = "회원 전화번호",example = "010-1234-1234")
    String user_phone;
    @ApiModelProperty(name = "회원 주소",example = "부산시 사하구 낙동대로 319")
    String user_address;
}
