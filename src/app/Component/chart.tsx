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
const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday']

const PowerSourceChart: FC = () => {
	const [data, setData] = useState<any[]>([]) // Store received data from API

	useEffect(() => {
		// Fetch data from API
		axios
			.get('https://api.thunder.softoo.co/vis/api/dashboard/ssu/fixed')
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
		const dataChart = [
			[0, 0, 5],
			[0, 1, 1],
			[0, 2, 0],
			[0, 3, 0],
			[0, 4, 0],
			[0, 5, 0],
			[0, 6, 0],
			[0, 7, 0],
			[0, 8, 0],
			[0, 9, 0],
			[0, 10, 0],
			[0, 11, 2],
			[0, 12, 4],
			[0, 13, 1],
			[0, 14, 1],
			[0, 15, 3],
			[0, 16, 4],
			[0, 17, 6],
			[0, 18, 4],
			[0, 19, 4],
			[0, 20, 3],
			[0, 21, 3],
			[0, 22, 2],
			[0, 23, 5],
			[1, 0, 7],
			[1, 1, 0],
			[1, 2, 0],
			[1, 3, 0],
			[1, 4, 0],
			[1, 5, 0],
			[1, 6, 0],
			[1, 7, 0],
			[1, 8, 0],
			[1, 9, 0],
			[1, 10, 5],
			[1, 11, 2],
			[1, 12, 2],
			[1, 13, 6],
			[1, 14, 9],
			[1, 15, 11],
			[1, 16, 6],
			[1, 17, 7],
			[1, 18, 8],
			[1, 19, 12],
			[1, 20, 5],
			[1, 21, 5],
			[1, 22, 7],
			[1, 23, 2],
			[2, 0, 1],
			[2, 1, 1],
			[2, 2, 0],
			[2, 3, 0],
			[2, 4, 0],
			[2, 5, 0],
			[2, 6, 0],
			[2, 7, 0],
			[2, 8, 0],
			[2, 9, 0],
			[2, 10, 3],
			[2, 11, 2],
			[2, 12, 1],
			[2, 13, 9],
			[2, 14, 8],
			[2, 15, 10],
			[2, 16, 6],
			[2, 17, 5],
			[2, 18, 5],
			[2, 19, 5],
			[2, 20, 7],
			[2, 21, 4],
			[2, 22, 2],
			[2, 23, 4],
			[3, 0, 7],
			[3, 1, 3],
			[3, 2, 0],
			[3, 3, 0],
			[3, 4, 0],
			[3, 5, 0],
			[3, 6, 0],
			[3, 7, 0],
			[3, 8, 1],
			[3, 9, 0],
			[3, 10, 5],
			[3, 11, 4],
			[3, 12, 7],
			[3, 13, 14],
			[3, 14, 13],
			[3, 15, 12],
			[3, 16, 9],
			[3, 17, 5],
			[3, 18, 5],
			[3, 19, 10],
			[3, 20, 6],
			[3, 21, 4],
			[3, 22, 4],
			[3, 23, 1],
			[4, 0, 1],
			[4, 1, 3],
			[4, 2, 0],
			[4, 3, 0],
			[4, 4, 0],
			[4, 5, 1],
			[4, 6, 0],
			[4, 7, 0],
			[4, 8, 0],
			[4, 9, 2],
			[4, 10, 4],
			[4, 11, 4],
			[4, 12, 2],
			[4, 13, 4],
			[4, 14, 4],
			[4, 15, 14],
			[4, 16, 12],
			[4, 17, 1],
			[4, 18, 8],
			[4, 19, 5],
			[4, 20, 3],
			[4, 21, 7],
			[4, 22, 3],
			[4, 23, 0],
			[5, 0, 2],
			[5, 1, 1],
			[5, 2, 0],
			[5, 3, 3],
			[5, 4, 0],
			[5, 5, 0],
			[5, 6, 0],
			[5, 7, 0],
			[5, 8, 2],
			[5, 9, 0],
			[5, 10, 4],
			[5, 11, 1],
			[5, 12, 5],
			[5, 13, 10],
			[5, 14, 5],
			[5, 15, 7],
			[5, 16, 11],
			[5, 17, 6],
			[5, 18, 0],
			[5, 19, 5],
			[5, 20, 3],
			[5, 21, 4],
			[5, 22, 2],
			[5, 23, 0],
			[6, 0, 1],
			[6, 1, 0],
			[6, 2, 0],
			[6, 3, 0],
			[6, 4, 0],
			[6, 5, 0],
			[6, 6, 0],
			[6, 7, 0],
			[6, 8, 0],
			[6, 9, 0],
			[6, 10, 1],
			[6, 11, 0],
			[6, 12, 2],
			[6, 13, 1],
			[6, 14, 3],
			[6, 15, 4],
			[6, 16, 0],
			[6, 17, 0],
			[6, 18, 0],
			[6, 19, 0],
			[6, 20, 1],
			[6, 21, 2],
			[6, 22, 2],
			[6, 23, 6],
		].map((item) => [item[1], item[0], item[2] || '-'])

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
