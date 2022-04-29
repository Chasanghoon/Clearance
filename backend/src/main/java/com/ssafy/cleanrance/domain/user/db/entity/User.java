package com.ssafy.cleanrance.domain.user.db.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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
    @Column(name = "user_name")
    String userName;
    @Column(name = "user_password")
    String userPassword;
    @Column(name = "user_email")
    String userEmail;
    @Column(name = "user_phone")
    String userPhone;
    @Column(name = "user_address")
    String userAddress;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "user_joindate")
    LocalDateTime userJoindate;
    @Column(name = "user_licensenum")
    String userLicensenum;
    @Column(name = "user_image")
    String userImage;

//    @JsonIgnore
    @OneToOne(mappedBy = "user")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Location location;
}
