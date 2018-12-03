import React, { PureComponent } from 'react';
import VoteView from './voteView';
import './topicItem.less';

export default class TopicItem extends PureComponent {
	render() {
		const {data:{
			theme_pic,
			title,
			content,
			reading,
			interaction_type	// 类型：1报名 2答题 3投票 4抽奖 5众筹 6话题
		}} = this.props;
		
		return(
			<div className="topic_item_box">
				<div className="img_box"><img src={theme_pic} alt=""/></div>
				<div className="topic_title">{title}</div>
				<div className="topic_desc" dangerouslySetInnerHTML={{ __html: content }} />
				{
					interaction_type == 3 ? <VoteView data={this.props.data} /> : null
				}
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
		)
	}
}