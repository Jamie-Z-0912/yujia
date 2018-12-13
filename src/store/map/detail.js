import { observable } from 'mobx';
// import myLike from '../static/img/my_favorite.png';
// import Request from '../service/baseAxios';
// import { Toast } from 'antd-mobile';
const temp = 'http://static.etouch.cn/imgs/upload/1544105125.1216.png';
const data = observable({
	hasData: true,
	recommend: [
		{id:1,title: '理疗瑜伽教练培训', link:'#', img:temp, price:2000, day:9, calorie:898, num:1990 },
		{id:2,title: '理疗瑜伽教练培训', link:'#', img:temp, price:2000, day:9, calorie:898, num:1990 },
		{id:3,title: '理疗瑜伽教练培训', link:'#', img:temp, price:2000, day:9, calorie:898, num:1990 },
		{id:4,title: '理疗瑜伽教练培训', link:'#', img:temp, price:2000, day:9, calorie:898, num:1990 },
	],
	discussion:[
		{id:1, head_url: temp, user_name: 'PUI', time: 1543852800148, up_num: 33, text: '太棒了！支持！', is_up: true},
		{
			id:2,
			head_url: temp,
			user_name: 'PUI',
			time: 1543852800148,
			up_num: 33,
			text: '太棒了！支持！',
			is_up: false,
		},
	],
});

export default data;