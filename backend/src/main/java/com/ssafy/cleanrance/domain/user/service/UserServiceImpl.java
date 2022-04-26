package com.ssafy.cleanrance.domain.user.service;

import com.ssafy.cleanrance.domain.user.db.entity.User;
import com.ssafy.cleanrance.domain.user.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepositorySupport userRepositorySupport;
    @Override
    public User createUser(User user) {
        return null;
    }

    @Override
    public User findById(String userId) {
        User user = userRepositorySupport.findById(userId);
        return user;
    }

    @Override
    public User findByEmail(String userEmail) {
        return null;
    }
}
