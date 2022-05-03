package com.ssafy.cleanrance.domain.user.service;

import com.ssafy.cleanrance.domain.user.db.entity.Location;
import com.ssafy.cleanrance.domain.user.db.entity.User;
import com.ssafy.cleanrance.domain.user.db.repository.LocationRepository;
import com.ssafy.cleanrance.domain.user.db.repository.UserRepository;
import com.ssafy.cleanrance.domain.user.db.repository.UserRepositorySupport;
import com.ssafy.cleanrance.domain.user.request.StoreSignUpRequest;
import com.ssafy.cleanrance.domain.user.request.UserSignUpRequest;
import com.ssafy.cleanrance.global.util.ImageUtil;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.util.Optional;

@Service("locationService")
public class LocationServiceImpl implements LocationService{


}
