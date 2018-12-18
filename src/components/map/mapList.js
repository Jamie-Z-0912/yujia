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
			const liteMap = new BMap.Map('mapContainer');
			const point = new BMap.Point(116.404, 39.915);
			liteMap.centerAndZoom(point, 11);
			
			// 初始化地图， 设置中心点坐标和地图级别
			// const marker = new BMap.Marker(point);
			// liteMap.addOverlay(marker);


			// 获取地图区域的边界
			const bounds = liteMap.getBounds();
			// 获取西南角的经纬度信息
			const sw = bounds.getSouthWest();
			// 获取东北角的经纬度信息 东边的经度>西边的经度 北边的纬度>南边的纬度
			const ne = bounds.getNorthEast();

			// lng为longitute 经度 lat为latitute纬度
			const lngSpan = ne.lng - sw.lng;
			const latSpan = ne.lat - sw.lat;
			const arrFeatures = [];
			for (let i = 0; i < 10; i ++) {
				// 初始化位置
				const mpt = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7 + 0.15),
					sw.lat + latSpan * (Math.random() * 0.7 + 0.15));
				// 变换icon
				const iconOffsetX = 42;
				const iconOffsetY = 66;
				
				const massFeature = new BMap.MassFeature(mpt, {data: 'MassFeature' + i});
				arrFeatures.push(massFeature);
			}
			
			setTimeout(()=>{
				liteMap.addMassFeatures(arrFeatures);
			},10)
			
		}catch (e) {
			console.log(e);
		}
	}
	
	render() {
		return (<div id="mapContainer" style={{width:'100%', height: innerHeight}} />);
	}
}