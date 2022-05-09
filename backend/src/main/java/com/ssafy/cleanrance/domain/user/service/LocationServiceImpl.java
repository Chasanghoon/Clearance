package com.ssafy.cleanrance.domain.user.service;

import com.ssafy.cleanrance.domain.product.db.entity.Product;
import com.ssafy.cleanrance.domain.product.db.repository.ProductRepositorySupport;
import com.ssafy.cleanrance.domain.user.db.entity.Location;
import com.ssafy.cleanrance.domain.user.db.repository.LocationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("locationService")
public class LocationServiceImpl implements LocationService{
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    ProductRepositorySupport productRepositorySupport;
    @Override
    public List<Location> findLoc(double ypoint, double xpoint) {
        List<Location> loc = locationRepository.findAll();
        List<Location> list = new ArrayList<>();
        int num = 2000;
        for (Location l: loc) {
            double x = l.getLocationXpoint();
            double y = l.getLocationYpoint();
            double theta = x- xpoint;
            double dist = Math.sin(def2rad(y)) * Math.sin(def2rad(ypoint)) + Math.cos(def2rad(y)) * Math.cos(def2rad(ypoint)) * Math.cos(def2rad(theta));
            dist = Math.acos(dist);
            dist = rad2deg(dist);
            dist = dist * 60 * 1.1515;
            //meter로 변환
            dist = dist * 1609.344;

            System.out.println(dist);
            if(dist <num){
                list.add(l);
            }
        }
        return list;
    }

    @Override
    public List<Object> findLocAndProduct(double ypoint, double xpoint) {
        List<Location> loc = locationRepository.findAll();
        List<Location> list = new ArrayList<>();
        int num = 2000;
        for (Location l: loc) {
            double x = l.getLocationXpoint();
            double y = l.getLocationYpoint();
            double theta = x- xpoint;
            double dist = Math.sin(def2rad(y)) * Math.sin(def2rad(ypoint)) + Math.cos(def2rad(y)) * Math.cos(def2rad(ypoint)) * Math.cos(def2rad(theta));
            dist = Math.acos(dist);
            dist = rad2deg(dist);
            dist = dist * 60 * 1.1515;
            //meter로 변환
            dist = dist * 1609.344;

            System.out.println(dist);
            if(dist <num){
                list.add(l);
            }
        }
        List<Object> obj = new ArrayList<>();
        obj.add(list);
//        List<List<Product>> productList = new ArrayList<>();
        for (Location loca: list) {
            List<Product> products= productRepositorySupport.findProductByStoreId(loca.getUserId());
            obj.add(products);
        }
        return obj;
    }

    //십진수를 radian으로 변경
    private static double def2rad(double deg){
        return (deg * Math.PI /180.0);
    }
    //radian을 십진수로 변경
    private  static double rad2deg(double rad){
        return (rad * 180/ Math.PI);
    }
}
