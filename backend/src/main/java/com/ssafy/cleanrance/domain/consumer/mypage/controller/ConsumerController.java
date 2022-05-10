package com.ssafy.cleanrance.domain.consumer.mypage.controller;

import com.google.zxing.WriterException;
import com.ssafy.cleanrance.domain.consumer.mypage.bean.ProductName;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.consumer.mypage.request.BookSetUpdatePutRequest;
import com.ssafy.cleanrance.domain.consumer.mypage.service.ConsumerService;
import com.ssafy.cleanrance.domain.product.db.entity.Product;
import com.ssafy.cleanrance.domain.product.request.ProductUpdatePutRequest;
import com.ssafy.cleanrance.global.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Api(value = "구매자 API", tags = {"Consumer"})
@RestController
@RequestMapping("/api")
public class ConsumerController {
    @Autowired
    ConsumerService consumerService;

    private static final int SUCCESS = 1;
    private static final int FAIL = -1;

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

//    @GetMapping("/book/date")
//    @ApiOperation(value = "회원의 날짜별 예약 내역 조회", notes = "회원 아이디와 날짜로 예약정보를 조회후 응답한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<List<Product>> findBookByUser(@RequestParam String userId, @RequestParam String date){
//        List<Product> list = consumerService.findBookByDate(userId, date);
//        return ResponseEntity.status(200).body(list);
//    }

    @GetMapping("/book/qrcode")
    @ApiOperation(value = "회원의 예약별 예약 내역 조회", notes = "회원 아이디와 예약번호로 예약정보를 조회후 QR코드를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> findBookByUserAndBookSet(@RequestParam int bookSet) throws IOException, WriterException {
        String image = consumerService.findBookByUserIdAndBookSet(bookSet);
        return ResponseEntity.status(200).body(image);
    }

    @GetMapping("/book/qrcode/list")
    @ApiOperation(value = "회원의 예약별 예약 상세내역 조회", notes = "회원 아이디와 예약번호로 예약정보를 조회후 QR코드를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ProductName>> findBookByUserAndBookSetList(@RequestParam int bookSet) throws IOException, WriterException {
        List<ProductName> list = consumerService.findBookByUserIdAndBookSetList(bookSet);
        return ResponseEntity.status(200).body(list);
    }

    @PutMapping(value = "/book/modifybookset")
    @ApiOperation(value = "거래정보 수정", notes = "거래 정보를 업데이트한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modify(@RequestBody BookSetUpdatePutRequest bookSetUpdatePutRequest) {
        consumerService.updateBook(bookSetUpdatePutRequest);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

//        Book book1 = consumerService.findByBookSet(bookSetUpdatePutRequest.getBook_set());
//        if(book1!=null){
//            Book book = consumerService.updateBook(bookSetUpdatePutRequest);
//            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//        }else{
//            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "ProductID doesn't exist"));
//        }
    }
}