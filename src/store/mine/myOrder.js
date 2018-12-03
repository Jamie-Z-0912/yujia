import { observable } from 'mobx';
import temp from '../../static/img/03.png';

const data = observable({
	orders:[
		{
			order_id: 1002,
			shop_name: '青柠课堂',
			freight: 10.00,
			status: 3,
			total: 4000,
			counter: 6,
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
			],
		},
		{
			order_id: 1003,
			shop_name: '青柠课堂',
			freight: 10.00,
			status: 2,
			total: 4000,
			counter: 2,
			list:[
				{
					id: 21,
					img: temp,
					name: '【青柠课堂】小清柠特别定制版双立人道具一套',
					price: 1290,
					link:'./detail.html',
					size: 's',
					color: '蓝色',
					counter: 2,
				},
			],
		},
		{
			order_id: 1023,
			shop_name: '青柠课堂',
			freight: 10.00,
			status: 1,
			total: 4000,
			counter: 2,
			list:[
				{
					id: 21,
					img: temp,
					name: '【青柠课堂】小清柠特别定制版双立人道具一套',
					price: 1290,
					link:'./detail.html',
					size: 's',
					color: '蓝色',
					counter: 2,
				},
			],
		},
		{
			order_id: 133,
			shop_name: '青柠课堂',
			freight: 10.00,
			status: 0,
			total: 4000,
			counter: 2,
			list:[
				{
					id: 21,
					img: temp,
					name: '【青柠课堂】小清柠特别定制版双立人道具一套',
					price: 1290,
					link:'./detail.html',
					size: 's',
					color: '蓝色',
					counter: 2,
				},
			],
		}
	],
});

export default data;