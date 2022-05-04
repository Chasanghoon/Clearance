package com.ssafy.cleanrance.domain.user.service;

import com.ssafy.cleanrance.domain.user.db.entity.Location;

import java.util.List;

public interface LocationService {
    List<Location> findLoc(double ypoint, double xpoint);
    List<Object> findLocAndProduct(double ypoint, double xpoint);
}
