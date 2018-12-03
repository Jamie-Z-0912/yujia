import { observable } from 'mobx';

import temp from '../../static/img/03.png';
import photo from '../../static/img/02.png';

const data =  observable({
	banner: [
		{id:1, link:'/points/detail.html', cover:temp},
		{id:2, link:'/points/detail.html', cover:temp},
		{id:3, link:'/points/detail.html', cover:temp},
	],
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
	list: [
		{id:1, cover: temp, title: '小清柠特别定制版双立人道具一套', points: 90, link:'/points/detail.html'},
		{id:2, cover: temp, title: '戴森吹风机 进口家用 HD01 紫红色', points: 30, link:'/points/detail.html'},
		{id:3, cover: temp, title: 'Bose Companion5多媒体扬声器系统', points: 20, link:'/points/detail.html'},
		{id:4, cover: temp, title: '小清柠特别定制版双立人道具一套', points: 20, link:'/points/detail.html'},
		{id:5, cover: temp, title: '戴森吹风机 进口家用 HD01 紫红色', points: 40, link:'/points/detail.html'},
		{id:6, cover: temp, title: 'Bose Companion5多媒体扬声器系统', points: 80, link:'/points/detail.html'},
	],
});

export default data;
