/*
* @Author: zhangyujie
* @Date:   2016-03-06 22:55:04
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-03-07 00:35:04
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasyDemo/component/Chart.js
* @File Name: Chart.js
* @Descript:
*/

import React from 'react'
import ReactDOM from 'react-dom'
const Tcharts = require('../src/chart/main')
const Util = require('../src/util')

class Chart extends React.Component {

	constructor() {
		super()
		this.state = {
			data: null
		}
	}
	componentWillMount() {

		const chartConfig = new Promise(function(resolve) {

			$.get('./public/data/chart/chart-config.json', function(data) {

				resolve(data)
			})
		})

		const barConfig = new Promise(function(resolve) {

			$.get('./public/data/chart/basicBar.json', function(data) {

				resolve(data)
			})
		})


		const elementConfig = new Promise(function(resolve) {

			$.get('./public/data/element-config.json', function(data) {

				resolve(data)
			})
		})

		Promise.all([chartConfig, barConfig, elementConfig]).then(function (result) {

			//合并所有图表配置，bar图表配置， 所有图易控件和图表公共配置
			var config = result[0], bar = result[1], element = result[2]
			var data = $.mix(config, bar)
			data = $.mix(data, element)

			this.setState({
				data: data
			})

		}.bind(this));


	}

	renderCanvas() {
		var target = ReactDOM.findDOMNode(this)

		var myChart = this.myChart

		if (!this.state.data ) {

			return false
		}

		if (!myChart ||  (myChart.getOption().colorId !== this.state.data.colorId)) {

			console.log(this.state.data)
			myChart = Tcharts.init(this.state.data.type, target)
		}

		var data = Util.clone(this.state.data)

	    myChart.setOption(data, true)

	    this.myChart = myChart
	}

	componentDidMount() {
		this.renderCanvas()
	}

	componentDidUpdate() {
		this.renderCanvas()
	}
	render() {


		return (
			<section ></section>
		)
	}
}

Chart.myChart = null
module.exports = Chart