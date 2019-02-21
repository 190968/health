import React from 'react';
import { Divider, Card, Button, Icon, Tooltip } from 'antd';
import { ListWithMessage } from '../../../../components/UI/List';
import { EmptyList } from '../../../../components/Loading';
import { MedicationCard } from './containers/MedicationCard';
import { getCardHeaderDate } from '../../../../components/Card/utils';
import MedicationManagerButton from './components/Medication/components/MedicationManager/components/MedicationManagerButton';
import { CardExtraSplit } from '../../../../components/Card/components/CardExtraSplit';
import { FormattedMessage } from 'react-intl';
import messages from './i18n/en';
import MedicationPlanSettingsButton from './components/MedicationPlanSettingsButton';
import MedicationsList from './containers/List';
 
const MedicationPlan = (props) => {
	const { medicationPlan, loading, medicationType, activeLayout='table', setActiveLayout, ...otherProps } = props;
	const { date, user, currentUser, isSelf, isProfessional } = otherProps;
	const medicationPlanExists = medicationPlan || false;
	let { medications = [], canReport=false, canEdit=false } = medicationPlan || {};
	const medicationsLength = medications.length;
	let extra = '';
	let canAdd = isSelf && !isProfessional || (medicationPlanExists && canEdit) || (!medicationPlanExists && isProfessional);//canEdit;

	extra = (
		<React.Fragment>
		
			<CardExtraSplit>
				{activeLayout === 'table' ? <Tooltip title={'Show List'}><Button icon="bars" size={'small'} onClick={() => setActiveLayout('list')} /></Tooltip> : <Tooltip title={'Show Table'}><Button icon="table" size={'small'}  onClick={() => setActiveLayout('table')}  /></Tooltip>}
			</CardExtraSplit>
			
			{medicationPlanExists && <CardExtraSplit>
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
				<MedicationPlanSettingsButton user={user} date={date} medicationPlan={medicationPlan} currentUser={currentUser} />
			</CardExtraSplit>
			{canAdd && <CardExtraSplit>
				<MedicationManagerButton user={user} date={date} medicationPlan={medicationPlan} />
			</CardExtraSplit>}
		</React.Fragment>
	);
	return (
		<Card type={'blueish'} className={'tour-meds'} title={<FormattedMessage values={{isSelf, name:user.firstName , title:getCardHeaderDate(date, <FormattedMessage  {...messages.meds} />)}} {...messages.myMeds} />} loading={loading} extra={extra}>
			{medicationsLength === 0 && <EmptyList><FormattedMessage  {...messages.noMeds} /></EmptyList> }
			<MedicationsList {...props} layout={activeLayout} />
		</Card>
	);
};

export default MedicationPlan;
