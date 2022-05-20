import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, FormControl, InputGroup, Table } from "react-bootstrap";
import { Map, MapMarker, useMap, CustomOverlayMap } from "react-kakao-maps-sdk";
import useMainStore from "../../store/MainStore";
import { Row, Col } from 'react-bootstrap'
import "../../App.css"


function SampleMap() {

  const [isVisible, setIsVisible] = useState(false);
  const [isStore, setIsStore] = useState("");
  const [myHome, setMyHome] = useState({
    center: {
      lat: null, // 위도
      lng: null, // 경도
    },
    errMsg: null,
    isPanto: false,
    isLoading: true,
  });

  const cp = useMainStore(state => state.setPosition)
  const nearStore = useMainStore(state => state.nearStore) // 근처 점포
  const ns = useMainStore(state => state.setNearStore) // 근처 점포 목록을 가져옴
  const storePos = []; // 근처 점포 목록의 위치를 기억(마커 표시 목적)
  const nearProduct = useMainStore(state => state.nearProduct) // 근처 매점의 상품들
  const np = useMainStore(state => state.setNearProduct) // 근처 매점들의 정보를 가져옴
  const categoryList = useMainStore(state => state.categoryList) // 카테고리 값을 지정할 수 있음
  const cl = useMainStore(state => state.setCategoryList) // 카테고리 목록을 가져옴
  const [isOpen, setIsOpen] = useState(0)
  const [state, setState] = useState({
    center: {
      lat: null, // 위도
      lng: null, // 경도
    },
    errMsg: null,
    isPanto: false,
    isLoading: true,
  })
  const [categoryID, setCategoryId] = useState(20);
  const changeCategoryId = (e) => {
    if (e === categoryID) setCategoryId(20);
    else setCategoryId(e)
  }
  const [categoryName, setCategoryName] = useState("없음");
  const changeCategoryName = (e) => {
    if (e === categoryName) setCategoryName("없음")
    else setCategoryName(e)
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

      cl(response.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const search = async () => {
    try {
      const response = await axios.get(`https://k6e203.p.ssafy.io:8443/api/product/list?ypoint=${state.center.lat}&xpoint=${state.center.lng}&storeId=${storeID}&categoryId=${categoryID}&word=${word}`)
      np(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getLocations = async () => { // 상품 정보를 가져오는 함수
    cp(state.center.lat, state.center.lng)
    try {
      const response = await axios.get(`https://k6e203.p.ssafy.io:8443/api/mapProduct?ypoint=${state.center.lat}&xpoint=${state.center.lng}`)
      ns(response.data[0]) // 주변 매장 점포 등록
      if (response.data.length >= 2) {
        for (let i = 1; i < response.data.length; i++) {
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => { // geolocation을 활용하여 현재 위치를 가져오는 userEffect
    np([]);
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: 35.1012889287059, // 위도
              lng: 128.971520894865, // 경도
            },
            isLoading: false,
            isPanto: false,
            enableHighAccuracy: true,
          }))
          setMyHome((prev) => ({
            ...prev,
            center: {
              lat: 35.1012889287059, // 위도
              lng: 128.971520894865, // 경도
            },
            isLoading: false,
            isPanto: false,
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
      setMyHome((prev) => ({
        ...prev,
        center: {
          lat: 35.1275983422866, // 위도
          lng: 128.968358334702, // 경도
        },
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }))
    }
  }, [])
  useEffect(() => {
    if (state.center.lat !== null) {
      console.log("useEffect 작동")
      search();
    }
  }, [categoryID, storeID, word])
  useEffect(() => {
    if (state.center.lat !== null) {

      getLocations();
      search();
    }
  }, [state.center.lat, state.center.lng])

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    console.log("스토어 아이디 확인 ㅇㅅㅇ ", storeID)
    axios
      .get(`https://k6e203.p.ssafy.io:8443/api/member?userId=${storeID}`)

      .then((result) => {
        console.log('result: ', result);
        if (result.data === null) return
        setUserName(result.data.userName);
        setUserImage(result.data.userImage);
        setUserAddress(result.data.userAddress);
        setUserPhone(result.data.userPhone);
      })
      .catch((e) => {
        console.error("axios get 실패");
        console.error(e)
      });
  }, [storeID])

  for (let i = 0; i < nearStore.length; i++) {
    storePos.push({
      latlng: {
        lat: nearStore[i].location_ypoint,
        lng: nearStore[i].location_xpoint,
      },
      userId: nearStore[i].user_id,
    })
  }

  let arr1 = [];
  let arr2 = [];
  function Category() {
    categoryList.map((data) => (
      arr1.push(data)
    ));
    arr2.push(arr1.slice(0, 3));
    arr2.push(arr1.slice(3, 6));
    arr2.push(arr1.slice(6, 9));
    arr2.push(arr1.slice(9, 12));
    arr2.push(arr1.slice(12, 15));
    return (
      <div className="MainCategory">
        {arr2.map((data) => (
          <div className="categoryDiv">
            {data.map((d) => (
              <Button
                className={d.categoryId === categoryID ? "mapCategory1" : "mapCategory2"}
                onClick={() => {
                  changeCategoryName(d.categoryName)
                  changeCategoryId(d.categoryId)
                }}
              >{d.categoryName}</Button>
            ))}
          </div>
        ))}
      </div>
    )
  }

  let roundMarkerLat = 0;
  let roundMarkerLng = 0;
  let roundStoreLat = 0;
  let roundStoreLng = 0;
  let storeName = "";
  return (
    <div className="map" style={{
      backgroundColor: "#edf3f9",
      paddingBottom: "10px",
    }}>
      <Map // 지도를 표시할 Container
        center={myHome.center}
        isPanto={myHome.isPanto}
        style={{
          // 지도의 크기
          width: "auto",
          height: "300px",
          borderRadius: "20px",
          boxShadow : "2px 2px 3px rgb(150,150,150)",
        }}
        level={7} // 지도의 확대 레벨
      >
        {!state.isLoading && (
          <MapMarker position={state.center} // 본인의 위치를 보여주는 마커
            image={{
              src: "img/home.png", // 본인의 위치를 표시할 이미지입니다.
              size: {
                widht: 36,
                height: 52.5
              }, // 마커이미지의 크기입니다
            }}
            onClick={() => console.log(state.center)}
          >
          </MapMarker>
        )}
        {nearStore.map((value, index) => (
          <>
            <MapMarker
              position={{
                lat: value.location_ypoint,
                lng: value.location_xpoint
              }}
              image={{
                src: "img/shop.png", // 마커이미지의 주소입니다
                size: {
                  widht: 36,
                  height: 53
                }, // 마커이미지의 크기입니다
              }}
              onClick={(marker) => {
                setIsVisible(true)
                setIsStore(value.user_name);
                chStoreID(value.user_id);
                setUserId(value.user_id);
                setMyHome((prev) => ({
                  ...prev,
                  center: {
                    lat: value.location_ypoint + 0.015, // 위도
                    lng: value.location_xpoint, // 경도
                  },
                  errMsg: "",
                  isPanto: true,
                  isLoading: false,
                }))

              }} />
            {console.log(storeID)}
            {isVisible && isStore == value.user_name &&
              <CustomOverlayMap
                position={{
                  lat: value.location_ypoint,
                  lng: value.location_xpoint
                }}>
                <div className="wrap">
                  <div className="info">
                    <div className="close"
                      onClick={() => {
                        setIsVisible(false)
                        chStoreID("")
                      }} title="닫기"></div>
                    <div>
                      <Table className='reservationTable'>
                        <thead className='reservationTableHeader'>
                          <tr>
                            <td>
                              {'\u00A0'}
                            </td>
                            <td>
                              {'\u00A0'}
                            </td>
                          </tr>
                        </thead>
                        <tbody className='reservationTableBody'>
                          <tr>
                            <td rowSpan={3}>
                              <div className='reservationResultImageDiv'>
                                <img className='reservationResultImgFile' src={userImage} alt="img"></img>
                              </div>
                            </td>
                            <td className='reservationTableStoreName'>{userName}</td>
                          </tr>
                          <tr>
                            <td>{userAddress}<br />{userPhone}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CustomOverlayMap>}
          </>
        ))}
      </Map>
      <Category></Category>
      <Container>
        <Row>
          <Col sm>

            <InputGroup style={{ marginTop: "10px" }}>
              <FormControl
                id="searchWord2"
                placeholder=""
              />
              <Button variant="outline-success" id="button-addon2" onClick={() => {
                setWord(document.getElementById("searchWord2").value)
              }}>
                검색
              </Button>
              <Button variant="outline-secondary" id="button-addon2" onClick={() => {
                setStoreId("")
              }}>
                점포 초기화
              </Button>
            </InputGroup >
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SampleMap;