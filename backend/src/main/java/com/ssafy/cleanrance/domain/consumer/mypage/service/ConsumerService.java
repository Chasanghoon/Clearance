package com.ssafy.cleanrance.domain.consumer.mypage.service;

import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.product.db.entity.Product;

import java.util.List;

public interface ConsumerService {
    //전체 예약 내역 조회
    List<Book> findBookByuserId(String userId);
    //날짜별 예약 내역 조회
    List<Product> findBookByDate(String userId, String date);
    //진행 상황에 따른 예약 내역 조회
    //거래내역 조회
    //탄소발자국 조회
    //QR코드 생성
}
