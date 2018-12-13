import React, { PureComponent } from 'react';

export default class Index extends PureComponent {
	
	componentWillMount() {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'http://api.map.baidu.com/api?v=2.0&ak=E4805d16520de693a3fe707cdc962045';
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	componentDidMount () {
		try{
			console.log(window.BMap);
			const map = new window.BMap.Map("mapContainer"); // 创建Map实例
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
			map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
			map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
			map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
		}catch (e) {
			console.log(e);
		}
	}
	
	render() {
		return (
			<div>
				{
					window.BMap?<div className="mapContainer" id="mapContainer"></div>:<div style={{backgroundColor:'#000', color:'#fff',height:innerHeight,paddingTop:'.3rem'}}><h1>百度地图</h1></div>
				}
				
			</div>
		);
	}
}