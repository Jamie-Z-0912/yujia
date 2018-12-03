import React, { PureComponent } from 'react';
import moment from 'moment';
import {Icon, Toast} from 'antd-mobile';
import BannerNum from '../../components/BannerNum';
import userInfo from "../../libs/userInfo";
import './Item.less';
import Request from '../../service/baseAxios';
import {XQN_BASE} from "../../libs/utils";


export default class Item extends PureComponent {
	constructor(props){
		super(props);
		this.state={
			hasClickZan: false,
			textHide: true,
			visible: false,
			dataChange: false,
		};
		this.handleClickLike = this.handleClickLike.bind(this);
	}

	// 点赞
	async handleClickLike(id, is_up){
		if(is_up){
			Toast.info("请勿重复点赞");
			return;
		}
		this.setState({
			hasClickZan: true,
		});
		const res = await Request('/app/community/infoUpAdd',{community_id: id});
		console.log('zan',res);
		console.log('接口返回了');
		this.setState({
			hasClickZan: false,
		});

		this.props.data.is_up = 1;
		const {head_url} = userInfo;
		if(this.props.data.upList){
			this.props.data.upList.unshift({up_user_id: userInfo.id, head_url});
		}else{
			this.props.data.upList = [{up_user_id: userInfo.id, head_url}];
		}
		this.setState({
			dataChange: !this.state.dataChange
		})
	}

	// 删除
	async delMyComm(id){
		await Request('/app/community/del',{id}, 'POST');
		Toast.info('删除完成', 1);
		this.props.delSuccess();
	}

	render() {
		const {data:{
			id,
			head_url,
			user_name,
			create_time,
			pic,
			is_up,
			upList,
			content,
			creator,
			comment_num,
		}} = this.props;
		const {visible, textHide, hasClickZan} = this.state;
		let likeUserNum;
		if (upList){
			likeUserNum = upList.length;
		}else{
			likeUserNum = 0;
		}
		
		return(
			<div className="community_item_box">
				{
					creator === userInfo.id ? (
						<div className="popDelete">
							<div
								className="delete"
								onClick={()=>{
									this.setState({
										visible: !visible,
									})
								}}
							><Icon type="cross" /></div>
							{visible ? <div className="tips" onClick={()=>{ this.delMyComm(id)}} >删除</div> :null}
						</div>
					):null
				}
				<div className="item_hd">
					<div className="photo"><img src={head_url} alt=""/></div>
					<div className="item_hd_con">
						<div className="item_hd_author">{user_name}</div>
						<div className="item_hd_time">
							<span>{moment(create_time).format('YYYY/MM/DD')}</span>
							<span>{moment(create_time).format('HH:mm')}</span>
						</div>
					</div>
				</div>
				<div className="img_box">
					<BannerNum data={JSON.parse(pic)} className="num_top" />
				</div>
				<div className="item_bd">
					<div className="other">
						<div
							className="icon_pl"
							onClick={()=>window.location=`/${XQN_BASE.baseFile}/community/discussion.html?origin=community&detail=${id}`}
						/>
						<div className={["icon_like", is_up ? 'liked':''].join(' ')}
							onClick={()=>{
								if(hasClickZan){
									console.log('等等接口');
									return;
								}
								this.handleClickLike(id, is_up);
							}}
						/>
					</div>
					{
						likeUserNum > 0 ?(
							<div className="like_users">
								{
									upList.slice(0,10).map(item => <img key={item.up_user_id} src={item.head_url} alt=""/>)
								}
								{
									likeUserNum > 2 ? <a href={`/${XQN_BASE.baseFile}/community/likeUsers.html?id=${id}`} className="more_users" /> : null
								}
							</div>
						)
						: null

					}
					<div className={['text_box', textHide?'':'show'].join(' ')}>
						<div className='brief'>{user_name}：{content}</div>
						{ content.length > 44 ?
							<span onClick={()=>{this.setState({textHide: !textHide})}}>
								{textHide ?'展开':'收起'}
							</span>:null
						}
					</div>
					{comment_num ? <a className="pl" href={`/${XQN_BASE.baseFile}/community/discussion.html?origin=community&detail=${id}`}>查看全部{comment_num}条评论</a>:null}
				</div>
			</div>
		)
	}
}