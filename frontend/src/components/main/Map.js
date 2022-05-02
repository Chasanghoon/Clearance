import React, { useEffect } from "react";
import cn from "classnames";

const { kakao } = window;


function Map() {
// new kakao.maps.LatLng(33.450701, 126.570667)
    useEffect(() => {
        let container = document.getElementById("map");

        let lat = 0;
        let lon = 0;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude; // 위도
                lon = position.coords.longitude; // 경도
                console.log("왜 맵이 안나옴?")
                console.log(lat, lon)
            });
        } else {
            lat = 33.450701;
            lon = 126.570667;
        }

        let pos = new kakao.maps.LatLng(lat, lon)

        let options = {
            center: pos,
			level: 3,
        }
        let map = new window.kakao.maps.Map(container, options);

        console.log("loading kakaomap");

        // --------------- 마커 표시 ---------------
        let markerPosition = new kakao.maps.LatLng(lat, lon); 

        var marker = new kakao.maps.Marker({
            position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);
        
        
        
        // infowindow.open(map, marker)

        // 마커를 표시할 위치와 title 객체 배열입니다 
        // db에서 리스트를 가져와서 
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

        kakao.maps.event.addListener(marker, 'click', function () { console.log(pos,lat,lon) })
        
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
            kakao.maps.event.addListener(markers, 'click', function () { alert(positions[i].title); })
            //클릭 시, 해당 마커에 들어있는 내용을 출력해주면 perfect
        }

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