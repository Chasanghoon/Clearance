package com.ssafy.cleanrance.domain.product.controller;

import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;
import com.ssafy.cleanrance.domain.product.service.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "유저 API", tags = {"Book"})
@RestController
@RequestMapping("/api")
public class BookController {
    @Autowired
    BookService bookService;

    @GetMapping(value = "/store/co")
    @ApiOperation(value = "판매자별 에너지저감량", notes = "매장 아이디를 검색한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ProductCategory>> findLocation(@RequestParam int categoryId, @RequestParam String storeId){
        List<ProductCategory> list = bookService.findStore(categoryId, storeId);
        return ResponseEntity.status(200).body(list);
    }
}