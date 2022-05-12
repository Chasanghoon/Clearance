import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../common/NavBar";
import { ResponsivePie } from "@nivo/pie";
import Brightness1Icon from "@mui/icons-material/Brightness1";

function Chart(props) {
  return (
    <div style={{ height: 400 }}>
      <ResponsivePie
        data={props.data}
        margin={{ top: 10, right: 40, bottom: 20, left: 40 }}
        startAngle={0}
        endAngle={360}
        innerRadius={0.55}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "set3" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", "0.5"]],
        }}
        enableArcLabels={true} // data value 표시
        enableArcLinkLabels={false} // data id 표시
        arcLabelsSkipAngle={1.1} // data value skip angle
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
}

function Category() {
  // Chart category 표시 (material UI)
  return (
    <div>
      <div>
        <Brightness1Icon
          style={{ color: "rgb(118, 177, 166)" }}
        ></Brightness1Icon>
        <span>과일 </span>
        <Brightness1Icon
          style={{ color: "rgb(213, 213, 150)" }}
        ></Brightness1Icon>
        <span>채소 </span>
        <Brightness1Icon
          style={{ color: "rgb(159, 156, 182)" }}
        ></Brightness1Icon>
        <span>잡곡/견과 </span>
        <Brightness1Icon
          style={{ color: "rgb(210, 107, 95)" }}
        ></Brightness1Icon>
        <span>정육/계란류 </span>
      </div>
      <div>
        <Brightness1Icon
          style={{ color: "rgb(107, 148, 177)" }}
        ></Brightness1Icon>
        <span>수산물/건해산 </span>
        <Brightness1Icon
          style={{ color: "rgb(212, 151, 82)" }}
        ></Brightness1Icon>
        <span>유제품/유아식 </span>
        <Brightness1Icon
          style={{ color: "rgb(150, 186, 88)" }}
        ></Brightness1Icon>
        <span>냉장/냉동식 </span>
        <Brightness1Icon
          style={{ color: "rgb(211, 172, 192)" }}
        ></Brightness1Icon>
        <span>반찬 </span>
      </div>
      <div>
        <Brightness1Icon
          style={{ color: "rgb(182, 182, 182)" }}
        ></Brightness1Icon>
        <span>생수/주류 </span>
        <Brightness1Icon
          style={{ color: "rgb(157, 107, 158)" }}
        ></Brightness1Icon>
        <span>원두/차 </span>
        <Brightness1Icon
          style={{ color: "rgb(171, 197, 165)" }}
        ></Brightness1Icon>
        <span>냉장/냉동식 </span>
        <Brightness1Icon
          style={{ color: "rgb(213, 198, 93)" }}
        ></Brightness1Icon>
        <span>장류/양념/오일 </span>
      </div>
      <div>
        <Brightness1Icon
          style={{ color: "rgb(118, 177, 166)" }}
        ></Brightness1Icon>
        <span>과자/빙과/떡 </span>
        <Brightness1Icon
          style={{ color: "rgb(213, 213, 150)" }}
        ></Brightness1Icon>
        <span>베이커리/샐러드 </span>
        <Brightness1Icon
          style={{ color: "rgb(159, 156, 182)" }}
        ></Brightness1Icon>
        <span>건강식품 </span>
      </div>
      <p></p>
    </div>
  );
}

function UserCarbon() {
  const [data, setData] = useState([
    {
      id: "과일",
      label: "과일",
      value: 0,
      color: "hsl(31, 70%, 50%)",
    },
    {
      id: "채소",
      label: "채소",
      value: 0,
      color: "hsl(132, 70%, 50%)",
    },
    {
      id: "잡곡/견과",
      label: "잡곡/견과",
      value: 0,
      color: "hsl(143, 70%, 50%)",
    },
    {
      id: "정육/계란류",
      label: "정육/계란류",
      value: 0,
      color: "hsl(121, 70%, 50%)",
    },
    {
      id: "수산물/건해산",
      label: "수산물/건해산",
      value: 0,
      color: "hsl(233, 70%, 50%)",
    },
    {
      id: "유제품/유아식",
      label: "유제품/유아식",
      value: 0,
      color: "hsl(55, 70%, 50%)",
    },
    {
      id: "냉장/냉동식",
      label: "냉장/냉동식",
      value: 0,
      color: "hsl(150, 70%, 50%)",
    },
    {
      id: "밀키트/반찬",
      label: "밀키트/반찬",
      value: 0,
      color: "hsl(211, 70%, 50%)",
    },
    {
      id: "생수/주류",
      label: "생수/주류",
      value: 0,
      color: "hsl(88, 70%, 50%)",
    },
    {
      id: "원두/차",
      label: "원두/차",
      value: 0,
      color: "hsl(187, 70%, 50%)",
    },
    {
      id: "면류/즉석식품",
      label: "면류/즉석식품",
      value: 0,
      color: "hsl(99, 70%, 50%)",
    },
    {
      id: "장류/양념/오일",
      label: "장류/양념/오일",
      value: 0,
      color: "hsl(61, 70%, 50%)",
    },
    {
      id: "과자/빙과/떡",
      label: "과자/빙과/떡",
      value: 0,
      color: "hsl(10, 70%, 50%)",
    },
    {
      id: "베이커리/샐러드",
      label: "베이커리/샐러드",
      value: 0,
      color: "hsl(150, 70%, 50%)",
    },
    {
      id: "건강식품",
      label: "건강식품",
      value: 0,
      color: "hsl(222, 70%, 50%)",
    },
  ]);

  const [totalSaveCarbon, setTotalSaveCarbon] = useState(0);
  // axios 데이터 받아오기
  const URL = "http://localhost:8080/api/user/co?UserId=Urkdrhkddms";
  useEffect(() => {
    axios
      .get(URL)
      .then((result) => {
        console.log(result.data);

        let temp = 0;
        const newData = [...data];
        for (let i = 0; i < 15; i++) {
          newData[i].value = result.data[i];
          temp += result.data[i];
        }
        console.log(temp);
        setData(newData);
        setTotalSaveCarbon(temp);
      })
      .catch((e) => {
        console.log("error");
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h1>탄소발자국</h1>
      <h1>May 2022</h1>
      <Chart data={data}></Chart>
      <Category></Category>
      <h1>Total Save Carbon : {totalSaveCarbon}</h1>
    </div>
  );
}

export default UserCarbon;
