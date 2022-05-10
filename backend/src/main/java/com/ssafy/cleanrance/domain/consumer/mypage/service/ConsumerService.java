package com.ssafy.cleanrance.domain.consumer.mypage.service;

import com.google.zxing.WriterException;
import com.ssafy.cleanrance.domain.consumer.mypage.bean.ProductName;
import com.ssafy.cleanrance.domain.consumer.mypage.db.entity.Book;
import com.ssafy.cleanrance.domain.consumer.mypage.request.BookSetUpdatePutRequest;
import com.ssafy.cleanrance.domain.product.db.entity.Product;

import java.io.IOException;
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
    String findBookByUserIdAndBookSet(int bookSet) throws IOException, WriterException;

    List<ProductName> findBookByUserIdAndBookSetList(int bookSet);
    // 거래번호 조회
    List<Book> findByBookSet(int book_set);
    // 거래완료 수정
    List<Book> updateBook(BookSetUpdatePutRequest bookSetUpdatePutRequest);
}
