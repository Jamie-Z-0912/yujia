import { observable } from 'mobx';

import photo from '../../static/img/02.png';

const data =  observable({
	userInfo: {
		name: 'Less is More',
		points: 267,
		photo,
	},
	level:{
		num: 1,
		points: 200,
		text: '白银会员'
	},
	next_level:{
		num: 2,
		points: 300,
		text: '白银会员'
	},
	list: [
		{id:13, title: '积分商城', points: '-20', time: 1535730705000},
		{id:12, title: '成功支付订单', points: '+2', time: 1535520705000},
		{id:12, title: '成功支付订单', points: '+2', time: 1533650705000},
		{id:1, title: '小清柠特别定制版双立人道具一套', points: '-90', time: 1532650705000},
	]
});

export default data;
