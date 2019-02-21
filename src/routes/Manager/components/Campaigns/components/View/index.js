import React from 'react';
import {Tag} from 'antd';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import moment from 'moment';
import { StatusTag } from '../../../../../../constants/statuses';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import CampaignPopulationButton from '../Buttons/components/Population';
import { AttachmentsModules } from '../../../../../../components/FormCustomFields/containers/AttachmentsModules';
import { prepareAttachmentsFromSimpleConnection } from '../../../../../../components/FormCustomFields/components/Attachments';

const CampaignView = props => {
    const {campaign} = props;
    const {id, title,description, createdOn, executeDate, method, isExecuted, createdBy, status, subject, message,
        getCohorts, getScreenings=[], getPopulation, getAttachments} = campaign || {};
        const {totalCount} = getPopulation || {};
    const isMessage = method === 'message';
    
    let details = [
        ['Name', title],
        ['Status', <StatusTag status={status} />],
        ['Executed', executeDate && moment(executeDate).format('l')],
        ['Cohorts', getCohorts.map(cohort => <Tag key={cohort.id}>{cohort.title}</Tag>)],
        ['Screenings', (getScreenings && getScreenings.length > 0) ? getScreenings.map(screen => <Tag key={screen.id}>{screen.title}</Tag>) : null],
        ['Population',  <CampaignPopulationButton label={totalCount} campaign={campaign} />],
        // ['Progress', <Progress percent={progress} />],
        ['Created', createdOn && moment(createdOn).format('lll')],
        ['Created by', createdBy && <AvatarWithName user={createdBy} />],
    ]
    if (isMessage) {
        details.push(['Subject', subject]);
        details.push(['Message', message]);
    } else {
        details.push(['Attachments', getAttachments && getAttachments.length > 0 &&  <AttachmentsModules editable={false} value={prepareAttachmentsFromSimpleConnection(getAttachments)}  />]);
    }

    return <DescriptionList details={details}/>
}

export default CampaignView;