import {observable} from 'mobx';

const data=observable({
	list:[
		{
			id: 1,
			name: '大名',
			mobile: '151****1222',
			address: '江苏省南京市雨花台区雨花客厅2栋503室小清柠的会议室',
			isDefault: true,
		},
		{
			id: 11,
			name: '大名',
			mobile: '151****1222',
			address: '江苏省南京市雨花台区雨花客厅2栋503室小清柠的会议室',
			isDefault: false,
		},
		{
			id: 21,
			name: '大名',
			mobile: '151****1222',
			address: '江苏省南京市雨花台区雨花客厅2栋503室小清柠的会议室',
			isDefault: false,
		},
		{
			id: 13,
			name: '大名',
			mobile: '151****1222',
			address: '江苏省南京市雨花台区雨花客厅2栋503室小清柠的会议室',
			isDefault: false,
		},
	],

});

export default data;
