import React from 'react';
import {Badge, Timeline, Icon, Progress, Button, Card, Divider, Radio, List} from 'antd';
import MedicationTimeline from './components/MedicationTimeline';
import './index.less';
import { getMedicationReportedPills, getMedicationTotalPills, getMedicationQuantity } from '../MedicationCard';
import MedicationSettingsButton from '../Medication/components/MedicationSettingsButton';
import MedicationCoins from '../MedicationCard/components/MedicationCoins';
import { FormattedMessage } from 'react-intl';
import {MedsI18nEn as messages} from '../../i18n/en';

const MedicationCardFull = props => {
    const {medication} = props;
    const { drug} = medication || {};
    const { name =''} = drug || {};
    const reported = getMedicationReportedPills({medication});
    const total = getMedicationTotalPills({medication});
    const quantity = getMedicationQuantity({medication});
    const progress = Math.round(reported*quantity/total*100);
    //const progressText = progress === 0 ? 'Not Reported Yet' : 'You are on  '+progress+'% on Track';
    return <React.Fragment>
            <div style={{textAlign:'center'}}>
            {/* <div style={{marginBottom:10, textAlign:'right'}}>
            <Radio.Group defaultValue="today" buttonStyle="solid" size="small">
                <Radio.Button value="today">Today</Radio.Button>
                <Radio.Button value="weekly">Weekly</Radio.Button>
            </Radio.Group>
            </div> */}
              <p><FormattedMessage values={{progress}} {...messages.reported} /></p>
              <Progress type="circle" percent={progress} showInfo={progress > 0} width={100} />
              
              <div className={'prescription'} style={{marginTop: 10}}><MedicationCoins total={total} reported={reported} quantity={quantity}  /></div>
            </div>
            <Divider>{name} <MedicationSettingsButton {...props} /> </Divider>
            

            <MedicationTimeline {...props} />
  </React.Fragment>;
}

export default MedicationCardFull;