import { observable } from 'mobx';

import temp from '../../static/img/03.png';

const data =  observable({
	address:{
		name: '大名',
		mobile: '151****1222',
		address: '江苏省南京市雨花台区雨花客厅2栋503室小清柠的会议室',
		isDefault: true,
	},
	list:[
		{
			id: 11,
			img: temp,
			name: '【青柠课堂】小清柠特别定制版双立人道具一套',
			price: 1290,
			link:'./detail.html',
			size: 's',
			color: '蓝色',
			counter: 3,
		},
		{
			id: 21,
			img: temp,
			name: '【青柠课堂】小清柠特别定制版双立人道具一套',
			price: 1290,
			link:'./detail.html',
			size: 's',
			color: '蓝色',
			counter: 3,
		},
	]
});

export default data;