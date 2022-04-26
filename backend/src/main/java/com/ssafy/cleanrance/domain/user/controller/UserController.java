package com.ssafy.cleanrance.domain.user.controller;

import com.ssafy.cleanrance.domain.user.service.UserService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1")
public class UserController {
    @Autowired
    UserService userService;

}
