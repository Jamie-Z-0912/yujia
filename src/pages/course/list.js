document.title = '课程';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import listStore from "../../store/course/list";
import {Icon} from 'antd-mobile';
import Item from '../../components/course/item';
import './list.less';

@observer
class Index extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataChange: false,
		};
	}
	
	render(){
		const {hasData, line} = listStore;
		return(
			hasData ? (
				<div className="course-list-wrap">
					{
						line.length? line.map(item => <Item data={item} key={item.id} />) :null
					}
				</div>
			):<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}

render(<Index />,document.getElementById('root'));
