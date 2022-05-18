## 💻 사용 도구 및 버전

<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=#007396" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Flask-764ABC?style=for-the-badge&logo=Flask&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/><br>
<img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/><br>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/zustand-339939?style=for-the-badge&logo=React&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br>
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=GitLab&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br/>

<br/>
<summary> <b> 상세 기술스택 및 버전</b> </summary>

| 구분     | 기술스택        | 상세내용             | 버전                                        |
| -------- | --------------- | -------------------- | ------------------------------------------- |
| 공통     | 형상관리        | Gitlab               | \-                                          |
|          | 이슈관리        | Jira                 | \-                                          |
|          | 커뮤니케이션    | Mattermost, Collabee | \-                                          |
| BackEnd  | DB              | MySQL                | 8.0.28-0ubuntu0.20.04.3 for Linux on x86_64 |
|          |                 | JPA                  | \-                                          |
|          |                 | QueryDSL             | \-                                          |
|          | Java            | Zulu                 | 8.33.0.1                                    |
|          | Spring          | Spring               | 5.3.19                                      |
|          |                 | Spring Boot          | 2.6.7                                       |
|          | Python          |                      | 3.8.5                                       |
|          | Flask           |                      | 2.1.1                                       |
|          | IDE             | IntelliJ             | 7.4.1                                       |
|          | Build           | Gradle               | 7.3.2                                       |
|          | API Docs        | Swagger2             | 3.0.0                                       |
| FrontEnd | HTML5           |                      | \-                                          |
|          | CSS3            |                      | \-                                          |
|          | JavaScript(ES6) |                      | \-                                          |
|          | React           | React                | 18.0.0                                      |
|          |                 | react-bootstrap      | 2.3.0                                       |
|          |                 | react-datepicker     | 4.7.0                                       |
|          |                 | react-dom            | 18.0.0                                      |
|          |                 | react-kakao-maps-sdk | 1.0.7                                       |
|          |                 | react-qr-reader      | 3.0.0                                       |
|          |                 | react-reveal         | 1.2.2                                       |
|          |                 | react-router-dom     | 6.3.0                                       |
|          |                 | react-scripts        | 5.0.1                                       |
|          |                 | web-vitals           | 2.1.4                                       |
|          |                 | zustand              | 2.1.4                                       |
|          | IDE             | Visual Studio Code   | 4.0.0                                       |
| Server   | 서버            | AWS EC2              | \-                                          |
|          |                 | Nginx                | 1.20.2                                      |
|          | 플랫폼          | Ubuntu               | 20.04.3 LTS                                 |
|          | 배포            | Docker               | 20.10.13                                    |
|          |                 | Docker-composer      | 1.25.0                                      |
|          |                 | Jenkins              | 2.339                                       |

<br/>

## &#127746;빌드 환경 변수

- git clone : <a>https://lab.ssafy.com/s06-final/S06P31E203.git
- Mysql 설정: application.properties에 DB 설정 추가
- 프론트엔드: VSCode에 npm install,npm run build, npm run start 실행
- 백엔드: IntelliJ에 import 하여 실행

## 📃 DB 접속 정보

- Driver = com.mysql.cj.jdbc.Driver
- ConnectionURL = jdbc:mysql://k6e203.p.ssafy.io:3306/free_ssafy?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul
- Username = ssafy
- Password = ssafy

## 🚢 배포

- AWS EC2 이용하여 배포
- Nginx 설치
- conf 파일 설정
  - /home/ubuntu/S06P22E103/frontend/nginx/nginx.conf

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name k6e203.p.ssafy.io;

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        location / {
                 alias /usr/share/nginx/html;
                 try_files $uri $uri/ /index.html;
                 return 301 https://$server_name$request_uri;
        }
        index index.html;
}

server {
        listen 443 ssl;
        listen [::]:443 ssl;

        server_name k6e203.p.ssafy.io;

        ssl_certificate /var/www/html/fullchain.pem;
        ssl_certificate_key /var/www/html/privkey.pem;

        root /usr/share/nginx/html;
        index index.html;

        location / {
                try_files $uri $uri/ /index.html;
                proxy_connect_timeout 300s;
                proxy_read_timeout 600s;
                proxy_send_timeout 600s;
                proxy_buffers 8 16k;
                proxy_buffer_size 32k;

                        root /usr/share/nginx/html;
                        index index.html;

                proxy_hide_header Access-Controller-Allow-Origin;
                add_header 'Access-Control-Allow-Origin' '*';

                proxy_ssl_server_name on;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $http_host;
                proxy_http_version 1.1;
        }

        location /api {
                proxy_http_version 1.1;
                proxy_pass https://k6e203.p.ssafy.io:8443;
                charset utf-8;

                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Port $server_port;
        }
}

server {
        listen 5001 ssl;
        listen [::]:5001 ssl;

        server_name k6e203.p.ssafy.io;

        ssl_certificate /var/www/html/fullchain.pem;
        ssl_certificate_key /var/www/html/privkey.pem;

        root /usr/share/nginx/html;
        index index.html;

        location / {
                proxy_http_version 1.1;
                proxy_pass https://k6e203.p.ssafy.io:5000;
                charset utf-8;

                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Port $server_port;
        }
}
```
