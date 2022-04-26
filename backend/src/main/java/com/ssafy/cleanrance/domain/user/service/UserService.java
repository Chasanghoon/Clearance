package com.ssafy.cleanrance.domain.user.service;

import com.ssafy.cleanrance.domain.user.db.entity.User;

public interface UserService {
    //회원가입
    User createUser(User user);
    //회원정보 조회
    User findById(String userId);
    //이메일로 회원정보 조회
    User findByEmail(String userEmail);
    //회원정보 수정
//    User updateUser();
    //회원 탈퇴
//    void deleteUser();
}
