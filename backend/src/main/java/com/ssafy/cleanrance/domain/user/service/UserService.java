package com.ssafy.cleanrance.domain.user.service;

import com.ssafy.cleanrance.domain.user.db.entity.User;
import com.ssafy.cleanrance.domain.user.request.StoreSignUpRequest;
import com.ssafy.cleanrance.domain.user.request.UserSignUpRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface UserService {
    //회원가입
    String createStore(StoreSignUpRequest storeSignUpRequest, MultipartFile image) throws IOException;
    String createUser(UserSignUpRequest userSignUpRequest);
    //회원정보 조회
    User findById(String userId);
    //회원정보 수정
    Optional<User> updateUser(User user);
    //회원 탈퇴
    String deleteUser(String userId);
}
