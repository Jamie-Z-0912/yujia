document.title = '商城';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import discussionStore from '../../store/mall/discussion';
import DiscussItem from '../../components/mall/discussItem';
import './discussion.less';

class Discussion extends PureComponent{

	render(){
		const {discussion} = discussionStore;
		return(
			<div className="discuss-wrap">
				<div className="discuss-hd">
					<span>用户评价</span>
				</div>
				<div className="discuss-bd">
					{
						discussion.map(item=><DiscussItem key={item.id} data={item} />)
					}
				</div>
			</div>
		)
	}
}

render(<Discussion />,document.getElementById('root'));
