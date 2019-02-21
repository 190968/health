import React from 'react';
import {Popconfirm, Icon} from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from '../../i18n/en';

const MedicationTakeButton = props => {
    const {loading, medicationPlan, canUntake=false, isTaken=false, quantity, form, takeMedication, order} = props;
    const { canReport=false} = medicationPlan || {};
    if (loading) {
        return <div className={'takeBt'}><Icon type="loading" theme="outlined" /></div>;
    }

    if (!canReport) {
        return null;
    }
     
    if (canUntake) {
        return <div className={'takeBt untake'} ><FormattedMessage {...messages.untake} /></div>;
    }
    // for sope time make a button as untake, then bring back take button. 5 minutes.
    if (isTaken) {
        if (!order && order !== 0) {
            return <div className={'takeBt completed'}><FormattedMessage {...messages.completed} /></div>;
        }
        return <Popconfirm title={<FormattedMessage {...messages.untakeConfirm} />} onConfirm={takeMedication}  okText={<FormattedMessage id="yes" defaultMessage={'Yes'} />} cancelText={<FormattedMessage id="no" defaultMessage={'No'} />}>
        <div className={'takeBt'}><FormattedMessage values={{isTaken, quantity, form}} {...messages.takeButton} /></div>
        </Popconfirm>;
    } else {
        
        return <div className={'takeBt'} onClick={takeMedication}><FormattedMessage values={{isTaken, quantity, form}} {...messages.takeButton} /></div>;
    }
}

export default MedicationTakeButton;