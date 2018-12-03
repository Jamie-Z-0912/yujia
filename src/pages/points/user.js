import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import userStore from "../../store/points/pointsInfo";
import UserCard from '../../components/points/user';
import moment from 'moment';
import './user.less';

document.title = '积分商城';

@observer
class User extends PureComponent{
	render() {
		const {
			userInfo,
			level,
			next_level,
			list,
		} = userStore;
		return(
			<div className="user-page">
				<UserCard userInfo={userInfo} level={level} next_level={next_level} />
				<ul className="record-list">
					{
						list.map( item=>
							<li>
								<div className="desc">{item.title}</div>
								<div className="time">{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</div>
								<div className="num">{item.points}</div>
							</li>
						)
					}
				</ul>

			</div>
		)
	}

}
render(<User />,document.getElementById('root'));