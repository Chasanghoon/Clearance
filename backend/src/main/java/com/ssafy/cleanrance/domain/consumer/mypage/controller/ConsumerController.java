package com.ssafy.cleanrance.domain.consumer.mypage.controller;

import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.consumer.mypage.service.ConsumerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "구매자 API", tags = {"Consumer"})
@RestController
@RequestMapping("/api")
public class ConsumerController {
    @Autowired
    ConsumerService consumerService;

    @GetMapping("/book")
    @ApiOperation(value = "회원 예약 내역 조회", notes = "회원 아이디로 예약정보를 조회후 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Book>> findBookByUser(@RequestParam String userId){
        List<Book> list = consumerService.findBookByuserId(userId);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/book/date")
    @ApiOperation(value = "회원의 날짜별 예약 내역 조회", notes = "회원 아이디와 날짜로 예약정보를 조회후 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Book>> findBookByUser(@RequestParam String userId, @RequestParam String date){
        List<Book> list = consumerService.findBookByuserId(userId);
        return ResponseEntity.status(200).body(list);
    }
}
