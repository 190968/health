import React from 'react';
import { List, Card, Button, Icon, Tooltip } from 'antd';
import { ListWithMessage } from '../../../../components/UI/List';
import { TrackerCard } from './containers/TrackerCard';
import { DatePicker } from '../../../../components/UI/DatePicker';
import { getCardHeaderDate } from '../../../../components/Card/utils';
import { CardExtraSplit } from '../../../../components/Card/components/CardExtraSplit';
import TrackerManagerButton from './components/TrackerManager/components/TrackerManagerButton';
import TrackerPlanSettingsButton from './components/TrackerSettingsButton';

const BiometricPlan = (props) => {
	const { biometricPlan, loading, ...otherProps } = props;
	const { date, user, currentUser, isSelf, isProfessional } = otherProps;
	const biometricPlanExists = biometricPlan || false;
	const { trackers = [], canReport=false, canEdit=false } = biometricPlan || {};
	let extra = '';
	let canAdd = isSelf && !isProfessional || (biometricPlanExists && canEdit) || (!biometricPlanExists && isProfessional);//canEdit;
	
	//console.log(trackers, 'trackers');
	extra = (<React.Fragment>
		
		
		{biometricPlanExists && <CardExtraSplit>
		<Button.Group>
			<Tooltip title={'Previous day'}>
				<Button size="small" onClick={() => props.showDate('prev')}>
					<Icon type="left" />
				</Button>
			</Tooltip>
            {/* <Tooltip title={'Select day'}>
                <DatePicker  onSelect={props.showDate}/>
			</Tooltip> */}
			<Tooltip title={'Next day'}>
				<Button size="small" onClick={() => props.showDate('next')}>
					<Icon type="right" />
				</Button>
			</Tooltip>
		</Button.Group>
		</CardExtraSplit>}
		<CardExtraSplit>
			<TrackerPlanSettingsButton user={user} canAdd={canAdd} date={date} trackerPlan={biometricPlan} currentUser={currentUser} />
		</CardExtraSplit>
		{canAdd && <CardExtraSplit>
			<TrackerManagerButton user={user} date={date} />
		</CardExtraSplit>}
		</React.Fragment>
	);
	return (
		<Card title={getCardHeaderDate(date, 'Trackers')} className={'tour-trackers'} loading={loading} extra={extra}>
			<ListWithMessage
				emptyMessage={'No Trackers'}
				grid={{ gutter: 10, xs: 1, lg: 3 }}
				dataSource={trackers}
				renderItem={(tracker, i) => {
					return (
						<List.Item key={i}>
							<TrackerCard tracker={tracker} biometricPlan={biometricPlan} date={date} user={user}/>
						</List.Item>
					);
				}}
			/>
		</Card>
	);
};


export default BiometricPlan;
