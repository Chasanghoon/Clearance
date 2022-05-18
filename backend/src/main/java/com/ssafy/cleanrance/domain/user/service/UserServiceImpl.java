package com.ssafy.cleanrance.domain.user.service;
import com.ssafy.cleanrance.domain.user.db.entity.Location;
import com.ssafy.cleanrance.domain.user.db.entity.User;
import com.ssafy.cleanrance.domain.user.db.repository.LocationRepository;
import com.ssafy.cleanrance.domain.user.db.repository.UserRepository;
import com.ssafy.cleanrance.domain.user.db.repository.UserRepositorySupport;
import com.ssafy.cleanrance.domain.user.request.StoreSignUpRequest;
import com.ssafy.cleanrance.domain.user.request.UserPutRequest;
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

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

import java.net.MalformedURLException;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Optional;

@Service("userService")
public class UserServiceImpl implements UserService {
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
    public String createStore(StoreSignUpRequest storeSignUpRequest, MultipartFile image) throws IOException {
        Optional<User> check = userRepository.findById(storeSignUpRequest.getUser_id());
        check.ifPresent(checkUser -> {
            throw  new IllegalStateException("이미 존재하는 회원입니다.");
        });
        User user = new User();
        user.setUserId(storeSignUpRequest.getUser_id());
        user.setUserName(storeSignUpRequest.getUser_name());
        user.setUserRole(2);
        user.setUserName(storeSignUpRequest.getUser_name());
        user.setUserPassword(passwordEncoder.encode(storeSignUpRequest.getUser_password()));
        user.setUserEmail(storeSignUpRequest.getUser_email());
        user.setUserPhone(storeSignUpRequest.getUser_phone());
        user.setUserAddress(storeSignUpRequest.getUser_address());
        LocalDateTime time = LocalDateTime.now();
        user.setUserJoindate(time);
        user.setUserLicensenum(storeSignUpRequest.getUser_licensenum());
        //이미지 Base64 인코딩 소스로 변환
        if(image != null){
            MultipartFile mfile = image;
            File file = ImageUtil.multipartFileToFile(mfile);
            byte[] byteArr = FileUtils.readFileToByteArray(file);
            String base64 = "data:image/jpeg;base64," + new Base64().encodeToString(byteArr);
            System.out.println(base64);
            //인코딩된 소스로 userImage 저장
            user.setUserImage(base64);
        }else{
            user.setUserImage("data:image/jpeg;base64,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");
        }
        //매장 주소로 위도 경도 찾기
        Location loc = addressToLngLat(user.getUserAddress(), user.getUserId());
        userRepository.save(user);
        locationRepository.save(loc);

        return "OK";
    }

    @Override
    public String createUser(UserSignUpRequest userSignUpRequest, MultipartFile image) throws IOException {
        Optional<User> check = userRepository.findById(userSignUpRequest.getUser_id());
        check.ifPresent(checkUser -> {
            throw  new IllegalStateException("이미 존재하는 회원입니다.");
        });
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
        if(image != null){
            //이미지 Base64 인코딩 소스로 변환
            MultipartFile mfile = image;
            //File null인 경우
            File file = ImageUtil.multipartFileToFile(mfile);
            //파일 크기 조정
            // read an image to BufferedImage for processing
            BufferedImage originImage = ImageIO.read(file);
            int type = originImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originImage.getType();
            BufferedImage resizeImg = resizeImage(originImage, type);
            File resizeFile = new File("saved.png");
            ImageIO.write(resizeImg, "png", resizeFile);
            //end 파일 크기 조정
            byte[] byteArr = FileUtils.readFileToByteArray(resizeFile);
            String base64 = "data:image/jpeg;base64," + new Base64().encodeToString(byteArr);
            System.out.println(base64);
            //인코딩된 소스로 userImage 저장
            user.setUserImage(base64);
        }else{
            user.setUserImage("data:image/jpeg;base64,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");
        }
        userRepository.save(user);
        return "OK";
    }

    @Override
    public Optional<User> findById(String userId) {
        Optional<User> user = userRepository.findById(userId);
        return user;
    }


    @Override
    public Optional<User> updateUser(UserPutRequest user) {
        Optional<User> updateUser = userRepository.findById(user.getUser_id());
//       이름,이메일,전화번호, 주소 수정
        updateUser.ifPresent(selectUser -> {
            selectUser.setUserEmail(user.getUser_email());
            selectUser.setUserPhone(user.getUser_phone());
            selectUser.setUserName(user.getUser_name());
            if(selectUser.getUserRole() == 2){
                if(selectUser.getUserAddress() != user.getUser_address()){
                    Location loc = locationRepository.findByuserId(selectUser.getUserId());
                    Location location = addressToLngLat(user.getUser_address(), selectUser.getUserId());
                    loc.setLocationXpoint(location.getLocationXpoint());
                    loc.setLocationYpoint(location.getLocationYpoint());
                    locationRepository.save(loc);
                }
            }
            selectUser.setUserAddress(user.getUser_address());
            userRepository.save(selectUser);
        });
        return updateUser;
    }

    @Override
    public String deleteUser(String userId) {
        Optional<User> user = userRepository.findById(userId);
        System.out.println(user);
        userRepository.deleteById(userId);
        return "OK";
    }

    private BufferedImage resizeImage(BufferedImage origin, int type) {
        BufferedImage resizeImg = new BufferedImage(100, 100, type);
        Graphics2D graphics2D = resizeImg.createGraphics();
        graphics2D.drawImage(origin, 0, 0, 100, 100, null);
        graphics2D.dispose();
        graphics2D.setComposite(AlphaComposite.Src);
        //보간 관련
        graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        //렌더링
        graphics2D.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_SPEED);
        //안티엘리어싱 여부
        graphics2D.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        return resizeImg;
    }

    private Location addressToLngLat(String address, String userId) {
        //매장 주소로 위도 경도 찾기
        String APIKey = "162a4b2b1191ced1dc56afc5f9bbde83";
        String URL = "http://dapi.kakao.com/v2/local/search/address.json?query=";
        String jsonString = null;
        String addr = address;
        Location location = new Location();
        try {
            addr = URLEncoder.encode(address, "UTF-8");
            String juso = URL + addr;
            URL url = new URL(juso);
            URLConnection conn = url.openConnection();
            conn.setRequestProperty("Authorization", "KakaoAK " + APIKey);
            //리턴 받은 json읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            //String Buffer에 담기
            StringBuffer docJson = new StringBuffer();
            String line;
            while ((line = br.readLine()) != null) {
                docJson.append(line);
            }
            br.close();
            //JSONObject로 변경
            JSONObject jsonObject = new JSONObject(docJson.toString());
            //documents와 meta 두개의 맵중에 x,y가 들어있는 documents가져오기
            JSONArray jsonArray = (JSONArray) jsonObject.get("documents");
            JSONObject tempObj = (JSONObject) jsonArray.get(0);
            System.out.println("lat : " + tempObj.getDouble("y"));
            System.out.println("lng : " + tempObj.getDouble("x"));
            double y = tempObj.getDouble("y");
            double x = tempObj.getDouble("x");
            location.setLocationXpoint(x);
            location.setLocationYpoint(y);
            location.setUserId(userId);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return location;
    }
}
