import React from 'react';
import DescriptionList from '../../../../../../components/Layout/DescriptionList';
import moment from 'moment';
import { StatusTag } from '../../../../../../constants/statuses';
import { Progress, Tag } from 'antd';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import { prepareAttachmentsFromSimpleConnection } from '../../../../../../components/FormCustomFields/components/Attachments';
import { AttachmentsModules } from '../../../../../../components/FormCustomFields/containers/AttachmentsModules';

const ScreeningView = props => {
    const {screening} = props;
    const {id, title, status, executeDate, progress, createdOn, createdBy, getPopulation, getCohorts, getAttachments } = screening || {};
    const {totalCount} = getPopulation || {};
    let details = [
        ['Name', title],
        ['Status', <StatusTag status={status} />],
        ['Cohorts', getCohorts && getCohorts.map(cohort => <Tag key={cohort.id}>{cohort.title}</Tag>)],
        ['Executed', executeDate && moment(executeDate).format('l')],
        ['Progress', <Progress percent={progress} />],
        ['Population',  totalCount],
        ['Created', createdOn && moment(createdOn).format('lll')],
        ['Created by', createdBy && <AvatarWithName user={createdBy} />],
    ]
    details.push(['Assessments', getAttachments && getAttachments.length > 0 &&  <AttachmentsModules editable={false} value={prepareAttachmentsFromSimpleConnection(getAttachments)}  />]);
    
    return <DescriptionList details={details}/>
}

export default ScreeningView;