package com.ssafy.cleanrance.domain.user.service;
import com.ssafy.cleanrance.domain.user.db.entity.Location;
import com.ssafy.cleanrance.domain.user.db.entity.User;
import com.ssafy.cleanrance.domain.user.db.repository.LocationRepository;
import com.ssafy.cleanrance.domain.user.db.repository.UserRepository;
import com.ssafy.cleanrance.domain.user.db.repository.UserRepositorySupport;
import com.ssafy.cleanrance.domain.user.request.StoreSignUpRequest;
import com.ssafy.cleanrance.domain.user.request.UserSignUpRequest;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.util.Optional;

@Service("userService")
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepositorySupport userRepositorySupport;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LocationRepository locationRepository;
    @Lazy
    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    public String createStore(StoreSignUpRequest storeSignUpRequest) {
        Optional<User> check = userRepository.findById(storeSignUpRequest.getUser_id());
        if(check.isPresent()) {
            return "";
        }
        User user = new User();
        //request toUser
        user.setUserId(storeSignUpRequest.getUser_id());
        user.setUserRole(2);
        user.setUserName(storeSignUpRequest.getUser_store());
        user.setUserPassword(passwordEncoder.encode(storeSignUpRequest.getUser_password()));
        user.setUserEmail(storeSignUpRequest.getUser_email());
        user.setUserPhone(storeSignUpRequest.getUser_phone());
        user.setUserAddress(storeSignUpRequest.getUser_address());
        LocalDateTime time = LocalDateTime.now();
        user.setUserJoindate(time);
        user.setUserStore(storeSignUpRequest.getUser_store());
        String APIKey = "162a4b2b1191ced1dc56afc5f9bbde83";
        String URL="http://dapi.kakao.com/v2/local/search/address.json?query=";
        String jsonString = null;
        String addr = user.getUserAddress();
        try{
            addr = URLEncoder.encode(storeSignUpRequest.getUser_address(),"UTF-8");
            String juso = URL+addr;
            URL url = new URL(juso);
            URLConnection conn = url.openConnection();
            conn.setRequestProperty("Authorization","KakaoAK "+APIKey);
            //리턴 받은 json읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            //String Buffer에 담기
            StringBuffer docJson = new StringBuffer();
            String line;
            while((line = br.readLine()) != null){
                docJson.append(line);
            }
            br.close();
            //JSONObject로 변경
            JSONObject jsonObject = new JSONObject(docJson.toString());
            //documents와 meta 두개의 맵중에 x,y가 들어있는 documents가져오기
            JSONArray jsonArray= (JSONArray) jsonObject.get("documents");
            JSONObject tempObj = (JSONObject) jsonArray.get(0);
            System.out.println("lat : " + tempObj.getDouble("y"));
            System.out.println("lng : " + tempObj.getDouble("x"));
            double y = tempObj.getDouble("y");
            double x = tempObj.getDouble("x");
            Location location = new Location();
            location.setLocationXpoint(x);
            location.setLocationYpoint(y);
            location.setUserId(user.getUserId());
            userRepository.save(user);
            locationRepository.save(location);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "OK";
    }
    @Override
    public String createUser(UserSignUpRequest userSignUpRequest) {
        Optional<User> check = userRepository.findById(userSignUpRequest.getUser_id());
        if(check.isPresent()) {
           return "";
        }
        User user = new User();
        user.setUserId(userSignUpRequest.getUser_id());
        user.setUserRole(3);
        user.setUserName(userSignUpRequest.getUser_name());
        user.setUserPassword(passwordEncoder.encode(userSignUpRequest.getUser_password()));
        user.setUserEmail(userSignUpRequest.getUser_email());
        user.setUserPhone(userSignUpRequest.getUser_phone());
        user.setUserAddress(userSignUpRequest.getUser_address());
        LocalDateTime time = LocalDateTime.now();
        user.setUserJoindate(time);
        //이미지
        userRepository.save(user);
        return "OK";
    }

    @Override
    public User findById(String userId) {
        User user = userRepositorySupport.findById(userId);
        return user;
    }

    @Override
    public User findByEmail(String userEmail) {
        return null;
    }

    @Override
    public String deleteUser(String userId) {
        Optional<User> user = Optional.ofNullable(userRepositorySupport.findById(userId));
        if(null != user){
            userRepository.deleteById(userId);
        }
        return "OK";
    }
}
