import React, { PureComponent } from 'react';
import './item.less';

const cerImg='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAdCAMAAAAdK4vkAAAASFBMVEUAAABdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXpdzXoK/a1NAAAAF3RSTlMAjAvzN2Ec63RCgJfG4qzRuFYrTGraoZ+LZlAAAAI0SURBVEjHpZVLoqsgDEAjEH5+QLC6/52+AHIptX0TzkAF9BBjBOhgRD6jukbgXnReqbeVc+WmmBrbNYZp4nC27hdShx5TK1bNRz+wyGE33ub5MalInSNM1fyAU9xuXI3fhl4A4vrOcs+JvpzdTzXjv6b1xRBEBfOt5z3A7reNkqZDRD0diNu7enpGrFc6SjC5NdsKgrof23LOzpo8qRYT9wBmN3NVfw16LVILZOpQbC0Xp0/GVvzockTsIyH701w+rAPIYfGw1CTf6hqsb40yrHq1vQirP80EA11ireo1qZ0Q8Sz9RX2ISOH7jdS8V29pPoCjM2cM7CU667eEn1JYLzykyHfe903IqC0Cqf3L8Te1u/+QozcTCKaoWZCJwO7k26xe/qpWU3s3lEEmme/VhCF3M3dqJT0vOFRVRcx/hY8mqxfm1Poetb+amzdzS4iSy9VoahOF79SPXE9tGcRQzd1nfKsEdfKkNpei4RXFrY63WvVq7JbYufvVz8+ol5xta2y4LLtedzZ11KeOTzXjzU3mbjCXMYem1iwfIbxUmjdSk7Agud6pNvun33VIlw1ZP5Nghy4g2Fzemora5JwFlV4vcg2Qf/SI/E0tr6/MpeQJfohKnlstac0quZczqSdqa72jxX3v1KB/7EDh+o2qF/z/W8F2PREAy9hW8Msd0+Iyrn6u2Y5ixtFtt2J86+UWhs2cQUNYxwm1HSy/xhg79DAmGUtnXMfELsIPpN3maYAjkOQfrpCuw6n0LhwAAAAASUVORK5CYII=';

export default class Index extends PureComponent {
	render() {
		const {data:{
			img,
			name,
			desc,
			star,
			internal,
			book,
			view,
			distance,
			link,
			coupon,
			certified,
		}} = this.props;
		return(
			<div className="map_item_box">
				<a href={link}>
					<div className="img_box"><img src={img} alt=""/></div>
					<div className="text_box">
						{certified? <img src={cerImg} alt="" className="certified" />:null}
						<div className="name">{name}</div>
						<p>{desc}</p>
						<div className="others" style={{marginTop: coupon?0:'.08rem'}}>
							{star?<div className={['star', `star_${star}`].join(' ')} />:(
								internal?<div className="country internal">国内</div>:<div className="country">国外</div>
							)}
							<span>预约数:{book}</span>
							<span>浏览数:{view}</span>
							<span>距离:{distance}米</span>
						</div>
						{coupon?<div className="coupon">
							<div className="cou_num"><span>{coupon.num}</span></div>
							<div className="cou_text"><span>{coupon.text}</span></div>
						</div>:null}
					</div>
				</a>
			</div>
		)
	}
}