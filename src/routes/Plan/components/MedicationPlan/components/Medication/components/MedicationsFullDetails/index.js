import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col,Card, Spin,  Modal} from 'antd';
import MedicationChart from '../MedicationChart';
import AdverseReactions from "./containers/AdverseReactions";
import {MedicationReminders} from "../../containers/MedicationReminders";
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';
import { FormattedMessage } from 'react-intl';
import messages from '../../../../i18n/en';
import DefaultI18nEn from '../../../../../../../../i18n/en';

const Description = DescriptionList.Description;

export default class MedicationsFullDetails extends React.Component {


    static propTypes = {
        userId: PropTypes.string,
        date: PropTypes.string,

    }

    static defaultProps = {
        date: '',
    }


    render() {

        const {loading} = this.props;
        
        const {medication, date, user} = this.props;
        const {drug, summary, prescription, period, prescriber, directions, purpose, sideEffects} = medication || {};
        const {fullName} = prescriber || {};

        let details = [
            [<FormattedMessage {...messages.form} />, drug.dosage+' '+drug.form],
            [<FormattedMessage {...messages.prescription} />, <span  dangerouslySetInnerHTML={{__html: prescription}}></span>],
            [<FormattedMessage {...messages.period} />, period],
            [<FormattedMessage {...messages.prescriber} />, prescriber && <AvatarWithName user={prescriber} />],
        ]

       
        if (directions !== '') {
            details.push([<FormattedMessage {...messages.directions} />, directions]);
        }
        if (purpose !== '') {
            details.push([<FormattedMessage {...messages.purpose} />, purpose]);
        }
        if (sideEffects !== '') {
            details.push([<FormattedMessage {...messages.sideEffects} />, sideEffects]);
        }

        return (<React.Fragment>
            <Card title={<FormattedMessage {...messages.details} />} type="inner">
          
                <DescriptionList col={1} >
                    {details.map((detail, i) => {
                        return <Description term={detail[0]} key={i} excludeEmpty>{detail[1]}</Description>;
                    })}
                </DescriptionList>
 
            </Card>
            <AdverseReactions user={user} medication={medication} />
            <Card title={<FormattedMessage {...DefaultI18nEn.thisWeekSummary} />} type="inner">
                <MedicationChart date={date} data={summary} userId={user.id} width={430} useAxis={true} />
            </Card>
            <MedicationReminders medication={medication} user={user} title={<FormattedMessage {...messages.medication} />}  />
            </React.Fragment>)
    }
}