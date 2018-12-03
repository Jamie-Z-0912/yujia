import { observable } from 'mobx';

import temp from '../../static/img/03.png';

const data =  observable({
	product:{
		id: 11,
		images:[temp, temp, temp],
		title: '500M全国通用流量',
		points: 990,
		original_price: 450,
	}
});

export default data;
