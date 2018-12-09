import { observable } from 'mobx';
// import myLike from '../static/img/my_favorite.png';
// import Request from '../service/baseAxios';
// import { Toast } from 'antd-mobile';
const data = observable({
	hasData: true,
	line:[
		{id: 1, link: './detail.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
		{id: 2, link: './detail.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
		{id: 3, link: './detail.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
		{id: 4, link: './detail.html', img: 'http://static.etouch.cn/imgs/upload/1544105125.1216.png', name: '理疗瑜伽教练培训', desc:'瑜伽培训相关的课程、学费、老师及学习资讯',order: 3333, original_price: 900, price: 800},
	]
});

export default data;