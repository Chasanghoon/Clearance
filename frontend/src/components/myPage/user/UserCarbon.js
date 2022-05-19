import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../common/NavBar";
import { ResponsivePie } from "@nivo/pie";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import NavStore from '../../../store/NavStore';
import { id } from "date-fns/locale";
import { Row, Col } from "react-bootstrap";
import BackButton from "../../BackButton";

function UserCarbon() {

  const setNavHeader = NavStore(state => state.setNavHeader);
  setNavHeader("탄소발자국");

  const [data, setData] = useState([]);
  const [dataId, setDataId] = useState([
    "과일",
    "채소",
    "잡곡/견과",
    "정육/계란류",
    "수산물/건해산",
    "유제품/유아식",
    "냉장/냉동식",
    "밀키트/반찬",
    "생수/주류",
    "원두/차",
    "면류/즉석식품",
    "장류/양념/오일",
    "과자/빙과/떡",
    "베이커리/샐러드",
    "건강식품",
  ]);
  const [idxArr, setIdxArr] = useState([]);
  const [totalSaveCarbon, setTotalSaveCarbon] = useState(0);
  // axios 데이터 받아오기
  const URL = `https://k6e203.p.ssafy.io:8443/api/user/co?UserId=${localStorage.getItem("id")}`;
  useEffect(() => {
    axios
      .get(URL)
      .then((result) => {
        let temp = 0;
        const newData = [];
        const newIdxArr = [];
        for (let i = 0; i < 15; i++) {
          if (result.data[i] === 0) {
            continue;
          } else if (result.data[i] !== 0) {
            newData.push({
              id: dataId[i],
              label: dataId[i],
              value: result.data[i],
            });
            newIdxArr.push(i);
            temp += result.data[i];
          }
        }
        setData(newData);
        setIdxArr(newIdxArr);
        setTotalSaveCarbon(temp);
      })
      .catch((e) => {
        console.log("error");
      });
  }, []);

  return (
    <div className="userCarbon">
      <NavBar />
      <Chart data={data}></Chart>
      <Category idxArr={idxArr}></Category>
      <br />
      <div>
        <h1>Clearance를 사용하면서</h1>
        <h1>{(totalSaveCarbon / 6.6).toFixed(2)}그루 만큼의 나무를 심었습니다!</h1>
        <div className="imageDiv">
          <img className="imgFile" alt="" src="img/Carbon_Grass.png"></img>
        </div>
      </div>
      <BackButton></BackButton>
    </div>
  );
}

function Chart(props) {
  if (props.height !== 0) {
    return (
      // <div style={{ height: props.height }}>
      <div style={{ height: 400 }}>
        <ResponsivePie
          data={props.data}
          margin={{ top: 10, right: 40, bottom: 20, left: 40 }}
          startAngle={0}
          endAngle={360}
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={5}
          // sortByValue={true}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "set3" }}
          borderWidth={0}
          borderColor={{
            from: "color",
            modifiers: [["darker", "2"]],
          }}
          enableArcLabels={false} // data value 표시
          enableArcLinkLabels={false} // data id 표시
          arcLabelsSkipAngle={props.skipAngle} // data value skip angle
          arcLinkLabelsSkipAngle={5} // data id skip angle
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
        />
      </div>
    );
  } else if (props.height === 0) {
    return (
      <div>
        <h2>구매한 제품이 없습니다!!!</h2>
      </div>
    );
  }
}

function Category(props) {
  const [colorArr, setColorArr] = useState([
    "#8dd3c7",
    "#ffffb3",
    "#bebada",
    "#fb8072",
    "#80b1d3",
    "#fdb462",
    "#b3de69",
    "#fccde5",
    "#d9d9d9",
    "#bc80bd",
    "#ccebc5",
    "#ffed6f",
    //색 반복
    "#8dd3c7",
    "#ffffb3",
    "#bebada",
  ]);

  const [dataId, setDataId] = useState([
    "과일",
    "채소",
    "잡곡/견과",
    "정육/계란류",
    "수산물/건해산",
    "유제품/유아식",
    "냉장/냉동식",
    "밀키트/반찬",
    "생수/주류",
    "원두/차",
    "면류/즉석식품",
    "장류/양념/오일",
    "과자/빙과/떡",
    "베이커리/샐러드",
    "건강식품",
  ]);

  
  let content = [];
  for (let i = 0; i < props.idxArr.length; i++) {
    content.push(
        <span>
          <Brightness1Icon style={{ color: colorArr[props.idxArr[i]] }} />
            {dataId[props.idxArr[i]]}
            {(i > 0 && i % 3 ===0) ? <br />: " "}
        </span>
      
    );
  }
  console.log(content);
  // Chart category 표시 (material UI)
  return (
    <div>
      {content}
      
    </div>
  )
}

export default UserCarbon;
