package com.ssafy.cleanrance.domain.product.controller;

import com.ssafy.cleanrance.domain.product.db.entity.Product;
import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;
import com.ssafy.cleanrance.domain.product.request.ProductDeleteReq;
import com.ssafy.cleanrance.domain.product.request.ProductRegisterRequest;
import com.ssafy.cleanrance.domain.product.service.ProductService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Api(value = "상품 API", tags = {"Product"})
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

    @PutMapping(value = "/product/modify")
    @ApiOperation(value = "상품정보 수정", notes = "상품 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Optional<Product>> modify(@RequestBody Product product) {
        Optional<Product> productmodify =  Optional.ofNullable(productService.updateStore(product).orElse(null));
        if(null == productmodify){
            throw new IllegalStateException("없는 아이디");
        }
        return ResponseEntity.status(200).body(productmodify);
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

    @GetMapping("/product/list")
    @ApiOperation(value = "매장별 상품 조회", notes = "<strong>매장 아이디</strong>를 통해 매장 상품을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Product>> findProductByStoreId(@RequestParam String storeId) {
//        long beforeTime = System.currentTimeMillis();
        List<Product> list = productService.findProductByStoreId(storeId);
//        long afterTime = System.currentTimeMillis();
//        System.out.println("걸리는 시간(m): "+ (afterTime-beforeTime)/1000);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/product/list/category")
    @ApiOperation(value = "매장& 카테고리 상품 조회", notes = "<strong>매장 아이디와 카테고리</strong>를 통해 매장 상품을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Product>> findProductByStoreIdAndCategory(@RequestParam String storeId,@RequestParam int categoryId) {
        List<Product> list = productService.findProductByStoreIdAndCategory(storeId, categoryId);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/product/list/search")
    @ApiOperation(value = "매장& 검색어 상품 조회", notes = "<strong>매장 아이디와 검색어</strong>를 통해 매장 상품을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Product>> findProductByStoreIdAndWord(@RequestParam String storeId,@RequestParam String word) {
        List<Product> list = productService.findProductByStoreIdAndWord(storeId, word);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/productcategory")
    @ApiOperation(value = "상품 카테고리 목록 조회", notes = "상품 카테고리 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ProductCategory>> findCategoryList() {
        List<ProductCategory> list = productService.findProductCategory();
        return ResponseEntity.status(200).body(list);
    }
}