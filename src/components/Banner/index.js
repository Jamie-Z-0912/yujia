import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import './index.less';
import { observer } from 'mobx-react';

const style =  {
	car_param: {
		autoplay: false,
		infinite: true,
		dotStyle:{width:'10px', height:'2px', backgroundColor:'#aaa', borderRadius:'1px'},
		dotActiveStyle:{width:'10px', height:'2px',backgroundColor:'#fff', borderRadius:'1px'}
	},
	car_item:{
		display: 'block',position: 'relative', width: '100%', height: '1.88rem',
	},
};

@observer
export default class Banner extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			imgHeight: style.car_item.height
		}
	}

	render() {
		const { data } =  this.props;
		const { imgHeight } = this.state;
		return(
			<div className="banner_wrap">
				<Carousel {...style.car_param} autoplay={true}>
					{data.map( item => {
						return <a
							key={item.id}
							href={item.link}
							style={style.car_item}
						>
							<img
								src={item.theme_img1||item.img}
								alt="轮播图"
								style={{width: '100%', verticalAlign: 'top', imgHeight}}
								onLoad={() => {
									window.dispatchEvent(new Event('resize'));
									this.setState({imgHeight});
								}}
							/>
							<span className='text'>{item.title}</span>
						</a>
					})}
				</Carousel>
			</div>
		)
	}
	
}