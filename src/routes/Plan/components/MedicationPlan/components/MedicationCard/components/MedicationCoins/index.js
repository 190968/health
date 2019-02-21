import React from 'react';
import {Tooltip} from 'antd';
import './index.less';
import {MedsI18nEn as messages} from '../../../../i18n/en';
import { FormattedMessage } from 'react-intl';

const MedicationCoins = props => {
    const {total, reported} = props;

    const progress = Math.round(reported/total*100);
    let coins = [];
    for (let i=0;i<total; i++) {
        const isReported = i<reported;
        coins.push(<span key={i} className={'medCircle ' + (isReported ? 'reported' : '')}></span>);
    }
    return <div className={'clearfix'}>
        <Tooltip title={ <FormattedMessage values={{reported, total, progress}} {...messages.reported} />}>{coins}</Tooltip>
    </div>
} 

export default MedicationCoins;