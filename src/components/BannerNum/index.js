import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import BannerAllScreen from '../BannerAllScreen';
import './index.less';

const style =  {
	car_param: {
		autoplay: false,
		infinite: true,
		dots: false,
	},
	car_item:{
		display: 'block',position: 'relative', width: '100%', height: '1.88rem',
	},
};

export default class Banner extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			imgHeight: style.car_item.height,
			current: 1,
			showAll: false,
			selectedIndex:0,
		}
	}

	render() {
		const { data, className } =  this.props;
		const { imgHeight, current, showAll, selectedIndex } = this.state;
		return(
			<div>
				<div
					className={['banner_num_wrap', className].join(' ')}
					 onClick={()=>{
						 console.log('点击',current);
						 this.setState({
							 selectedIndex: current-1,
							 showAll:true,
						 })
					 }}
				>
					<Carousel
						{...style.car_param}
						afterChange={index => this.setState({current: index+1})}
					>
						{data.map( item => {
							return (
								<img
									key={item}
									src={item.pic}
									alt="轮播图"
									style={{width: '100%', verticalAlign: 'top', imgHeight}}
									onLoad={() => {
										window.dispatchEvent(new Event('resize'));
										this.setState({imgHeight});
									}}
								/>
							)
						})}
					</Carousel>
					<div className='num'>{current}/{data.length}</div>
				</div>
				{/* showAll? <BannerAllScreen data={data} selectedIndex={selectedIndex} /> :null */}
			</div>
		)
	}

}