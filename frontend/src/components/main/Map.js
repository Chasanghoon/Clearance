import React, { useEffect, useState } from "react";
import cn from "classnames";
import axios from "axios";

const { kakao } = window;

//geolocation의 비동기 처리가 필요할듯

function Map() {

    let lat = 33.450701;
    let lon = 126.570667;

    if (navigator.geolocation) { //비동기 방식으로 데이터를 받아옴(like setTimeout)
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        });
    }

    
    useEffect(() => {
        let container = document.getElementById("map");
        
        setTimeout(function () {
            let map = new window.kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(lat, lon),
			level: 7,
        });
            console.log(lat, lon);
            map.center = (new kakao.maps.LatLng(lat, lon))


        // (05.04)위 경도 받아오는 test
    // axios
    //     .post("대충 URL",
    // {
    //     lat: lat,
    //     lon: lon,
    // }
    //     ,
    // {
    //     headers: { 'Content-Type': 'application/json' }
    // },
    // )
    //     .then((e) => {
    //     console.log("위도/경도 전송");
    //         console.log(e);
    //         localStorage.getItem("lat", e.data[0]);
    //         localStorage.getItem("lon", e.data[1]);
    //     })
    //     .catch((e) => {
    //     console.error("axios post 실패");
    //             console.error(e.message);
    // })

        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(lat, lon),
        });

        // 마커를 표시할 위치와 title 객체 배열입니다 
        var positions = [
            {
                title: '카카오', 
                latlng: new kakao.maps.LatLng(33.451705, 126.570677),
            },
            {
                title: '생태연못', 
                latlng: new kakao.maps.LatLng(33.450936, 126.569477)
            },
            {
                title: '텃밭', 
                latlng: new kakao.maps.LatLng(35.1731702, 128.5619712)
            },
            {
                title: '근린공원',
                latlng: new kakao.maps.LatLng(33.451393, 126.570738)
            }
        ];
        console.log(positions)

        kakao.maps.event.addListener(marker, 'click', function () { console.log(lat,lon) })
        
        // 마커 이미지의 이미지 주소입니다
        let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
            

        /*
        for문에서 해야 할일
        - 받아오는 데이터 : 매점 리스트
        - 받아온 매점 정보들 중 현재 나와의 거리가 3KM 미만인 곳을 마커로 출력
        - 해당 장소 클릭 시 해당 매점이 등록해놓은 상품을 출력.
        - (남으면 추가) 각 마커는 클릭 시 커스텀 오버레이를 출력함.
        */
        for (let i = 0; i < positions.length; i ++) {
            
            // 마커 이미지의 이미지 크기 입니다
            let imageSize = new kakao.maps.Size(24, 35); 
            
            // 마커 이미지를 생성합니다    
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
            
            // 마커를 생성합니다
            let markers = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지
                
            });
            kakao.maps.event.addListener(markers, 'click', function () { alert( positions.position); })
            //클릭 시, 해당 마커에 들어있는 내용을 출력해주면 perfect
        }
            
        },100);

        console.log("loading kakaomap");

    },[]);
    return (
        <div className={cn("Map")}>
            <div className={cn("MapContainer")} id="map" style={{
                width: '100%',
                height: '500px'
            }}>
        </div>
    </div>
    );
}

export default Map;