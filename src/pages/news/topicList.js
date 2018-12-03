document.title = '专题';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import listStore from "../../store/news/topicList";
import InfiniteScroll from 'react-infinite-scroller';
import { ActivityIndicator } from 'antd-mobile';
import Item from '../../components/news/topicItem';
import {getQuery} from "../../libs/utils";
import './topicList.less';

@observer
class Index extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			refreshStatus: false
		}
	}

	componentDidMount(){
		listStore.getTopicList().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange
			})
		})
	}

	// 滑动加载
	triggerNextList(){
		listStore.nextPage();
		listStore.getTopicList().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}

	render() {
		const { curPage, totalPage, list } = listStore;
		return(
			<div className="news_topic_list">
				<InfiniteScroll
					style={{textAlign:'center'}}
					threshold={100}
					pageStart={1}
					loadMore={ this.triggerNextList.bind(this)}
					hasMore={ curPage < totalPage }
					loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
				>
					{
						list.length > 0 ? list.map(item => <Item key={item.id} data={{...item,link:`./topicDetail.html?origin=news&detail=${item.id}&columnId=${getQuery('columnId')}`}} />)
							: <div className="no_topic">暂无专题~</div>
					}
				</InfiniteScroll>
			</div>
		)
	}
}

render(<Index />,document.getElementById('root'));