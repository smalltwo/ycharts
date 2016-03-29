/*
* @Author: zhangyujie
* @Date:   2016-03-28 15:25:21
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-03-28 17:26:12
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/ycharts/example/Bar/Bar.js
* @File Name: Bar.js
* @Descript:
*/

'use strict';
import React from 'react'
import Chart from '../../ycharts/main'

const option = require('./option')
class Bar extends React.Component {

	render() {

		return (
			<div>
				<Chart data = {option} />
			</div>
		)
	}
}


module.exports = Bar