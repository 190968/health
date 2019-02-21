import React from 'react';
import {Card, List} from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './i18n/en';
import { ListWithMessage } from '../../../../components/UI/List';
import UserReferralCard from './components/UserReferralCard';

const UserReferrals = props => {
    const {programs, total=0, user, loading=false} = props;
    return(
        <Card loading={loading} type={'list'} title={<FormattedMessage values={{isSelf:true, count:total}} {...messages.myReferrals} />}>
                 <ListWithMessage
                    emptyMessage={<FormattedMessage values={{isSelf:true, count:total}} {...messages.noReferrals} />}
                    // split={false}
                    loading={loading}
                    //grid={{gutter: 10, xs: 3,   md: 1, lg: 2/*, xl: 4*/}}
                    dataSource={programs}
                    renderItem={userProgram => (
                        <List.Item key={userProgram.id}>
                            <UserReferralCard userProgram={userProgram} user={user} />
                        </List.Item>
                    )}
                     />
        </Card>
    )
}

export default UserReferrals;