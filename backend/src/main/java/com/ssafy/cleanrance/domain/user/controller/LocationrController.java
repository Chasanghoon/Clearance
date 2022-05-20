package com.ssafy.cleanrance.domain.user.controller;

import com.ssafy.cleanrance.domain.user.bean.LocationFind;
import com.ssafy.cleanrance.domain.user.db.entity.Location;
import com.ssafy.cleanrance.domain.user.service.LocationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@Api(value = "지도 API", tags = {"Location"})
@RestController
@RequestMapping("/api")
public class LocationrController {
    @Autowired
    LocationService locationService;
    @GetMapping(value = "/map")
    @ApiOperation(value = "구매자 주변 매장 검색", notes = "회원 위치(위도,경도)를 통해 가까운 매장을 검색한다. <br/>" +
            "ex) ypoint(위도) : 35.1275983422866 , xpoint(경도): 128.968358334702")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<LocationFind>> findLocation(@RequestParam double ypoint, @RequestParam double xpoint){
        List<LocationFind> list = locationService.findLoc(ypoint, xpoint);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping(value = "/mapProduct")
    @ApiOperation(value = "주변 매장 검색후 상품 조회", notes = "회원 위치(위도,경도)를 통해 가까운 매장을 검색하고 가까운 매장 상품을 조회한다. <br/>" +
            "ex) ypoint(위도) : 35.1275983422866 , xpoint(경도): 128.968358334702")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Object>> findLocProduct(@RequestParam double ypoint,@RequestParam double xpoint){
        List<Object> list = locationService.findLocAndProduct(ypoint, xpoint);
        return ResponseEntity.status(200).body(list);
    }
}
