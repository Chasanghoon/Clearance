package com.ssafy.cleanrance.domain.user.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
@ApiModel("StoreSignUpRequest")
@Builder
public class StoreSignUpRequest {
    @ApiModelProperty(name = "매장 ID", example = "storeTest1")
    String user_id;
    @ApiModelProperty(name="매장 이름", example = "사상점")
    String user_store;
    @ApiModelProperty(name="매장 비밀번호", example = "test1")
    String user_password;
    @ApiModelProperty(name="매장 이메일", example = "storeTest1@ssafy.com")
    String user_email;
    @ApiModelProperty(name="매장 전화번호", example = "051-1234-1234")
    String user_phone;
    @ApiModelProperty(name = "매장 주소", example = "부산 사상구 낙동대로 733")
    String user_address;
    @ApiModelProperty(name = "매장 사업자등록번호", example = "0000000000")
    String user_licensenum;
}
