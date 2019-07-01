import React from 'react';
import { Button, Card, Avatar, Row, Col, Progress, Tag, Icon, Badge } from 'antd';
import {MedicationCardFull} from '../../containers/MedicationCardFull';
import moment from 'moment';
import './index.less';
import MedicationCoins from './components/MedicationCoins';
import { MedicationTakeButton } from '../../containers/MedicationTakeButton';
import MedicationVideoButton from '../Medication/components/MedicationVideo/components/MedicationVideoButton';
import { FormattedMessage } from 'react-intl';
import {MedsI18nEn as messages} from '../../i18n/en';


export const getMedicationTotalPills = ({medication}) => {
    let total = 0;
    const { medicationType:type, timesPerDay, quantity, timesPerHour } = medication || {};
    switch(type) {
        case 'at_times':
        return timesPerHour.length;
        timesPerHour.map(timePerHour => {
            total += timePerHour.quantity;
            return null;
        })
        break;
        default:
            return timesPerDay;
            //*quantity;
            //return timesPerDay*quantity;
        break;
    }
    return total;
}

export const getMedicationReportedPills = ({medication}) => {
    let total = 0;
    const { reports=[] } = medication || {};
    if (reports && reports.length > 0) {
        const takenReports = reports.filter(report => report.isTaken);
        //console.log(takenReports);
        total = takenReports.length;
    }
    return total;
}
export const getMedicationQuantity = ({medication}) => {
    let total = 0;
    const { meedicationType:type, timesPerDay, quantity, timesPerHour } = medication || {};
    switch(type) {
        case 'at_times':
        if (timesPerHour && timesPerHour.length > 0) {
            total = timesPerHour[0].quantity;
        }
        break;
        default:
            total = quantity;
        break;
    }
    return total;
}

export const getMedicationPrescription = ({medication}) => {
    let prescription = 'Take ';
    const { medicationType, drug, timesPerDay, quantity, timesPerHour=[] } = medication || {};
    const { name, dosage, form } = drug || {};
    switch(medicationType) {
        case 'at_times':
        // if (timesPerHour && timesPerHour.length > 0) {
        //     total = timesPerHour[0].quantity;
        // }
        prescription = <FormattedMessage values={{times:timesPerHour.length}} {...messages.takeTimesHours} />;
        break;
        default:
            prescription = <FormattedMessage values={{quantity, dosage, timesPerDay}} {...messages.takeTimesDaily} />;
        break;
    }
    return prescription;
}

const MedicationCard = (props) => {
    const {showModal, toggleModal, i, ...otherProps} = props;
    
	const { user, date, medication, reports, medicationPlan } = otherProps;
    const { drug, image } = medication || {};
    const { name, dosage, form } = drug;
    const reportedNum = getMedicationReportedPills({medication});
    const total = getMedicationTotalPills({medication});
    const quantity = getMedicationQuantity({medication});
    const prescription = getMedicationPrescription({medication});
    const reported = reportedNum*quantity;
    //const prescription = 'Take '+total+' pills';
    const progress = Math.round(reported/total*100);
    const isReported = progress===100;//reports && i<reports.length;
    // get latest report date
    const reportedTimes = reports && reports.map(report => report.reportedOn);
    let lastReported = false;
    //console.log(reportedTimes);
    if (reportedTimes && reportedTimes.length > 0) {
        lastReported  = Math.max( ...reportedTimes );
        lastReported = moment(lastReported).format('LT');
    }
    
	return (<React.Fragment>
        {showModal && <MedicationCardFull {...otherProps} onHide={toggleModal} />}
		<Card hoverable type={'medCard'} onClick={toggleModal} className={isReported ? 'medCardReported' : ''} >
            <div style={{position:'relative', padding:5}}>
					<div className={'title'}><div style={{float: 'right'}}><MedicationVideoButton drug={drug} /></div> {name}</div>
                    <div>
                        {image && <div className={'picture'} >
                        <Avatar shape="square" icon="camera" src={image} />
                        </div>}
                        <div className={'main'}>
					        <div className={'dosage'}>{prescription} <div>{form}</div></div>
                            <div className={'coins'}>
                                <MedicationCoins total={total} reported={reported} quantity={quantity}  />
                            </div>
                            {/* <div className={'prescription'}>{prescription} {lastReported && 'Took at '+lastReported} <span style={{'float':'right'}}><Badge showZero count={total-(reported)} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}/> Left</span></div>
                            <Progress showInfo={false}  strokeLinecap="square" percent={progress}  />    */}
                        </div>
                    </div>
                    {/* <Icon type="check-circle" theme="twoTone" style={{fontSize: '2.5em', verticalAlign:'middle'}} /> */}
                    {/* <Tag color="#f50" style={{verticalAlign:'middle', 'marginLeft':10}}>Skip</Tag> */}
                    

                    
               
                
               

                    {/* <ButtonGroup>
                    <Button disabled></Button>
                    <Button disabled>M</Button>
                    <Button disabled>R</Button>
                    </ButtonGroup> */}
            </div>
            
            <MedicationTakeButton medication={medication} medicationPlan={medicationPlan} user={user} date={date} quantity={quantity} form={form} isTaken={isReported} />
		</Card>
        </React.Fragment>
	);
};

export default MedicationCard;
