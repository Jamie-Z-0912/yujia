document.title = '课程';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import courseIndex from "../../store/courseIndex";
import {Icon} from 'antd-mobile';
import Banner from '../../components/Banner';
import Item from '../../components/course/item';
import SmallItem from '../../components/course/smallItem';
import './index.less';

@observer
class Index extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataChange: false,
		};
	}
	
	render(){
		const {hasData, banner, tags, experience, line} = courseIndex;
		
		return(
			hasData ? (
				<div className="course-wrap" >
					<div className="search-box">
					
					</div>
					{
						banner.length?<Banner data={banner} />:null
					}
					{
						experience.length?
							<div className="white_card hot_topic">
								<div className="card_hd"><span>体验区</span> <a href={`#`} >查看全部 <Icon type="right" size="xs" className="right_arrow" />	</a></div>
								<ul>
									{
										experience.map(item => <SmallItem data={item} key={item.id} />)
									}
								</ul>
							</div>:null
					}
					{
						line.length?
							<div className="white_card hot_topic">
								<div className="card_hd"><span>在线课程</span> <a href={`#`} >查看全部 <Icon type="right" size="xs" className="right_arrow" />	</a></div>
								<div>
									{
										line.map(item => <Item data={item} key={item.id} />)
									}
								</div>
							</div>:null
					}
				</div>
			):<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}

render(<Index />,document.getElementById('root'));
