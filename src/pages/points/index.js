import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import pointsStore from "../../store/points/index";
import Banner from '../../components/points/banner';
import UserCard from '../../components/points/user';
import Item from '../../components/points/item'
import './index.less';

document.title = '积分商城';

@observer
class Points extends PureComponent{
	render() {
		const {
			banner,
			userInfo,
			level,
			list
		} = pointsStore;
		return(
			<div className="points-wrap">
				<Banner data={banner} />
				<div className="points-content">
					<UserCard userInfo={userInfo} level={level} hasLink />
					<div className="product_list">
						{
							list.map(item=><Item key={item.id} data={item} />)
						}
					</div>
				</div>
			</div>
		)
	}

}
render(<Points />,document.getElementById('root'));