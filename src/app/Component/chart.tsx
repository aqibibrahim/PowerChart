'use client' // This is a client component

import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import * as echarts from 'echarts'
import 'echarts/theme/macarons'

// Define color map based on sourceTag values
const colorMap: Record<string, string> = {
	Main: '#B798F5',
	Solar: '#02E10C',
	DG: '#403F3D',
	Battery: '#FDE602',
	'Solar+Battery': '#86B0FF',
	'Battery+Solar': '#86B0FF',
	'Main+Solar': '#7243D0',
	'Main+Battery': '#32864B',
	'Main+Solar+Battery': '#8BC486',
	'DG+Battery': 'magentam',
	'DG+Solar+Battery': 'cyan',
	'DG+Battery+Solar': 'cyan',
	Undetermined: '#BBE3FD',
	'': 'white',
}

const PowerSourceChart: FC = () => {
	const [data, setData] = useState<any[]>([]) // Store received data from API

	useEffect(() => {
		// Fetch data from API
		axios
			.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}`)
			.then((response) => setData(response.data.data)) // Assuming the response is an array of data points
			.catch((error) => console.error('Error fetching data:', error))
	}, [])

	useEffect(() => {
		const chartDom = document.getElementById('chart') as HTMLDivElement
		const myChart = echarts.init(chartDom, 'macarons')

		// Process data for chart rendering

		const processedData = data.map((item) => {
			const timestamp = new Date(item.minute_window).getTime()
			const yValue = new Date(item.date).toLocaleDateString()

			return [timestamp, yValue, item.sourceTag]
		})

		// Sort data by timestamp
		processedData.sort((a, b) => a[0] - b[0])
		const option = {
			tooltip: {
				position: 'top',
				formatter: ({ value: [date, time, source] }: any) =>
					`Power Source: ${Object.keys(colorMap)[source]} ${time} ${date}`,
			},
			grid: {
				left: 60,
				right: 20,
				top: 20,
				bottom: 40,
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				data: [...new Set(processedData.map((item) => new Date(item[0]).toISOString().substr(11, 5)))],
				splitLine: {
					show: true,
				},
			},
			yAxis: {
				type: 'category',
				data: [...new Set(processedData.map((item) => item[1]))],
				splitLine: {
					show: true,
				},
			},
			visualMap: {
				min: 0,
				max: Object.keys(colorMap).length - 1,
				calculable: true,
				orient: 'horizontal',
				left: 'center',
				bottom: 10,
				inRange: {
					color: Object.values(colorMap),
				},
				textStyle: {
					color: '#000',
				},
			},
			series: [
				{
					name: 'Punch Card',
					type: 'heatmap',
					symbolSize: 15,
					// data: dataChart,
					data: processedData.map((item) => [
						new Date(item[0]).toISOString().substr(11, 5),
						item[1],
						Object.keys(colorMap).indexOf(item[2]),
					]),
				},
			],
		}

		myChart.setOption(option)
	}, [data])

	return <div id="chart" style={{ width: '100%', height: '600px' }} />
}

export default PowerSourceChart
