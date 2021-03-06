import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import { Icon } from 'antd-mobile';
import detailStore from "../../store/course/detail";
import HeadCard from '../../components/course/item';
import MenuItem from '../../components/course/menuItem';
import DisItem from '../../components/course/disItem';
import BuyBottom from '../../components/course/buyBottm';
import './detail.less';
import classroomStore from "../../store/course/classroom";

@observer
class Index extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			cur: 0,
		};
	}
	
	componentDidMount(){
		detailStore.getDetailInfo().then(()=> this.setState({dataChange: !this.state.dataChange}));
		detailStore.getClassList().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}
	
	// triggerClassNextList(){
	// 	detailStore.ClassNextPage();
	// 	detailStore.getClassList().then(()=> this.setState({dataChange: !this.state.dataChange}));
	// }
	//
	changeTab(cur){
		this.setState({cur});
	}
	
	render() {
		const {
			hasData,
			detail,
			courseMenu,
			discussion,
		} = detailStore;
		console.log(courseMenu);
		const{ cur, dataChange} = this.state;
		return(
			hasData?(
				<div className="detail-wrap">
					<HeadCard dataChange={dataChange} data={detail} />
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
										<p>{detail.introduce}</p>
									</div>:null
							}
							{
								cur===1?
									<div>
										{courseMenu.length ?
											courseMenu.map(item => <MenuItem dataChange={dataChange} detailId={detail.id} data={item} key={item.id} />)
											: <div className="empty"><p className="empty-info">暂无课程目录 ~</p></div>	}
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
					<BuyBottom id={detail.id} current_price={detail.current_price} />
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));