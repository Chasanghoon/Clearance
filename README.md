<div align="center">
  <br />
  <img src="./image/Clearance.png" alt="Clearrance" />
  <br />
  <h1>클리어런스</h1>
  <br />
</div>


## 목차

1. [**서비스 소개**](#1)
2. [**기술 스택**](#2)
3. [**Backend**](#3)
4. [**Frontend**](#4)
5. [**협업 관리**](#5)
6. [**산출물**](#6)
7. [**멤버 소개**](#7)

<br/>


<div id="1"></div>

## 💡 서비스 소개

### 일상 속 탄소 배출량 감소를 위한 서비스 "Clearance"

> 전국에 있는 재활용 처리 시설 370곳에서 사료나 퇴비, 바이오가스로 전환하여도 매번 약 20% 이상의 음식물이 남아 <br />
남은 것들을 소각하거나 매립장으로 보낼때마다 그만큼의 환경 문제가 발생되고 있었습니다. <br />Clearance는 매년 계속해서 증가하는 식품 폐기물을 감소시키기 위한 방안에 대해서 고려하였습니다.
#### 마트는 폐기 예정인 물품을 등록하여서 수익을 창출, 소비자는 값싼 가격에 구입할 수 있도록 서비스를 구현하는 것이 서비스의 주요 목표! 

<br/>

<div id="2"></div>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=#007396" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/><br>
<img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=NGINX&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=Ubuntu&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/><br>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/Node.js-339939?style=for-the-badge&logo=Node.js&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br>
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <img src="https://img.shields.io/badge/GitLab-FCA121?style=for-the-badge&logo=GitLab&logoColor=white" style="height : auto; margin-left : 10px; margin-right : 10px;"/> <br/>

<details><summary> <b> 상세 기술스택 및 버전</b> </summary>

| 구분       | 기술스택                    | 상세내용                 | 버전          |
| -------- | ----------------------- | -------------------- | ----------- |
| 공통     | 형상관리                    | Gitlab               | \-          |
|          | 이슈관리                    | Jira                 | \-          |
|          | 커뮤니케이션                  | Mattermost, Collabee | \-          |
| BackEnd  | DB                      | MySQL                | 5.7         |
|          |                         | JPA                  | \-          |
|          |                         | QueryDSL             | \-          |
|          | Java                    | Zulu                 | 8.33.0.1    |
|          | Spring                  | Spring               | 5.3.6       |
|          |                         | Spring Boot          | 2.4.5       |
|          | IDE                     | Eclipse              | JEE 2020-06 |
|          | Cloud Storage           | AWS S3               | \-          |
|          | Build                   | Gradle               | 7.3.2       |
|          | API Docs                | Swagger2             | 3.0.0       |
| FrontEnd | HTML5                   |                      | \-          |
|          | CSS3                    |                      | \-          |
|          | JavaScript(ES6)         |                      |\-           |
|          | React                   | React                | 17.0.2      |
|          | React                   | Redux                | 7.2.6       |
|          | React                   | Redux-thunk          | 2.4.1       |
|          |                         | styled-components    | 5.3.3       |
|          |                         | framer-motion        | 6.0.0       |
|          |                         | apexcharts           | 3.33.0      |
|          |                         | toast-ui/react-editor      | 3.1.2       |
|          |                         | toast-ui/react-calendar    | 1.0.6       |
|          | IDE                     | Visual Studio Code   | 1.63.2      |
| Server   | 서버                      | AWS EC2              | \-          |
|          | 플랫폼                     | Ubuntu               | 20.04.3 LTS |
|          | 배포                      | Docker               | 20.10.12    |
|          | 배포                      | Jenkins              | 2.319.2     |

</details>

<br />

<div id="3"></div>

## 🗂️ Backend

|          시스템 구성           |
| :----------------------------: |
| <img src="./image/graph.png"/> |


|       CI/CD 배포 흐름도        |
| :----------------------------: |
| <img src="./image/graph.png"/> |

|         디렉토리 구조          |
| :----------------------------: |
| <img src="./image/graph.png"/> |

<br />

<div id="4"></div>

## 🖥️ Frontend

### 메인페이지
- 111
- 222
- 333

### 예약
- 111
- 222

|                             예약                             |
| :----------------------------------------------------------: |
| <img src="./readme_assets/onlineclass.gif" alt="온라인수업" /> |

### 마이페이지
- 111
- 222

|                    마이페이지                     |
| :-----------------------------------------------: |
| <img src="./readme_assets/chat.gif" alt="채팅" /> |

### QR코드
- 111
- 222
- 333

|             QR코드             |
| :----------------------------: |
| <img src="./image/graph.png"/> |

|             QR코드             |
| :----------------------------: |
| <img src="./image/graph.png"/> |

### 탄소 발자국 
- 111
- 222

|          탄소 발자국           |
| :----------------------------: |
| <img src="./image/graph.png"/> |

<div id="6"></div>

## 👥 협업 관리 

|                    Jira BurnDown Chart                    |
| :-------------------------------------------------------: |
| <img src="./image/graph.png" alt="Jira BurnDown Chart" /> |

|                  Collabee                   |
| :-----------------------------------------: |
| <img src="./image/tool.png" alt="Notion" /> |

<br />

<div id="9"></div>

## 📋 산출물
|  구분  |  링크  |
| :--------------- | :---------------: |
| 기획서 | [기획서 바로가기](/exce/발표자료.pdf) |
| 요구사항/API 정의서 | [요구사항 정의서 바로가기](https://docs.google.com/spreadsheets/d/11YK9m3-BMdoCCrjv6fx36IJgI-pvypHpYIhc1MlR5Oc/edit#gid=9810042) |
| 플로우차트 | [플로우차트 바로가기](https://www.mindmeister.com/map/2253219011) |
| 스토리보드 | [스토리보드 바로가기](https://www.figma.com/file/MPWOWxpHMV9bMNM4btjs3r/E203) |
| ERD | [ERD 바로가기](https://www.erdcloud.com/team/jCG5JFqNeZTLtQGWN) |
| 발표자료 | [발표자료 바로가기](/exce/발표자료.pdf) |



## 👪 개발 멤버 소개 

<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/">
            <img src="" width="140px" /> <br><br> 👑 강광은 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/">
            <img src="" width="140px" /> <br><br> 🙂 김범주 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/">
            <img src="" width="140px" /> <br><br> 😆 차상훈 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/">
            <img src="" width="140px" /> <br><br> 😁 김윤지 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/">
            <img src="" width="140px" /> <br><br> 🙄 박진성 <br>(Back-End) </a> <br></td>

    </tr>
    <tr>
        <td align="center">UI/UX<br/>React</td>
        <td align="center">UI/UX<br/>React</td>
        <td align="center">REST API<br/>CI/CD<br/>Database</td>
        <td align="center">REST API<br/>Database<br/>Infra</td>
        <td align="center">REST API</td>
    </tr>
</table>

<br />
