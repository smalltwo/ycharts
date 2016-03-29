/*
 * @Author: zhangyujie
 * @Date:   2016-03-06 22:35:38
 * @Last Modified by:   FunctionRun
 * @Last Modified time: 2016-03-07 00:34:02
 * @Email: zhangyujie3344521@163.com
 * @File Path: /Users/zhangyujie/node/www/tueasyDemo/component/Ddmenu.js
 * @File Name: Ddmenu.js
 * @Descript:
 */

import React from 'react'
import ReactDOM from 'react-dom'

require('../public/css/Ddmenu.css')
class Ddmenu extends React.Component {
	constructor() {
		super()
		this.state = {
			data: null,
			//ul的高度
			dropDownCurrent: {},
			mouseIndex: -1,
			currentIClassName: 'fa-chevron-down'
		}
	}
	componentWillMount() {


		const DdmenuConfig = new Promise(function(resolve) {

			$.get('./public/data/control/Ddmenu.tueasy', function(data) {

				resolve(data)
			})
		})


		const elementConfig = new Promise(function(resolve) {

			$.get('./public/data/element-config.json', function(data) {

				resolve(data)
			})
		})

		Promise.all([DdmenuConfig, elementConfig]).then(function(result) {

			var ddmenuConfig = result[0],
				elementConfig = result[1]
			var data = $.mix(ddmenuConfig, elementConfig)

			this.setState({
				data: data
			})

		}.bind(this));


	}
	componentDidMount() {
		this.setStyle()
	}
	componentDidUpdate() {
		this.setStyle()
	}

	mouseover(index, event) {
		this.setState({
			mouseIndex: index
		})
	}

	mouseout() {
		this.setState({
			mouseIndex: -1
		})
	}

	selectOption(item, index) {
		var stateData = this.state.data
		var oldState = $.mix({}, stateData)
		oldState.currentName = item.name
		oldState.currentSelect = index
		var filterData = {}
		filterData[item.key] = [item.name]

		oldState.returnValue = item
		if (stateData.trigger.show) {

			eval(stateData.trigger.triggerFn)
		}
		this.setState({
			data: oldState,
			currentIClassName: 'fa-chevron-down'

		})

	}
	renderSelect() {

		var state = this.state,
			data = state.data,
			style = null
		return data.series.map(function(item, i) {
			style = null
			if (i == data.currentSelect) {
				style = data.dropDown.emphasis
			} else if (i == state.mouseIndex) {

				style = data.dropDown.mouse
			} else {

				style = data.dropDown.normal
			}

			style = $.mix(style, data.dropDownOption)
			style.height = (1 / data.series.length) * 100 + '%'

			return ( < li onClick = { this.selectOption.bind(this, item, i) }
			key = { 'Ddmenu' + i } style = { style }
			onMouseOver = { this.mouseover.bind(this, i) }
			onMouseOut = { this.mouseout.bind(this) } > { item.name }
			< /li>)
		}.bind(this))
	}
	resize() {
		this.forceUpdate()
	}
	getStyle() {
			var data = this.state.data
			var inputHeight = parseFloat(data.conStyle.height)
			var dropDownCurrent = {}
				//ul的高度
			dropDownCurrent.height = 'calc(100% - ' + data.conStyle.height + ')'
				//li的高度
			return {
				dropDownCurrent: dropDownCurrent
			}
		}
		//将columns中的数据转成series中的数据
	getSeries(newData) {
		var columnsData = newData.columns.col.data
		var key, series = [],
			i, ele
		for (key in columnsData) {
			ele = columnsData[key]

			for (i = 0; i < ele.length; i++) {
				series.push({
					key: key,
					name: col
				})
			}
		}
		if (series.length > 0) {
			newData.series = series
			newData.currentSelect = 0
			newData.currentName = series[0].name
		}

		return newData
	}
	setStyle() {
		if (!ReactDOM.findDOMNode(this)) {

			return false
		}
		var currentIClassName = this.state.currentIClassName
		var $listCon = $(ReactDOM.findDOMNode(this).querySelector('.listCon'))
		if (currentIClassName == 'fa-chevron-down') {

			$listCon.css('display', 'none')
		} else {

			$listCon.css('display', 'block')
		}

		var state = this.state,
			length = state.data.series.length
		var ulWrapHeight = $(this.refs.scrollBar).height()
		var liHeight = Math.max(ulWrapHeight / length, parseFloat(state.data.dropDownOption.minHeight))
		var ulHeight = liHeight * length

		$listCon.find('ul').css('height', ulHeight + 'px')
		$listCon.find('li').css('line-height', liHeight + 'px')

	}
	clickClose() {

		var selector = ReactDOM.findDOMNode(this),
			_self = this

		document.addEventListener('click', function(e) {

			var target = e.target


			if (!selector.contains(target)) {

				var currentIClassName = _self.state.currentIClassName
				if (currentIClassName == 'fa-chevron-up') {
					currentIClassName = 'fa-chevron-down'
				}
				_self.setState({
					currentIClassName: currentIClassName
				})
			}

		}, false)
	}
	showList() {
		var currentIClassName = this.state.currentIClassName
		if (currentIClassName == 'fa-chevron-down') {
			currentIClassName = 'fa-chevron-up'
		} else {
			currentIClassName = 'fa-chevron-down'
		}
		this.setState({
			currentIClassName: currentIClassName
		})
	}
	dropButtonMouseover(event) {
		var target = event.target
		$(target).css('color', this.state.data.dropDown.mouse.backgroundColor)
	}
	dropButtonMouseout(event) {
		var target = event.target
		$(target).css('color', this.state.data.textStyle.color)
	}
	render() {
		if (!this.state.data) {

			return false
		}
		var lists, state = this.state,
			stateData = state.data,
			dropDownButton = null
		dropDownButton = stateData.dropDownButton
		dropDownButton.marginTop = -parseFloat(dropDownButton.fontSize) / 2
		return (
				<section >
						<div ref ='con' style = {stateData.textStyle}>

						    <div className='con' style={stateData.conStyle}>
						        <input type="text" value = {stateData.currentName} style = {stateData.inputStyle} readOnly/>
						        <div className = 'pointer' >
						    		<i className = {'fa ' + state.currentIClassName} style = {stateData.dropDownButton}
						    			onClick={this.showList.bind(this)}  onMouseOver = {this.dropButtonMouseover.bind(this)}  onMouseOut = {this.dropButtonMouseout.bind(this)} ></i>
						    	</div>
						    </div>
						    <div  className='listCon' style = {state.dropDownCurrent}>
						        <div   ref='scrollBar'className='mselect'>
						            <ul >
						             	{this.renderSelect()}
						            </ul>
						        </div>
						    </div>

						</div>
					</section>
				)
	}
}



module.exports = Ddmenu