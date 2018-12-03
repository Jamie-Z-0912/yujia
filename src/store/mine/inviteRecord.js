import { observable } from 'mobx';

import temp from '../../static/img/03.png';


const record =  observable({
	data:[
		{avatar: temp, name:'蓝忘机', time: 1536847969988},
		{avatar: temp, name:'魏无羡', time: 1536847969988},
		{avatar: temp, name:'江澄', time: 1536847969988},
		{avatar: temp, name:'金陵', time: 1536847969988},
	]
});

export default record;