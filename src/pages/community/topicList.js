document.title = '话题列表';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import listStore from "../../store/community/topicList";
import Item from '../../components/community/topicListItem';
import '../reset.less';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';

@observer
class Index extends PureComponent {

	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false
		};
	}

	componentDidMount(){
		listStore.getActList().then(()=>{
			this.setState({
				dataChange: !this.state.dataChange,
				hasData: true,
			})
		})
	}
	// 滑动加载
	triggerNextList(){
		listStore.nextPage();
		listStore.getActList().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}

	render() {
		const { curPage, totalPage, list } = listStore;
		return(
			this.state.hasData ?
				<div className="topic_list">
					<InfiniteScroll
						style={{textAlign:'center',padding: '0 .1rem'}}
						threshold={100}
						pageStart={1}
						loadMore={ this.triggerNextList.bind(this)}
						hasMore={ curPage < totalPage }
						loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
					>
						{
							list.map(item => <Item key={item.id} data={item} />)
						}
					</InfiniteScroll>
				</div>
				:(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}

render(<Index />,document.getElementById('root'));