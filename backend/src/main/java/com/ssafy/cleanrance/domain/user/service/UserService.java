package com.ssafy.cleanrance.domain.user.service;

import com.ssafy.cleanrance.domain.user.db.entity.User;
import com.ssafy.cleanrance.domain.user.request.StoreSignUpRequest;
import com.ssafy.cleanrance.domain.user.request.UserSignUpRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    //회원가입
    String createStore(StoreSignUpRequest storeSignUpRequest, MultipartFile image) throws IOException;
//    String createStore(StoreSignUpRequest storeSignUpRequest) throws IOException;
//    String createStore(String user_id, String user_store, String user_password, String user_email, String user_phone, String user_address, String user_licensenum, MultipartFile user_image) throws IOException;
    String createUser(UserSignUpRequest userSignUpRequest);
    //회원정보 조회
    User findById(String userId);
    //이메일로 회원정보 조회
    User findByEmail(String userEmail);
    //회원정보 수정
//    User updateUser();
    //회원 탈퇴
    String deleteUser(String userId);
}
