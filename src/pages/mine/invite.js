document.title = '分享有礼';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import inviteStore from '../../store/mine/invite';
import './invite.less';

@observer
class Invite extends PureComponent{
	render() {
		const {invite_img} = inviteStore;
		return(
			<div className="invite_wrap" style={{minHeight:innerHeight}}>
				<div className="invite_con">
					<a href="./inviteRecord.html" className="invite_link">邀请记录 &gt;</a>
					<img src={invite_img} alt=""/>
					<div className="ps">本/活/动/最/终/解/释/权/归/本/店/所/有</div>
				</div>
			</div>
		)
	}
}

render(<Invite />,document.getElementById('root'));