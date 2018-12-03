import myFocusStore from "../../store/mine/myFocus";

document.title = '单位主页';
import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
import companyStore from "../../store/mine/company";
import NewsItem from '../../components/news/Item';
import bg_img from '../../static/img/02.png';
import './company.less';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon, ActivityIndicator } from 'antd-mobile';
import Request from '../../service/baseAxios';

@observer
class Company extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			dataChange: false,
			hasData: false,
		};
	}

	async componentDidMount(){
		await companyStore.getUnitInfo();
		companyStore.getUnitArticle().then(()=>{
			this.setState({
				hasData: true,
			})
		});
	}

	// 滑动加载
	triggerNextList(){
		companyStore.nextPage();
		companyStore.getUnitArticle().then(()=> this.setState({dataChange: !this.state.dataChange}));
	}

	// 关注/取关单位
	async handleFocus(id,focus){
		await Request('/app/member/focus',{unit_id: id}).then(()=>{
			if(focus){
				companyStore.info.member_num -= 1;
			}else{
				companyStore.info.member_num += 1;
			}
			companyStore.info.focus = !companyStore.info.focus;
			this.setState({
				dataChange: !this.state.dataChange
			})
		});
	}

	render(){
		const {
			info:{
				id,
				head_url,
				unit_name,
				article_num,
				member_num,
				focus,
			},
			articlesInfo:{
				list,
				curPage,
				totalPage,
			},
		} = companyStore;

		return(
			this.state.hasData ?
				<div className="company-wrap">
					<div className="company-hd">
						<img src={bg_img} className="company-hd-bg" alt=""/>
						<div className="company-hd-con">
							<img className="photo" src={head_url} alt=""/>
							<div className="company-name">{unit_name}</div>
							<div className="company-info">
								<span>文章：{article_num}</span>
								<span>粉丝：{member_num}</span>
							</div>
							<div className="company-btn">
								{
									focus ?
										<div className="btn_normal btn_white" onClick={()=>{this.handleFocus(id, focus)}}>取消关注</div>
										: <div className="btn_normal btn_blue" onClick={()=>{this.handleFocus(id, focus)}}>+ 关注</div>
								}
							</div>
						</div>
					</div>
					<div className="company-bd">
						<InfiniteScroll
							style={{textAlign:'center',padding: '0 .1rem'}}
							threshold={100}
							pageStart={1}
							loadMore={ this.triggerNextList.bind(this)}
							hasMore={ curPage < totalPage }
							loader={<div style={{display:'inline-block',paddingTop:'.15rem'}}><ActivityIndicator text="加载中……" /></div>}
						>
							{
								list.length ?
									list.map(item=> <NewsItem key={item.id} data={item} />)
									:<div className="nothing">对方暂无最新动态</div>
							}
						</InfiniteScroll>
					</div>
				</div>
				:<div className="routerLoading"><Icon type="loading" size="lg" /></div>
		)
	}
}
render(<Company />,document.getElementById('root'));