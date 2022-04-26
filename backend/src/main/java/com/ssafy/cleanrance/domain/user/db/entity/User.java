package com.ssafy.cleanrance.domain.user.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class User implements Serializable {
    @Id
    @Column(name = "user_id", updatable = false)
    String userId;
    @Column(name = "user_role")
    int userRole;
    @Column(name = "user_password")
    String userPassword;
    @Column(name = "user_email")
    String userEmail;
    @Column(name = "user_phone")
    String userPhone;
    @Column(name = "user_address")
    String userAddress;
    @Column(name = "user_joindate")
    LocalDateTime userJoindata;
    @Column(name = "user_store")
    String userStore;
    @Column(name = "user_licenseNum")
    String userLicenseNum;
    @Column(name = "user_image")
    String userImage;
    @Column(name = "user_storesignup")
    Boolean userStoresignup;
}
