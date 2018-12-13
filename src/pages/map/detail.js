import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import detailStore from "../../store/map/detail";
import { Icon } from 'antd-mobile';
// import moment from 'moment';
import DetailHd from '../../components/map/detailHd';
import DisItem from '../../components/course/disItem';
import DisInput from '../../components/Discuss/disInput';
import './detail.less';

@observer
class Index extends PureComponent {
	
	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
		};
	}
	
	//评论后更新评论
	updateCommit(){
		// detailStore.getCommInfo().then(()=>{
		// 	this.setState({
		// 		dataChange: !this.state.dataChange
		// 	})
		// })
		console.log('commit');
	}
	
	render() {
		const {
			hasData,
			recommend,
			discussion,
		} = detailStore;
		const{ dataChange} = this.state;
		return(
			hasData?(
				<div className="map-detail-wrap">
					<DetailHd type="venue" />
					
					<div className="white_card">
						<div className="card_hd"><span>推荐服务</span> <a href={`./list.html?type=line`} >更多 <Icon type="right" size="xs" className="right_arrow" />	</a></div>
						<div className="map-rem-content">
							{recommend.length ? recommend.map((item) =>
								<div className="map-rem-bd" key={item.id}>
									<div className="map-rem-box">
										<img src={item.img} alt=""/>
										<div className="rem-info">
											<div className="title">
												<div className="name">{item.title}</div>
												<div className="price">￥{item.price}</div>
											</div>
											<div className="others">
												<span>{item.day}天</span>
												<span>{item.calorie}卡</span>
												<div className="users">{item.num}人</div>
											</div>
										</div>
									</div>
								</div>
							):null}
						</div>
					</div>
					<div className="white_card">
						<div className="card_hd"><span>热门评论</span> <a href={`./list.html`} >更多 <Icon type="right" size="xs" className="right_arrow" />	</a></div>
						<div>
							{discussion.length ? discussion.map(item => <DisItem data={item} key={item.id} />):<div>还没有人评论~</div>}
						</div>
					</div>
					<div className="white_card">
						<div className="card_hd"><span>最新动态</span> <a href={`./list.html`} >更多 <Icon type="right" size="xs" className="right_arrow" />	</a></div>
						<div>
							{discussion.length ? discussion.map(item => <DisItem data={item} key={item.id} />):<div>还没有人评论~</div>}
						</div>
					</div>
					<DisInput hasReward detailId={1} handleUpdate = {this.updateCommit.bind(this)} />
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));