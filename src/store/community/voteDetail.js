import { observable } from 'mobx';

import temp from '../../static/img/03.png';

const TopDetail =  observable({
	detail:{
		id: 1,
		cover: temp,
		desc:'天天开心,当我走进大公园的时候，我看见美丽的花。艾尔凯乐科技大时空裂缝好。',
		title: '生活小机器',
		status: 0,
	},
	recommend: [
		{id:1,title: '短片小说：天天开心,当我走进大公园的时候。', author: '短片小说', link:'http://www.baidu.com', cover:temp, vip: true, date:'2018/07/02', view_num:32},
		{id:2,title: '短片小说：天天开心,当我走进大公园的时候。', author: '运营', link:'http://www.baidu.com', cover:temp, vip: false, date:'2018/07/02', view_num:32},
		{id:3,title: '短片小说：天天开心,当我走进大公园的时候。', author: '短片小说', link:'http://www.baidu.com', cover:temp, vip: false, date:'2018/07/02', view_num:32},
	],
});

export default TopDetail;