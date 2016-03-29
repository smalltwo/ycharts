/*
 * @Author: zhangyujie
 * @Date:   2016-03-28 17:18:00
 * @Last Modified by:   FunctionRun
 * @Last Modified time: 2016-03-28 17:25:53
 * @Email: zhangyujie3344521@163.com
 * @File Path: /Users/zhangyujie/node/www/ycharts/example/Bar/option.js
 * @File Name: option.js
 * @Descript:
 */

'use strict';
module.exports = {
	title: {},
	subtitle: {},
	tooltip: {},
	legend: {},
	xAxis: [{
		name: '交通工具',
		data: ['汽车', '轮船', '飞机', '高铁', '动车']
	}],
	yAxis: [{

	}],
	grid: {
		x: 10,
		y: 20,
		x2: 10,
		y2: 20
	},
	label: {},
	series: [{
		name: '北京人出行方式(人)',
		data: [200, 30, 50, 100, 150]
	}]
}