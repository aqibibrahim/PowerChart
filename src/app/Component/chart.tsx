"use client"; // This is a client component

import React, { FC, useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { CustomSeriesRenderItem, EChartsOption } from "echarts";
import * as echarts from "echarts/core";
import { addMinutes, format } from "date-fns";
import { colorMap, timeoptions } from "./chart.const";
import { Data } from "./chart.interface";
import { fetchData } from "./chart.utils";

const CustomEChart: FC = () => {
  const [chartData, setChartData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then(async ({ data }) => {
        const chartData = data.map((item) => {
          const date = new Date(item.minute_window);
          const start = format(date.getTime(), "HH:mm");
          const end = format(addMinutes(date.getTime(), 5), "HH:mm");
          const dateString = format(date, "dd/LL/yyyy");

          return {
            name: item.sourceTag,
            date: dateString,
            start,
            end,
            value: [dateString, start, end, dateString],
            itemStyle: {
              normal: {
                color: colorMap[item.sourceTag],
              },
            },
          };
        });

        return setChartData(chartData);
      })
      .finally(() => setLoading(false));
  }, []);

  console.log(loading);

  const renderItem: CustomSeriesRenderItem = (params: any, api) => {
    var categoryIndex = api.ordinalRawValue(0);
    var [x1, y1] = api.coord([api.ordinalRawValue(1), categoryIndex]);
    var [x2, y2] = api.coord([api.ordinalRawValue(2), categoryIndex]);
    var [_, height] = (api.size?.([0, 1]) as number[]) ?? [0, 0];
    const heightFactor = 0.75;

    var rectShape = echarts.graphic.clipRectByRect(
      { x: x1, y: y1 - (height * heightFactor) / 2, width: x2 - x1, height: height * heightFactor },
      { x: params.coordSys.x, y: params.coordSys.y, width: params.coordSys.width, height: params.coordSys.height }
    );

    if (rectShape) return { type: "rect", transition: ["shape"], shape: rectShape, style: api.style() };

    return undefined;
  };

  const option: EChartsOption = {
    tooltip: {
      formatter: ({ marker, data: { name, start, end, date }, ...params }: any) =>
        `${marker} ${name} : ${start} - ${date}`,
    },

    title: { text: "Power Source Chart", left: "center" },
    xAxis: { scale: true, data: timeoptions, axisLabel: { formatter: (value: string) => value } },
    yAxis: { type: "category", data: [...new Set(chartData.map((item) => item.date))], splitLine: { show: true } },
    grid: { height: "500" },
    dataZoom: [
      { type: "slider", showDataShadow: false, bottom: 50, start: 0, end: 100 },
      { type: "inside", start: 0, end: 100 },
    ],
    series: [
      {
        type: "custom",
        renderItem: renderItem,
        itemStyle: { opacity: 0.8 },
        encode: { x: [1, 2], y: 0 },
        data: chartData,
      },
    ],
  };

  return <ReactECharts style={{ height: "90vh", width: "100vw" }} showLoading={loading} option={option} />;
};

export default CustomEChart;
