import {getQuery, XQN_BASE} from "../../libs/utils";
import {wxShare} from '../../libs/wxShare';

document.title = '视频详情';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import detailStore from '../../store/living/detail';
import { Button, Icon } from 'antd-mobile';
import moment from 'moment';
import BannerSmall from '../../components/BannerSmall';
import DisItem from '../../components/Discuss/item';
import DisInput from '../../components/Discuss/disInput';
import Reward from '../../components/living/reward';
import './detail.less';

@observer
class Detail extends PureComponent{

	constructor(props){
		super(props);
		this.state = {
			textHide: true,
			dataChange: false,
			visible: false,
		};
	}

	async componentDidMount(){
		await detailStore.getLivingInfo();
		await detailStore.getCommInfo();
		this.setState({
			dataChange: !this.state.dataChange
		})
	}

	//评论后更新评论
	updateCommit(){
		detailStore.getCommInfo().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange
			})
		})
	}

	render(){
		const {detail, tempBanner, discussionInfo, message} = detailStore;
		const {visible, textHide} = this.state;
		const stringSymbol = window.location.href.indexOf('?')<0?'?':'&';
		wxShare({
			img: detail.surface_plot,
			title: detail.title,
			desc: '',
			url: `${window.location.href}${stringSymbol}unit_id=${XQN_BASE.unit_id}&appId=${XQN_BASE.appId}`,
		});

		const statusOpt = (sTime, eTime, ctime) => {
			if (ctime < sTime){
				return <div className="icon_stop">等待开始</div>;
			}
			if (ctime > sTime && ctime < eTime){
				return <div className="icon_living">正在观看</div>;
			}
			return <div className="icon_replay">已参与</div>;
		};
		return(
			detail && detail.surface_plot ? (
				<div className="living-detail-wrap">
					<div className="living-detail-hd">
						<div className="video-box">
							{
								detail.source_url ?
									<iframe className="videoFrame" src={detail.source_url} />
									:<img className="videoFrame" src={detail.surface_plot} alt=""/>
							}
						</div>
						<div className="lecturer">
							<div className="photo"><img src={detail.surface_plot} alt=""/></div>
							<div className="detail_hd_con">
								<div className="lec_name">主讲人：{detail.actor}</div>
								<div className="lec_other">{detail.title}</div>
							</div>
							<div className="lec_con_right">
								{
									detail.status === 1 ? <Button>直播中</Button>:null
								}
								<div className="user_num">
									{detail.reading ? <span>{detail.reading}人</span>:null}
									<span>{statusOpt(detail.live_start_time, detail.live_end_time, detail.ctime)}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="white_card detail-info">
						<div className="live_detail_title">{detail.title}</div>
						<div className={['live_detail_text', textHide?'hide':''].join(' ')}>
							<div dangerouslySetInnerHTML={{ __html: detail.abstract_info }}/>
							<span onClick={()=>{this.setState({textHide: !textHide})}}>
								{textHide ?'展开全文':'收起全文'}
							</span>
						</div>
						{
							detail.isadmin ?(
								<div className="manager_msg">
									<div className="msg_con"><span>管理员：</span><span>{message.text}</span></div>
									<div className="msg_time">{moment(message.time).format('YYYY/MM/DD HH/mm')}</div>
								</div>
							):null
						}
					</div>
					{
						tempBanner.length ?
							<div className="white_card recommend-video">
								<div className="card_hd"><span>相关视频推荐</span></div>
								<div>
									<BannerSmall data={tempBanner} type="video" />
								</div>
							</div>
							:null
					}
					<div className="white_card discussionCard">
						<div className="card_hd">
							<span>热门评论</span>
							{
								discussionInfo.length ?<a href={`./discussion.html?detail=${getQuery('detail')}&origin=live`}>查看全部 <Icon type="right" size="xs" className="right_arrow" /></a>:null
							}
						</div>
						{
							discussionInfo.length > 0 ?
								discussionInfo.map(item => <DisItem key={item.id}  data={item} />) :
								<div className="no_comment">快来抢第一条评论吧~</div>
						}
					</div>
					<DisInput hasReward detailId={detail.id} handleUpdate = {this.updateCommit.bind(this)} />
					<div className="rewardBtn" onClick={()=>{this.setState({visible: true})}} />
					<Reward visible={visible} id={detail.id} triggerRewardModal={()=>{this.setState({visible: false})}}  />
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Detail />,document.getElementById('root'));