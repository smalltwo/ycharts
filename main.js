/*
* @Author: zhangyujie
* @Date:   2016-03-28 15:07:08
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-03-28 17:17:51
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/ycharts/main.js
* @File Name: main.js
* @Descript:
*/


'use strict';
require('./main.css')

import React from 'react'
import { render } from 'react-dom'
import { Router, Link, hashHistory, IndexRoute} from 'react-router'
const Bar = require('./example/Bar/Bar')

class Nav extends React.Component {

	render() {

		return (
			<div>
				<Link to = 'bar' > bar </Link>
			</div>

		)
	}
}
class App extends React.Component {

	render() {

		return (
			<div>
				<Nav/>
				{this.props.children}
			</div>
		)
	}
}


const rootRoute = [{

	path: '/',
	component: App,
	indexRoute: {
		component: Bar
	},
	childRoutes: [{
		path: 'bar',
		component: Bar
	}]
}]

render(<Router history = {hashHistory} routes = {rootRoute} />, document.body.querySelector('.container'))






