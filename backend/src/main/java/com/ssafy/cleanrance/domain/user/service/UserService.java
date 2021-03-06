package com.ssafy.cleanrance.domain.user.service;

import com.ssafy.cleanrance.domain.user.db.entity.User;
import com.ssafy.cleanrance.domain.user.request.StoreSignUpRequest;
import com.ssafy.cleanrance.domain.user.request.UserPutRequest;
import com.ssafy.cleanrance.domain.user.request.UserSignUpRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface UserService {
    //회원가입
    String createStore(StoreSignUpRequest storeSignUpRequest, MultipartFile image) throws IOException;
    String createUser(UserSignUpRequest userSignUpRequest, MultipartFile image) throws IOException;
    //회원정보 조회
    Optional<User> findById(String userId);
    //회원정보 수정
    Optional<User> updateUser(UserPutRequest user);
    //회원 탈퇴
    String deleteUser(String userId);
}
