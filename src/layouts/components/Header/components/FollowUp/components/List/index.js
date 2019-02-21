import React from 'react';
import {List, Button, Icon, Tooltip, Card} from 'antd';
import { ListWithMessage } from '../../../../../../../components/UI/List';
import FollowUpButton from '../../../../../../../routes/Manager/components/Profile/components/Visits/containers/FollowUpButton';
import { FollowUpSnooze } from '../../containers/Snooze';
import { FollowUpAcceptButton } from '../../containers/Accept';
import moment from 'moment';
import AvatarWithName from '../../../../../../../routes/User/components/AvatarWithName';
const ButtonGroup = Button.Group;
const FollowUpsList = props => {
    const {showModal, toggleModal, followUps=[], loading, ...otherProps} = props;
    const followUpsLength = followUps.length;
    const {refetch} = props;

    let dataSource = followUps.sort(function(a,b) {
        return b.isAccepted - a.isAccepted;
    });
    dataSource = dataSource.sort(function(a,b) {
        return moment(a.dateTime) - moment(b.dateTime);
    });
    // console.log(followUps);
    return <Card title={'Follow Ups'+(followUpsLength > 0 ? ' ('+followUpsLength+')' : '')} type={'pure'} size={'small'} bordered={false} style={{minWidth:'300px'}} extra={<>
    <Tooltip title={'Refresh'}><Icon type="sync" onClick={() => props.refetch()} style={{marginRight:5}} /></Tooltip> <FollowUpButton size={'small'} icon="plus" refetch={props.refetch} /></>}>
    <ListWithMessage
    emptyMessage={'No Follow ups'}
    itemLayout="horizontal"
    size={'small'}
    dataSource={dataSource}
    loading={loading}
    renderItem={item => {
        const {title, dateTime, user, isAccepted=false} = item;
        const dateTimeObj = moment(dateTime);
        const isPast = dateTimeObj < moment().startOf('day');
      return <List.Item actions={[<ButtonGroup>
          <FollowUpAcceptButton followUp={item} refetch={refetch} />
          <FollowUpSnooze followUp={item} refetch={refetch} />
      </ButtonGroup>/*,<FollowUpAcceptButton followUp={item} refetch={refetch} />, <FollowUpSnooze followUp={item} refetch={refetch} />*/]}>
        <List.Item.Meta
          title={<>{isPast && !isAccepted && <Icon type="exclamation-circle" style={{color:'red'}} />} {title} with {user.firstName}</>}
          description={dateTime && dateTimeObj.format('lll')}
        />
      </List.Item>
    }}
    />
</Card>
}

export default FollowUpsList;