import { observable } from 'mobx';
// import myLike from '../static/img/my_favorite.png';
// import Request from '../service/baseAxios';
// import { Toast } from 'antd-mobile';
const data = observable({
	hasData: true,
	name: '南京作美瑜伽教练课程',
	orderId: 'JO12HDOD09U0O1OU2O',
	original_price:'2500',
	coupon: '100',
	payPrice: '2400',
	couponList:[
		{id: 1, num: 100, text: '100元优惠券'},
		{id: 1, num: 100, text: '100元优惠券'},
		{id: 1, num: 100, text: '100元优惠券'},
	]
});

export default data;