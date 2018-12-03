import { observable } from 'mobx';

const data =  observable({
	valid:[
		{id: 1, money: 100, norm: 2000, link: 'http://www.baidu.com', start_time: 1535731200000, end_time: 1538236800000},
		{id: 2, money: 50, norm: 1000, link: 'http://www.baidu.com', start_time: 1535731200000, end_time: 1538236800000},
	],
	used:[
		{id: 1, money: 100, norm: 2000, link: 'http://www.baidu.com', start_time: 1535731200000, end_time: 1538236800000},
		{id: 2, money: 50, norm: 1000, link: 'http://www.baidu.com', start_time: 1535731200000, end_time: 1538236800000},
	],
	overdue:[],
});

export default data;