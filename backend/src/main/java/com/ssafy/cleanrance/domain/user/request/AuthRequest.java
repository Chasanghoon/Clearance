package com.ssafy.cleanrance.domain.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AuthenticationRequest")
public class AuthRequest {
    @ApiModelProperty(name = "유저 ID",example = "storeTest1")
    String user_id;
    @ApiModelProperty(name = "유저 비밀번호",example = "test1")
    String user_password;
}
