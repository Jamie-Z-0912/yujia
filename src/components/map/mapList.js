import React, { PureComponent } from 'react';

export default class Index extends PureComponent {
	
	componentWillMount() {
		const script = document.createElement("script");
		// api.map.baidu.com/api?ak=您的密钥&type=lite&v=1.0
		script.src = "http://api.map.baidu.com/api?ak=U2nn8rc65wOFVp2raGeKLHoCRkLbBLEn&type=lite&v=1.0";
		script.onload = this.loadBaiDuMap.bind(this);
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	loadBaiDuMap () {
		try{
			console.log(window.BMap);
			const map = new BMap.Map('mapContainer');
			// 创建地图实例
			const point = new BMap.Point(116.404, 39.915);
			// 创建点坐标
			map.centerAndZoom(point, 11);
			// 初始化地图， 设置中心点坐标和地图级别
			const marker = new BMap.Marker(point);
			map.addOverlay(marker);
		}catch (e) {
			console.log(e);
		}
	}
	
	render() {
		return (<div id="mapContainer" style={{width:'100%', height: innerHeight}} />);
	}
}