package com.ssafy.cleanrance.domain.product.controller;

import com.ssafy.cleanrance.domain.product.db.entity.Product;
import com.ssafy.cleanrance.domain.product.request.ProductDeleteReq;
import com.ssafy.cleanrance.domain.product.request.ProductRegisterRequest;
import com.ssafy.cleanrance.domain.product.service.ProductService;
import com.ssafy.cleanrance.domain.user.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Api(value = "유저 API", tags = {"Product"})
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping(value = "/product/register",consumes = {"multipart/form-data"})
    @ApiOperation(value = "상품 등록", notes = "상품 등록을 진행한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity productRegister(
            @RequestPart ProductRegisterRequest productRegisterRequest,
            @RequestPart(value = "frontimage", required = false) MultipartFile image1,
            @RequestPart(value = "backimage", required = false) MultipartFile image2) throws IOException {
//        String str =productService.createStore(productRegisterRequest, image1, image2);
        String str =productService.createStore(productRegisterRequest, image1, image2);
        if("OK".equals(str)){
            return new ResponseEntity(HttpStatus.OK);
        }else{
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/product")
    @ApiOperation(value = "상품 정보 조회", notes = "상품의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Product> findProduct(@RequestParam int productId){
        Product product = productService.findById(productId);
        return ResponseEntity.status(200).body(product);
    }

    @DeleteMapping("/product/remove")
    @ApiOperation(value = "상품 삭제", notes = "상품을 삭제한다.")    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> remove(@RequestBody ProductDeleteReq productDeleteReq){
        Integer productId = productDeleteReq.getProductId();
        productService.removeProduct(productId);
        return ResponseEntity.status(200).body("OK");
    }
}