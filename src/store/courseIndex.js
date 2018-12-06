import { observable } from 'mobx';
// import myLike from '../static/img/my_favorite.png';
// import Request from '../service/baseAxios';
// import { Toast } from 'antd-mobile';
import newsIndex from "./newsIndex";

const data = observable({
	hasData: true,
	banner:[
		{id: 1, link: 'http://www.baidu.com', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png'},
		{id: 2, link: 'http://www.baidu.com', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png'},
		{id: 3, link: 'http://www.baidu.com', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png'},
	],
	tags:[
		{icon: '', name: '在线体验'}
	],
	experience:[
		{id: 1, link: 'http://www.baidu.com', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', original_price: 100, price: 2},
		{id: 2, buyStatus: 1, link: 'http://www.baidu.com', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', original_price: 100, price: 2},
		{id: 3, link: 'http://www.baidu.com', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', original_price: 100, price: 2},
	],
	line:[
		{id: 1, link: 'http://www.baidu.com', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
		{id: 2, link: 'http://www.baidu.com', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
		{id: 3, link: 'http://www.baidu.com', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
	]
});

export default data;