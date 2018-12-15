import {wxShare} from "../../libs/wxShare";

document.title = '专题';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import newsTopicDetail from "../../store/news/topicDetail";
import Detail from '../../components/news/topicItem';
import Item from '../../components/news/Item';
import DisInput from '../../components/Discuss/disInput';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import './topicDetail.less';
import {XQN_BASE} from "../../libs/utils";

@observer
class Index extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
		}
	}

	async componentDidMount(){
		await newsTopicDetail.getTopDetail().then(()=>this.setState({hasData:true}));
		await newsTopicDetail.getTopicList().then(()=>this.setState({dataChange: !this.state.dataChange}));
	}
	// 滑动加载
	triggerNextList(){
		newsTopicDetail.nextPage();
		newsTopicDetail.getTopicList().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}

	render() {
		const { detail, curPage, totalPage, list } = newsTopicDetail;
		const stringSymbol = window.location.href.indexOf('?')<0?'?':'&';
		wxShare({
			img: detail.theme_img1,
			title: detail.title,
			desc: detail.abstract_info,
			url: `${window.location.href}${stringSymbol}unit_id=${XQN_BASE.unit_id}`,
		});
		const {hasData} = this.state;
		return(
			hasData ?
			<div className="news_topic_detail">
				<Detail data={detail} />
				<div className="white_card">
					<InfiniteScroll
						style={{textAlign:'center'}}
						threshold={100}
						pageStart={1}
						loadMore={ this.triggerNextList.bind(this)}
						hasMore={ curPage < totalPage }
						loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
					>
						{
							list.length > 0 ? list.map(item => <Item key={item.id} data={{...item,link:`./topicDetail.html?detail=${item.id}`}} />)
								: null
						}
					</InfiniteScroll>
				</div>
				<DisInput nextLink={`./discussion.html?origin=news&detail=${detail.id}`} detailId={detail.id} handleUpdate={()=>console.log('评论成功')} />
			</div>
				:(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));