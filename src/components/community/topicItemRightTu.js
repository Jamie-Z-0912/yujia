import React, { PureComponent } from 'react';
import {XQN_BASE} from "../../libs/utils";
import './topicItemRT.less';

export default class Item extends PureComponent {

	render() {
		const {data:{
			id,
			theme_pic,
			title,
			reading,
			interaction_type	// 类型：1报名 2答题 3投票 4抽奖 5众筹 6话题
		}} = this.props;
		return(
			<div className="topicRT_item_box">
				<a href={`/${XQN_BASE.baseFile}/community/topicDetail.html?origin=interaction&acttype=${interaction_type}&detail=${id}`}>
					<div className="img_box"><img src={theme_pic} alt=""/></div>
					<div className="text_box">
						<div className="tit">{title}</div>
						<div className="topic_other">
							<span className="user_num">{reading}</span>
							{
								interaction_type === 3 ? <span className="type_vote">投票</span> : null
							}
							{
								interaction_type === 6 ? <span className="type_topic">话题</span> : null
							}
							{
								interaction_type === 5 ? <span className="type_vote">众筹</span> : null
							}
							{
								interaction_type === 1 ? <span className="type_topic">报名</span> : null
							}
						</div>
					</div>
				</a>
			</div>
		)
	}
}