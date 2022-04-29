package com.ssafy.cleanrance.domain.user.db.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.cleanrance.domain.user.db.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
public class Location implements Serializable {
    @Id
    @Column(name = "location_id")
    int locationId;
    @Column(name = "location_xpoint")
    double locationXpoint;
    @Column(name = "location_ypoint")
    double locationYpoint;
    @Column(name = "user_id")
    String userId;
    @OneToOne
    @JoinColumn(name = "user_id",insertable = false,updatable = false)
    private User user;
}
