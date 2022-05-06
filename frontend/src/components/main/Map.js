import axios from "axios";
import { useEffect, useState } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import useStore from "../../store/store";

function SampleMap() {
  const people = useStore(state => state.people)
const [isOpen, setIsOpen] = useState(false)
const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
})
    
    const data = [
    // {
    //   title: "카카오",
    //   latlng: { lat: 33.450705, lng: 126.570677 },
    // },
    // {
    //   title: "생태연못",
    //   latlng: { lat: 33.450936, lng: 126.569477 },
    // },
    // {
    //   title: "텃밭",
    //   latlng: { lat: 33.450879, lng: 126.56994 },
    // },
    // {
    //   title: "근린공원",
    //   latlng: { lat: 33.451393, lng: 126.570738 },
    // },
  ]
  
  
    
    const EventMarkerContainer = ({ position, content }) => {
    const map = useMap()
    const [isVisible, setIsVisible] = useState(false)

      return (
        <MapMarker
          position={position} // 마커를 표시할 위치
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
            size: {
              widht: 24,
              height: 35
            }, // 마커이미지의 크기입니다
          }}
          // @ts-ignore
          onClick={(marker) => {
            map.panTo(marker.getPosition())
            console.log(marker.getPosition())
          }}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    )
  }

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
            
          }))
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity
        }
      )
      //데이터 받아오기! (geolocation으로 현재 위치를 받아옴 -> axios로 주변 매점 정보 가져옴 -> store에 해당 매점 데이터 저장
      // store에 저장된 데이터를 이용해서 map에 마커를 띄움. 그리고 그 marker를 클릭하면 main에서 등록한 상품들을 출력)
      axios
        .get(`https://k6e203.p.ssafy.io/api/map/?ypoint=35.1275983422866&xpoint=128.968358334702`)
        .then((e) => {
          console.log("axios 성공")
          console.log(e.data);
          for (let i = 0; i < e.data.length; i++) {
            data.push({
              title: e.data[i].userId,
              latlng: { lat: e.data[i].locationYpoint, lng: e.data[i].locationXpoint },
            });
          }

        })
        .catch((e) => {
          console.log(e.message)
        })
      console.log(data);
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])

<<<<<<< HEAD
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
        for (let i = 0; i < positions.length; i++) {

            // 마커 이미지의 이미지 크기 입니다
            let imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다    
            let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            let markers = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지

            });
            kakao.maps.event.addListener(markers, 'click', function () { alert( positions.position); })
            //클릭 시, 해당 마커에 들어있는 내용을 출력해주면 perfect
        }
            
        },1000);

        console.log("loading kakaomap");

    }, []);
    return (
        <div className={cn("Map")}>
            <div className={cn("MapContainer")} id="map" style={{
                width: '100%',
                height: '300px'
            }}>
        </div>
    </div>
    );
=======
  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={3} // 지도의 확대 레벨
      >
        {!state.isLoading && (
        <MapMarker position={state.center}
            clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            // 마커에 마우스오버 이벤트를 등록합니다
            onMouseOver={
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
              () => {
                console.log(state.center.lat,state.center.lng)
                setIsOpen(true)
                console.log()
              }
            }
            // 마커에 마우스아웃 이벤트를 등록합니다
            onMouseOut={
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            () => setIsOpen(false)
            }
        >
            {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
        {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
        {isOpen && <div style={{ padding: "5px", color: "#000" }}>Hello World!</div>}
        </MapMarker>
            )}
            {data.map((value) => (
        <EventMarkerContainer
          key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
          position={value.latlng}
          content={value.content}
          onClick={console.log(value.latlng.lat,value.latlng.lng)}
        />
      ))}
      </Map>
      <p>{people.length}</p>
      <div>
        {people.map((p) => (
          <span>{p}</span>
        ))}
      </div>
    </>
  )
>>>>>>> feat/FE/main
}
        

export default SampleMap;