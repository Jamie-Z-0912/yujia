import { observable } from 'mobx';
import temp from '../../static/img/03.png';

const data =  observable({
	goods:{
		id: 11,
		img: temp,
		name: '【青柠课堂】小清柠特别定制版双立人道具一套',
		price: 1290,
		link:'./detail.html',
		size: 's',
		color: '蓝色',
	},
	// progress: null,
	progress: [
		{time: 1536847969988, step: 1, text: '申请提交'},
		// {time: 1536847969988, step: 2, text: '平台审核：同意换货'},
	],
	intro: '本平台支持七天无理由退换（部分指定商品除外），您需要提交退换申请，平台通过后寄出物品并填写物流信息。',
});


export default data;