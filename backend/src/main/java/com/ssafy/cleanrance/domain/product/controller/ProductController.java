package com.ssafy.cleanrance.domain.product.controller;

import com.ssafy.cleanrance.domain.product.db.entity.Product;
import com.ssafy.cleanrance.domain.product.db.entity.ProductCategory;
import com.ssafy.cleanrance.domain.product.request.ProductDeleteReq;
import com.ssafy.cleanrance.domain.product.request.ProductRegisterRequest;
import com.ssafy.cleanrance.domain.product.request.ProductStockUpdatePutRequest;
import com.ssafy.cleanrance.domain.product.request.ProductUpdatePutRequest;
import com.ssafy.cleanrance.domain.product.service.ProductService;
import com.ssafy.cleanrance.global.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Api(value = "상품 API", tags = {"Product"})
@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    ProductService productService;

    private static final int SUCCESS = 1;
    private static final int FAIL = -1;

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
    public ResponseEntity<? extends BaseResponseBody> modify(@RequestBody ProductUpdatePutRequest productUpdatePutRequest) {
        Product product1 = productService.findById(productUpdatePutRequest.getProduct_id());
        if(product1!=null){
            Product product = productService.updateProduct(productUpdatePutRequest);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "ProductID doesn't exist"));
        }
//        if(productService.updateProduct(productUpdatePutRequest) == SUCCESS) {
//            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
//        }else{
//            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "This Id doesn't exist."));
//        }
    }

    @PutMapping(value = "/product/countmodify")
    @ApiOperation(value = "상품수량 수정", notes = "상품 수량을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> countmodify(@RequestBody ProductStockUpdatePutRequest productStockUpdatePutRequest) {
        Product product1 = productService.findById(productStockUpdatePutRequest.getProduct_id());
        if(product1!=null){
            Product product = productService.updateCountProduct(productStockUpdatePutRequest);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }else{
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "ProductID doesn't exist"));
        }
//        if(productService.updateProduct(productUpdatePutRequest) == SUCCESS) {
//            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));
//        }else{
//            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "This Id doesn't exist."));
//        }
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
    @GetMapping("/product/info")
    @ApiOperation(value = "매장 상품 목록 조회", notes = "매장 상품 목록을 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public Page<Product> listproduct(@RequestParam String storeId, @PageableDefault(page = 0) Pageable pageable){
        return productService.findProductByStoreId(storeId,pageable);
    }

    @DeleteMapping("/product/remove")
    @ApiOperation(value = "상품 삭제", notes = "상품을 삭제한다.")
    @ApiResponses({
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

    @GetMapping("/product/list")
    @ApiOperation(value = "사용자가 위치한 매장별 상품 조회", notes = "<strong>사용자 위치를 받아와 검색조건<strong>에 따라 매장 상품을 조회한다.<br/>" +
            "ex) ypoint(위도) : 35.1275983422866 , xpoint(경도): 128.968358334702")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Product>> findProductList(@RequestParam double ypoint, @RequestParam double xpoint, @RequestParam(required = false) String storeId, @RequestParam(required = false, defaultValue = "20")int categoryId, @RequestParam(required = false) String word){
        List<Product> list = productService.findProductList(ypoint,xpoint,storeId, categoryId, word);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/storeproduct/list")
    @ApiOperation(value = "매장별 상품 검색", notes = "<strong>매장 아이디와 검색어<strong>에 따라 매장 상품을 조회한다.<br/>")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Product>> findStoreProductList(@RequestParam(required = false) String storeId, @RequestParam(required = false) String word){
        List<Product> list = productService.findStoreProductList(storeId, word);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/product/date")
    @ApiOperation(value = "매장별 상품 관리", notes = "매장 ID와 유효기간 입력 후 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Product>> findBookByUser(@RequestParam String userId, @RequestParam String date){
        List<Product> list = productService.findProductByDate(userId, date);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/product/distinctdate")
    @ApiOperation(value = "매장별 유효기간 날짜 조회", notes = "매장 ID 입력 후 날짜를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<String>> findExpdateByUser(@RequestParam String storeuserId){
        List<String> list = productService.findExpdateByUser(storeuserId);
        return ResponseEntity.status(200).body(list);
    }
}