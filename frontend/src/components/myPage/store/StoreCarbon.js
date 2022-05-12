import React from "react";
import axios from "axios";
import NavBar from "../../common/NavBar";
import { ResponsivePie } from "@nivo/pie";

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    startAngle={-90}
    endAngle={90}
    innerRadius={0.7}
    padAngle={1}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    colors={{ scheme: "set3" }}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", "0.5"]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

function Chart(props) {
  const data = [
    {
      id: "php",
      label: "php",
      value: 484,
      color: "hsl(31, 70%, 50%)",
    },
    {
      id: "ruby",
      label: "ruby",
      value: 486,
      color: "hsl(132, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 182,
      color: "hsl(143, 70%, 50%)",
    },
    {
      id: "rust",
      label: "rust",
      value: 340,
      color: "hsl(121, 70%, 50%)",
    },
    {
      id: "hack",
      label: "hack",
      value: 197,
      color: "hsl(233, 70%, 50%)",
    },
  ];
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      startAngle={-90}
      endAngle={90}
      innerRadius={0.7}
      padAngle={1}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "set3" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", "0.5"]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}

function StoreCarbon() {
  // axios 데이터 받아오기
  const URL = "http://localhost:8080/api/store/co?StoreId=seller1";
  axios
    .get(URL)
    .then((result) => {
      console.log(result.data);
    })
    .catch((e) => {
      console.log("error");
    });

  return (
    <div>
      <NavBar />
      <Chart></Chart>
    </div>
  );
}

export default StoreCarbon;
