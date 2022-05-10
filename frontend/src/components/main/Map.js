import axios from "axios";
import { useEffect, useState } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import useMainStore from "../../store/MainStore";

function SampleMap() {

  const cp = useMainStore(state => state.setPosition)

  const nearStore = useMainStore(state => state.nearStore)
  const ns = useMainStore(state => state.setNearStore)
  const storePos = [];

  const nearProduct = useMainStore(state => state.nearProduct)
  const np = useMainStore(state => state.setNearProduct)

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
    {
      title: "카카오",
      latlng: { lat: 33.450705, lng: 126.570677 },
    },
    {
      title: "생태연못",
      latlng: { lat: 33.450936, lng: 126.569477 },
    },
    {
      title: "텃밭",
      latlng: { lat: 33.450879, lng: 126.56994 },
    },
    {
      title: "근린공원",
      latlng: { lat: 33.451393, lng: 126.570738 },
    },
  ]

  //데이터 받아오기! (geolocation으로 현재 위치를 받아옴 -> axios로 주변 매점 정보 가져옴 -> store에 해당 매점 데이터 저장
  // store에 저장된 데이터를 이용해서 map에 마커를 띄움. 그리고 그 marker를 클릭하면 main에서 등록한 상품들을 출력)




  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap()
    const [isVisible, setIsVisible] = useState(false)


    let roundMarkerLat = 0;
    let roundMarkerLng = 0;
    let roundStoreLat = 0;
    let roundStoreLng = 0;
    let storeName = "";

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
        onClick={
          (marker) => {
            // console.log(marker)
            {
              storePos.map((value, index) => {
                // console.log(marker.getPosition().Ma);
                // console.log(storePos[index].latlng.lat);
                // console.log("==================================");
                // console.log(marker.getPosition().La);
                // console.log(storePos[index].latlng.lng);
                // console.log("==================================");
                roundMarkerLat = marker.getPosition().Ma.toFixed(10);
                roundMarkerLng = marker.getPosition().La.toFixed(10);
                roundStoreLat = storePos[index].latlng.lat.toFixed(10);
                roundStoreLng = storePos[index].latlng.lng.toFixed(10);
                console.log(roundMarkerLat);
                console.log(roundStoreLat);
                console.log(roundMarkerLng);
                console.log(roundStoreLng);
                console.error("======================");
                if (roundMarkerLat === roundStoreLat && roundMarkerLng === roundStoreLng) {
                  storeName = storePos[index].userId;
                  console.warn("storeName = " + storeName);
                }
              }
              )
            }
          }
        }
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
          cp(state.center.lat, state.center.lng)

          axios
            .get(`http://localhost:8080/api/mapProduct?ypoint=35.1275983422866&xpoint=128.968358334702`)
            .then((e) => {
              console.log("axios 성공")
              console.log(e.data[0]);
              ns(e.data[0]);


              np(e.data[1]);

            })
            .catch((e) => {
              console.log(e.message)
            })



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

    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])


  console.log(nearStore)
  console.log(nearProduct)
  for (let i = 0; i < nearStore.length; i++) {
    storePos.push({
      latlng: {
        lat: nearStore[i].locationYpoint,
        lng: nearStore[i].locationXpoint,
      },
      userId: nearStore[i].userId,
    })
  }
  console.log(storePos);
  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "auto",
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
                console.log(state.center.lat, state.center.lng)
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
        {storePos.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            onClick={console.log(value.latlng.lat, value.latlng.lng, value.userId)}
          />
        ))}

      </Map>
    </>
  )
}


export default SampleMap;