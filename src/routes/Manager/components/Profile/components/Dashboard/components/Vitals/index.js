import React from 'react';
import { Card, Tabs, Badge, Tooltip, Popover, Icon } from 'antd';
import moment from 'moment';
import { EmptyList } from '../../../../../../../../components/Loading/index';
import './index.less';
import {TrackerChart} from '../../../../../../../Plan/components/Tracker/containers/Chart';
import VMasker from 'vanilla-masker';
import { TrackerChartPopup } from '../../../../../../../Plan/components/Tracker/components/TrackerChartPopup';
import { formatTrackerValue } from '../../../../../../../Plan/components/BiometricPlan/components/TrackerCard/components/TrackerCardValue';
import { TrackerReportModalButton } from '../../../../../../../Plan/components/Tracker/components/Buttons/components/ReportModal';
import { getSQLDateToday } from '../../../../../../../../components/Other/utils';
const { TabPane } = Tabs;
export const Vitals = (props) => {
	// console.log(props);
	const {loading, activeTab, setActiveTab, vitals = [], user = {} } = props;
	if (vitals.length === 0) {
		return null;
	}
	const date = getSQLDateToday();

	// const limit = 3;
	// const slidesToShow = limit; //vitals.length >= limit ? limit : vitals.length;

	// if (vitals.length < limit) {
	// 	return (
	// 		<Card type="basic1 ant-card-type-pure" bordered={false} title="Vitals">
	// 			<List
	// 				grid={{ gutter: 8, column: 4 }}
	// 				dataSource={vitals}
	// 				renderItem={(tracker, i) => {
	// 					const { label = '', units = {}, inputMask = '', getLastReport } = tracker;
	// 					const { name: unitsName } = units;
	// 					const { datetime = '', isCritical = false } = getLastReport || {};
	// 					let { value } = getLastReport || {};

	// 					if (value) {
	// 						value = inputMask !== '' ? VMasker.toPattern(value, inputMask) : VMasker.toNumber(value);
	// 					} else {
	// 						value = 'N/A';
	// 					}
	// 					if (isCritical) {
	// 						value = (
	// 							<Tooltip title="Critical Value">
	// 								<span className="critical">{value}</span>
	// 							</Tooltip>
	// 						);
	// 					}

	// 					return (
	// 						<List.Item key={i}>
	// 							<Card type="pure" className="vital" key={i}>
	// 								<div className="title">{label}</div>
	// 								<div className="units">
	// 									{unitsName}
	// 									<TrackerChartPopup item={tracker} userId={user.id} label={label} />
	// 								</div>
	// 								<div className="value">{value}</div>
	// 								<div className="date">{datetime && moment(datetime).format('Llll')}</div>
	// 							</Card>
	// 						</List.Item>
	// 					);
	// 				}}
	// 			/>
	// 		</Card>
	// 	);
	// }
    //console.log(props);
	return (
		<Card
			type="basic1 ant-card-type-pure"
			bordered={false}
			// title="Vitals"
			bodyStyle={{ padding: '0 0 32px 0' }}
		>
        <Tabs activeKey={activeTab} className={'topBorderedTab'} onChange={props.setActiveTab}>
                {vitals.map(tracker => <TabPane tab={<CustomTab tracker={tracker} user={user} date={date} />} key={tracker.id}>
                <div style={{height:200}}>
                <TrackerChart item={tracker} user={user} fullWidth />
                </div>
                </TabPane>)}
        </Tabs>
              
			{/* <Carousel
				slidesToShow={slidesToShow}
				arrows={true}
				centerPadding={10}
				slidesToScroll={slidesToShow}
				responsive={[
					{ breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 2 } },
					{ breakpoint: 700, settings: { slidesToShow: 1, slidesToScroll: 1 } }
				]}
			>
				{vitals.map((tracker, i) => {
					const { label = '', units = {}, inputMask = '', getLastReport } = tracker;
					const { name: unitsName } = units;
					const { datetime = '', isCritical = false } = getLastReport || {};
					let { value } = getLastReport || {};

					if (value) {
						value = inputMask !== '' ? VMasker.toPattern(value, inputMask) : VMasker.toNumber(value);
					} else {
						value = 'N/A';
					}
					if (isCritical) {
						value = (
							<Tooltip title="Critical Value">
								<span className="critical">{value}</span>
							</Tooltip>
						);
					}
					return (
						<div>
							<Card type="pure" className="vital" key={i}>
								<div className="title">{label}</div>
								<div className="units">{unitsName}</div>
								<div className="value">{value}</div>
								<div className="date">{datetime && moment(datetime).format('Llll')}</div>
							</Card>
						</div>
					);
				})}
			</Carousel> */}
		</Card>
	);
};

export default Vitals;


const CustomTab = ({ user, tracker, date}) =>  {
    const { label = '', units = {}, inputMask = '', getLastReport } = tracker;
    const { name: unitsName } = units;
    const { datetime = '', isCritical = false } = getLastReport || {};
    let { value, valueFormatted } = getLastReport || {};

    if (value) {
        value = formatTrackerValue({ measurement:tracker, value:valueFormatted });//inputMask !== '' ? VMasker.toPattern(value, inputMask) : VMasker.toNumber(value);
    } else {
        value = 'N/A';
    }
    if (isCritical) {
        value = (
            <Tooltip title="Critical Value">
                <span className="critical">{value}</span>
            </Tooltip>
        );
    }
    
    const isUp = !isCritical ? <Icon type="caret-up" theme="outlined" style={{color: '#0bd230', fontSize: '0.7em'}} /> : <Icon type="caret-down" theme="outlined" style={{color: 'red', fontSize: '0.7em'}} />;
    return <Card type="pure" bordered={false} className={"vital "+ (isCritical ? 'vital-critical' : '')}>
        <div className="icon"><TrackerReportModalButton measurement={tracker} date={date} user={user} label={<Tooltip title={'Report '+label}><Icon type="plus-circle" theme="outlined" /></Tooltip>} />{/*<Icon type="reconciliation" theme="outlined" />*/}</div>
        <div className="title">{isCritical && <Badge status="error" />}{label}</div>
			<div className="value">{value} {value !== 'N/A' && <span className="units">{unitsName}</span>} {isUp}</div>
        <div className="date">{datetime && moment(datetime).format('l')}</div>
    </Card>
};