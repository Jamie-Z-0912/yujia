import {getQuery, XQN_BASE} from "../../libs/utils";

document.title = '话题详情';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import topicDetail from "../../store/community/topicDetail";
import { Icon, Toast } from 'antd-mobile';
import Detail from '../../components/community/topicItem';
import DisItem from '../../components/Discuss/item';
import DisInput from '../../components/Discuss/disInput';
import ApplyForm from '../../components/community/applyForm';
import Activity from '../../components/community/activityDetail';
import './topicDetail.less';
import Request from "../../service/baseAxios";
import {wxShare} from "../../libs/wxShare";

@observer
class Index extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			// 申请弹窗
			visible: false,
			dataChange: false,
			hasData: false,
		};
	}

	triggerApplyModal(flag){
		this.setState({
			visible: !!flag,
		})
	}

	componentDidMount(){
		topicDetail.getActInfo().then(()=>{
			this.setState({
				hasData: true,
			})
		});
		topicDetail.getActDiscuss().then(()=>this.setState({dataChange:!this.state.dataChange}))
	}

	// 评论成功，重新加载评论
	updateDiscuss(){
		topicDetail.getActDiscuss().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange
			});
		})
	}

	render() {
		const { type, detail, activityUser, list} = topicDetail;
		const {hasData} = this.state;
		const stringSymbol = window.location.href.indexOf('?')<0?'?':'&';
		wxShare({
			img: detail.theme_pic,
			title: detail.title,
			desc: '',
			url: `${window.location.href}${stringSymbol}unit_id=${XQN_BASE.unit_id}&appId=${XQN_BASE.appId}`,
		});
		return(
			hasData ? (
				<div className="topic_detail">
					<Detail data={detail} />
					{
						type ==='1'?(
							<Activity activityUser={activityUser} detail={detail} />
						):null
					}
					<div className="white_card discussionCard">
						<div className="card_hd">
							<span>热门评论</span>
							{
								list.length ?
									<a href={`./discussion.html?origin=interaction&detail=${detail.id}`}>查看全部 <Icon type="right" size="xs" className="right_arrow" />	</a>
									:null
							}
						</div>
							{
								list.length > 0 ?
									list.map(item => <DisItem key={item.id}  data={item} />) :
									<div className="no_comment">快来抢第一条评论吧~</div>
							}
					</div>
					{
						type === '1' ?
							(
								<div>
									<div className="page-bottom">
										<ul>
											{
												detail.signStatus?
													<li>已经报名</li>:
													<li onClick={()=> this.setState({visible:true})}>立即报名</li>
											}
											<li className="discuss" onClick={()=>window.location=`./discussion.html?origin=interaction&detail=${detail.id}`} />
											<li
												className={["collect", detail.isCollect ? 'has' : ''].join(' ')}
												onClick={async ()=>{
													if(!detail.isCollect){
														const res = await Request('/app/act/collect', { id: getQuery('detail')});
														// console.log(res);
														if(!res.resCode){
															detail.isCollect = true;
															this.setState({dataChange: !this.state.dataChange});
														}else{
															Toast.info(res.message,2);
														}
													}
												}}
											/>
										</ul>
									</div>
									<div style={{height: 46}} />
								</div>
							):
							<DisInput hasCollect={{status:detail.isCollect}} detailId={detail.id} handleUpdate={this.updateDiscuss.bind(this)} />
					}
					<ApplyForm
						is_charge={detail.is_charge}
						topicId={detail.id}
						modelList={detail.modelList}
						visible = {this.state.visible}
						triggerApplyModal = {this.triggerApplyModal.bind(this)}
						callback={()=>{
							topicDetail.detail.signStatus=1;
							this.setState({dataChange:!this.state.dataChange});
						}}
					/>
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));