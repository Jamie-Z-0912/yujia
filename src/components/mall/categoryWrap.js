import React,{PureComponent} from 'react';
import './categoryWrap.less';

export default  class CategoryWrap extends PureComponent{

	constructor(props){
		super(props);
		this.state = {
			active: 0,
		}
	}

	render(){
		const {category} = this.props;
		const {active} = this.state;
		return(
			<div className="category-wrap">
				<div className="category-content">
					<div className="cate-menu">
						{
							category.map((item, index)=><div key={item.cate_id} className={`menu_name ${index===active?'active':''}`}>{item.cate_name}</div>)
						}
					</div>
					<div className="cate-list-wrap">
						{
							category.map(item=>(
								<div key={item.cate_id}>
									<div className="cate_name">{item.cate_name}</div>
									{
										item.data.map(goods =>(
											<div key={goods.id} className="cate_goods">
												<a href={goods.link}>
													<div className="img_box"><img src={goods.img} alt=""/></div>
													<div className="text_box">
														<div className="name">{goods.name}</div>
														<div className="price">￥{goods.price}</div>
													</div>
												</a>
												<div className="addCart" onClick={()=>{console.log('商品ID',goods.id)}} />
											</div>
										))
									}
								</div>
							))
						}
					</div>
				</div>
				<a href='./shoppingCart.html' className="shoppingCart" />
			</div>
		)
	}
}