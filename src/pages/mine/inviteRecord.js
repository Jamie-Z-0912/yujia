document.title = '邀请记录';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import recordStore from '../../store/mine/inviteRecord';
import UserItem from '../../components/UserItem';
import './inviteRecord.less';

@observer
class InviteRecord extends PureComponent{

	render() {
		const {data} = recordStore;
		return(
			<div style={{backgroundColor: '#fff'}}>
				{
					data.map(item=><UserItem data={item} />)
				}
			</div>
		)
	}
}

render(<InviteRecord />,document.getElementById('root'));