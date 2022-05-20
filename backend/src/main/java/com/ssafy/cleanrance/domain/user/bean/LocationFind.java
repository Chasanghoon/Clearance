package com.ssafy.cleanrance.domain.user.bean;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LocationFind {
    Integer location_id;
    String user_id;
    double location_xpoint;
    double location_ypoint;
    String user_name;
}
