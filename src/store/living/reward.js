import { observable } from 'mobx';

import temp from '../../static/img/07.png';

const data =  observable({
	list:[
		{id:101, img: temp, name: '幽兰', price: 1,},
		{id:102, img: temp, name: '幽兰', price: 2,},
		{id:103, img: temp, name: '幽兰', price: 5,},
		{id:104, img: temp, name: '幽兰', price: 10,},
		{id:105, img: temp, name: '幽兰', price: 18,},
		{id:106, img: temp, name: '幽兰', price: 28,},
		{id:107, img: temp, name: '幽兰', price: 58,},
		{id:108, img: temp, name: '幽兰', price: 88,},
	],
});

export default data;