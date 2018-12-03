import { observable } from 'mobx';
import temp from '../../static/img/03.png';

const data =  observable({
	discussion: [
		{
			id: 1,
			avatar: temp,
			nick: '魏无羡',
			time: 1536318827815,
			content:'天天开心,当我走进大公园的时候，我看见美丽的花。艾尔凯乐科技大时空裂缝好。',
			product:{
				color:'黑色',
				size: 'XL'
			}
		},
		{
			id: 2,
			avatar: temp,
			nick: '蓝忘机',
			time: 1536318827815,
			content:'天天开心,当我走进大公园的时候，我看见美丽的花。艾尔凯乐科技大时空裂缝好。',
			product:{
				color:'黑色',
				size: 'XL'
			}
		},
		{
			id: 2,
			avatar: temp,
			nick: '蓝思追',
			time: 1536318827815,
			content:'天天开心,当我走进大公园的时候，我看见美丽的花。艾尔凯乐科技大时空裂缝好。',
			product:{
				color:'黑色',
				size: 'XL'
			}
		},
	],
});

export default data;