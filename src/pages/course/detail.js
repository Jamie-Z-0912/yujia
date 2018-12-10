import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import detailStore from "../../store/course/detail";
import { Icon } from 'antd-mobile';
// import moment from 'moment';
import HeadCard from '../../components/course/item';
import DisItem from '../../components/course/disItem';
import MenuItem from '../../components/course/menuItem';
import './detail.less';

@observer
class Index extends PureComponent {
	
	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			cur: 0,
		};
	}
	
	changeTab(cur){
		this.setState({cur});
	}
	
	render() {
		const {
			hasData,
			detail,
			content,
			courseMenu,
			discussion,
		} = detailStore;
		const{ cur, dataChange} = this.state;
		return(
			hasData?(
				<div className="detail-wrap">
					<HeadCard data={detail} />
					<div className="page-tabs">
						<ul className="page-tab-nav">
							<li onClick={this.changeTab.bind(this,0)} className={cur===0?'active':''}>介绍</li>
							<li onClick={this.changeTab.bind(this,1)} className={cur===1?'active':''}>目录</li>
							<li onClick={this.changeTab.bind(this,2)} className={cur===2?'active':''}>互动</li>
						</ul>
						<div className="page-tab-content">
							{
								cur===0 ?
									<div className="detail-context">
										<p>{content.text}</p>
										<div className="img-box"><img src={content.img} alt=""/></div>
									</div>:null
							}
							{
								cur===1?
									<div>
										{courseMenu.length ? courseMenu.map(item => <MenuItem data={item} key={item.id} />):null}
									</div>:null
							}
							{
								cur===2?
									<div>
										{discussion.length ? discussion.map(item => <DisItem data={item} key={item.id} />):null}
									</div>:null
							}
						</div>
					</div>
					<div className="page-bottom">
						<ul>
							<li></li>
							<li></li>
							<li>
								<a href='./pay.html' className="pay_btn">付费订阅 ￥{detail.price}</a>
							</li>
						</ul>
					</div>
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));