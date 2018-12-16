document.title = '课程';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import listStore from "../../store/course/list";
import Item from '../../components/course/item';
import './list.less';

@observer
class Index extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataChange: false,
		};
	}
	
	componentDidMount(){
		listStore.getList().then(()=> this.setState({dataChange: !this.state.dataChange, hasData:true}));
	}
	
	triggerNextList(){
		listStore.nextPage();
		listStore.getList().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}
	
	render(){
		const {hasData, list, curPage, totalPage} = listStore;
		return(
			hasData ? (
				<div className="course-list-wrap">
					<InfiniteScroll
						style={{textAlign:'center'}}
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
			):<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}

render(<Index />,document.getElementById('root'));
