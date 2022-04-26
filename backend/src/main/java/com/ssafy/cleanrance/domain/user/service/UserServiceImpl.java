package com.ssafy.cleanrance.domain.user.service;

import com.ssafy.cleanrance.domain.user.db.entity.User;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService{
    @Override
    public User createUser(User user) {
        return null;
    }

    @Override
    public User findByEmail(String userEmail) {
        return null;
    }
}
