import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import Request from '../../service/baseAxios';
import Item from '../../components/news/Item';
import '../reset.less';

class MyVip extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			curPage: 1,
			pageSize: 10,
			list: [],
			totalCount: 0,
			pageCount: 1,
			totalPage: 0,
			hasData: false,
		}
	}

	componentDidMount(){
		this.getList();
	}

	async getList(){
		const{curPage, pageSize} = this.state;
		const res = await Request('/app/member/singleList',{ curPage: curPage, pageSize: pageSize});
		console.log(res);
		this.setState({
			list: res.list ? (res.curPage === 1 ? res.list : this.state.list.concat(res.list)):this.state.list,
			hasData: true
		});
	};

	triggerNextList(){
		this.setState({
			curPage: this.state.curPage+1,
		});
		// this.getList();
	};

	render(){
		const {hasData, list, curPage, totalPage} = this.state;
		console.log(hasData);
		console.log(list);
		return(
			hasData ? (
				<div className="myVip-wrap" style={{backgroundColor:'#fff'}}>
					{
						list.length ? (
							<InfiniteScroll
								style={{textAlign:'center'}}
								threshold={100}
								pageStart={1}
								loadMore={ this.triggerNextList.bind(this)}
								hasMore={ curPage < totalPage }
								loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
							>
								{list.map((item) => (
									<Item key={item.id} data={item} />
								))}
							</InfiniteScroll>
						):(<div className="empty"><p className="empty-info">您还未定专享文章</p></div>)
					}
				</div>
			):(<div className="routerLoading"><Icon type="loading" size="lg" /></div>)
		)
	}
}
render(<MyVip />,document.getElementById('root'));

