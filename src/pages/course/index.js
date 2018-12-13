document.title = '课程';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import courseIndex from "../../store/courseIndex";
import {Icon} from 'antd-mobile';
import Banner from '../../components/Banner';
import Item from '../../components/course/item';
import ListCol3 from '../../components/course/listCol3';
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
					<div className="search-btn" onClick={()=>window.location='./search.html'}>
						<span>搜索文章、视频、图片</span>
					</div>
					{
						banner.length?<Banner data={banner} />:null
					}
					{
						tags.length?
							<ul className="tags_nav">
								{tags.map(item=> <li key={item.id}><img src={item.icon} alt=""/><div className="tag_name">{item.name}</div></li>)}
							</ul>:null
					}
					{
						experience.length?
							<div className="white_card">
								<div className="card_hd"><span>体验区</span> <a href={`./list.html?type=exp`} >更多 <Icon type="right" size="xs" className="right_arrow" />	</a></div>
								<div>
									<ListCol3 data={experience} />
								</div>
							</div>:null
					}
					{
						line.length?
							<div className="white_card">
								<div className="card_hd"><span>在线课程</span> <a href={`./list.html?type=line`} >更多 <Icon type="right" size="xs" className="right_arrow" />	</a></div>
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
