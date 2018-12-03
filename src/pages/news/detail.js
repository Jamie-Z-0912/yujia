import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import {XQN_BASE} from "../../libs/utils";
import { observer } from 'mobx-react';
import detailStore from "../../store/news/detail";
import { Icon } from 'antd-mobile';
import moment from 'moment';
import DisItem from '../../components/Discuss/item';
import DisInput from '../../components/Discuss/disInput';
import CostModal from '../../components/news/cost';
import './detail.less';
import Request from '../../service/baseAxios';
import {wxShare} from '../../libs/wxShare';

@observer
class Index extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			refreshStatus: false
		};
	}

	componentDidMount(){
		detailStore.getDetailInfo().then(()=> {
			this.setState({
				dataChange: !this.state.dataChange
			})
		});
	}

	// 评论完成后更新评论列表
	updateCommit(){
		detailStore.updateDiscuss().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange
			})
		})
	}

	// 关注/取关单位
	async handleFocus(id){
		await Request('/app/member/focus',{unit_id: id}).then(()=>{
			detailStore.info.focus = !detailStore.info.focus;
			this.setState({
				dataChange: !this.state.dataChange
			})
		});
	}

	render() {
		const {info:{
			id,
			unit_img,
			unit_name,
			theme_img1,
			time,
			abstract_info,
			content,
			title,
			focus,
			unit_id,
			collection,
			money,
			month_charge,
			need_pay,
			is_charge,
			comment:{list},
		}} = detailStore;
		const stringSymbol = window.location.href.indexOf('?')<0?'?':'&';
		wxShare({
			img: theme_img1,
			title,
			desc: abstract_info,
			url: `${window.location.href}${stringSymbol}unit_id=${XQN_BASE.unit_id}&appId=${XQN_BASE.appId}`,
		});
		const { dataChange } = this.state;
		return(
			id?(
				<div className="detail-wrap">
					<div className="detail-box">
						<h1 className="title">{title}</h1>
						<div className="detail_hd">
							<div className="photo"><img src={unit_img} alt=""/></div>
							<a className="detail_hd_con" href={`/${XQN_BASE.baseFile}/mine/company.html?unitId=${unit_id}`}>
								<div className="detail_hd_author">{unit_name}</div>
								<div className="detail_hd_time">
									<span>{moment(time).format('YYYY/MM/DD')}</span>
								</div>
							</a>
							{
								focus ? <span className="focus has_focus" onClick={()=>{this.handleFocus(unit_id)}}>已关注</span>
									: <span className="focus" onClick={()=>{this.handleFocus(unit_id)}}>关注</span>
							}
						</div>
						{
							abstract_info ? <div className="detail_brief">{abstract_info}</div> : null
						}
						<div className="detail_themeimg"><img src={theme_img1} alt="" /></div>
						<div className="detail_content">
							<div dangerouslySetInnerHTML={{ __html: content }}/>
						</div>
					</div>
					<div className="white_card discussionCard">
						<div className="card_hd"><span>热门评论</span> <a href={`./discussion.html?detail=${id}&origin=news`}>查看全部 <Icon type="right" size="xs" className="right_arrow" /></a></div>
						{
							list.length?
								list.map(item => <DisItem key={item.id} changeMenuData={dataChange} data={item} />) :
								<div className="no_comment">快来抢第一条评论吧~</div>
						}
					</div>
					<DisInput hasCollect={{status: collection}} detailId={id} handleUpdate = {this.updateCommit.bind(this)} />
					{
						need_pay?
							<CostModal id={id} is_charge={is_charge} need_pay={need_pay} money={money} month_charge={month_charge} hasClose />
							:null
					}
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));