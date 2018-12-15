import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { getQuery } from './libs/utils';

class Index extends PureComponent{
	constructor(props){
		super(props);
		window.localStorage.removeItem('XQN_channelId');
		if(getQuery('unit_id')){
			const localUnit = window.localStorage.getItem('XQN_BASE');
			if(localUnit && JSON.parse(localUnit).unit_id!== getQuery('unit_id')){
				window.localStorage.removeItem('ChannelArr');
				window.localStorage.removeItem('XQN_channelId');
				window.localStorage.removeItem('XQN_USERINFO');
			}
		}
		const base = {
			unit_id: getQuery('unit_id'),
			baseFile: location.pathname.split('/')[1],
		};
		window.localStorage.setItem('XQN_BASE', JSON.stringify(base));
		window.location = `/${base.baseFile}/news/index.html`;
	}
	render(){
		return( <div /> );
	}
}

render(<Index/>, document.getElementById('root'));