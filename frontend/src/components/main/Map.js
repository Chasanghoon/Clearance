import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import useMainStore from "../../store/MainStore";
import { Row, Col } from 'react-bootstrap'

function SampleMap() {

  const cp = useMainStore(state => state.setPosition)

  const nearStore = useMainStore(state => state.nearStore) // 근처 점포
  const ns = useMainStore(state => state.setNearStore) // 근처 점포 목록을 가져옴

  const storePos = []; // 근처 점포 목록의 위치를 기억(마커 표시 목적)

  const nearProduct = useMainStore(state => state.nearProduct) // 근처 매점의 상품들
  const np = useMainStore(state => state.setNearProduct) // 근처 매점들의 정보를 가져옴

  const categoryList = useMainStore(state => state.categoryList) // 카테고리 값을 지정할 수 있음
  const cl = useMainStore(state => state.setCategoryList) // 카테고리 목록을 가져옴

  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState({
    center: {
      lat: null, // 위도
      lng: null, // 경도
    },
    errMsg: null,
    isLoading: true,
  })

  const [categoryID, setCategoryId] = useState(20);
  const changeCategoryId = (e) => {
    if (e === categoryID) setCategoryId(20);
    else setCategoryId(e)
  }


  const [storeID, setStoreId] = useState("");
  const chStoreID = (e) => {
    setStoreId(e);
  }
  const [word, setWord] = useState("");
  const chWord = (e) => {
    setWord(e);
  }


  const callCategory = async () => { //카테고리 목록을 가져오는 변수
        try {
          const response = await axios.get(`https://k6e203.p.ssafy.io:8443/api/productcategory`)
          console.log("카테고리 로드 성공")
          
          cl(response.data)
        }
        catch(err) {
          console.log(err)
        }
  }

  // Default 값을 넣어줘야 할듯...? 문희코치님께 여쭤보자!!!!(X) => 수정 완료.
  const search = async () => {
    try {
      const response = await axios.get(`https://k6e203.p.ssafy.io:8443/api/product/list?ypoint=${state.center.lat}&xpoint=${state.center.lng}&storeId=${storeID}&categoryId=${categoryID}&word=${word}`)
      console.log(response)
      np(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getLocations = async () => { // 상품 정보를 가져오는 함수
      cp(state.center.lat, state.center.lng)
      try {
        const response = await axios.get(`https://k6e203.p.ssafy.io:8443/api/mapProduct?ypoint=${state.center.lat}&xpoint=${state.center.lng}`)
        console.log("상품 정보 출력 성공")
        console.log(response)

      ns(response.data[0]) // 주변 매장 점포 등록
      if (response.data.length >= 2) {
        for (let i = 1; i < response.data.length; i++) {
          console.log(response.data[i])
          // np(response.data[i])
        }
      }

      // np(response.data[1]) // 주변 매장의 데이터 등록
    }
    catch (err) {
      console.log(err)
    }
  }

  const EventMarkerContainer = ({ position, content }) => { // 주변 마커 출력을 위한 함수
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
  // --------------------------------- useEffect 사용 --------------------------------- 
  useEffect(() => { // geolocation을 활용하여 현재 위치를 가져오는 userEffect
    np([]);
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
            enableHighAccuracy: true,
          }))


          callCategory();
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


  useEffect(() => {
    if (state.center.lat !== null) {
      console.log("useEffect 작동")
      console.log("categoryId :", categoryID, ", storeId : ", storeID, ", word : ", word)

      search();
    }
  }, [categoryID, storeID, word])

  useEffect(() => {
    if (state.center.lat !== null) {

      getLocations();
      search();
    }
  }, [state.center.lat, state.center.lng])

  // --------------------------------- useEffect 사용 종료 --------------------------------- 
  for (let i = 0; i < nearStore.length; i++) {
    storePos.push({
      latlng: {
        lat: nearStore[i].locationYpoint,
        lng: nearStore[i].locationXpoint,
      },
      userId: nearStore[i].userId,
    })


  }

  function Category() {
    return (
      <div>
        {console.log(categoryID)}
        {categoryList.map((value, index) => (
          <button
            key={index}
            id={value.categoryId}
            style={{
              borderRadius: "15px",
              fontSize: '15px'
            }}
            onClick={() => {
              changeCategoryId(value.categoryId)
            }}
          // onClick={() => { clickCategory(value.categoryId) }} // 해당 카테고리의 상품만 가져오게 만들기 or 모든 상품을 가져오게 되돌리기
          >{value.categoryName}</button>

        ))}
      </div>)



  }
  let roundMarkerLat = 0;
  let roundMarkerLng = 0;
  let roundStoreLat = 0;
  let roundStoreLng = 0;
  let storeName = "";
  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "auto",
          height: "450px",
        }}
        level={7} // 지도의 확대 레벨
      >
        {!state.isLoading && (
          <MapMarker position={state.center}
          // clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          // 마커에 마우스오버 이벤트를 등록합니다

          >
            {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
        {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 R  eact Component가 가능합니다 */}
        {isOpen && <div style={{ padding: "5px", color: "#000" }}>Hello World!</div>}
        </MapMarker>
            )}
        {storePos.map((value, index) => (
          <EventMarkerContainer
            // key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            key={value.userId}
            // key={index}
            position={value.latlng}
          />
        ))}
      </Map>
      <Category></Category>

      <Container>
        <Row>
          <Col sm>
            <input id="searchWord" style={{ backgroundColor: 'beige', width: '97%' }}></input>
            현재 카테고리ID : {console.log(categoryID)}
            <button id='search' onClick={() => {
              setWord(document.getElementById("searchWord").value)
            }} >검색</button>
          </Col>
        </Row>
      </Container>
    </>
  )
}


export default SampleMap;