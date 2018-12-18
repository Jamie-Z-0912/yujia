import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import classroomStore from "../../store/course/classroom";
import { Icon } from 'antd-mobile';
import HeadCard from '../../components/course/item';
import DisItem from '../../components/course/disItem';
import BuyBottom from '../../components/course/buyBottm';
import './classroom.less';

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
		classroomStore.getDetailInfo().then(()=> this.setState({dataChange: !this.state.dataChange}));
		classroomStore.getClassroom().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}
	
	// triggerClassNextList(){
	// 	classroomStore.ClassNextPage();
	// 	classroomStore.getClassList().then(()=> this.setState({dataChange: !this.state.dataChange}));
	// }
	//
	changeTab(cur){
		this.setState({cur});
	}
	
	render() {
		const {
			hasData,
			detail,
			room,
			discussion,
		} = classroomStore;
		const{ cur, dataChange} = this.state;
		return(
			hasData?(
				<div className="detail-wrap">
					<HeadCard dataChange={dataChange} data={detail} />
					<div className="page-tabs">
						<ul className="page-tab-nav">
							<li onClick={this.changeTab.bind(this,0)} className={cur===0?'active':''}>介绍</li>
							<li onClick={this.changeTab.bind(this,2)} className={cur===2?'active':''}>互动</li>
						</ul>
						<div className="page-tab-content">
							{
								cur===0 ?
									<div className="video-box">
										{room.source_url ?<iframe className="videoFrame" src={room.source_url} />:<p>暂无课程视频</p>}
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