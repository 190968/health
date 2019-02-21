/**
 * Created by Pavel on 08.01.2018.
 */
import React from 'react';
import AvatarWithName from '../AvatarWithName/index';
import { Form,  List, Card } from 'antd';
import {
    FormattedMessage,
} from 'react-intl';
import messages from './i18n/en';
import { ListWithMessage } from '../../../../components/UI/List';

const Family = props => {
    const {members=[],loading, totalCount=0 } = props;
    
    return <Card loading={loading} title={<FormattedMessage values={{isSelf:true, count:totalCount}} {...messages.myFamily} />}>
        <ListWithMessage
            emptyMessage={<FormattedMessage values={{isSelf:true, count:totalCount}} {...messages.noFamily} />}
            split={false}
            loading={loading}
            grid={{gutter: 10, xs: 3, md: 1, lg: 2/*, xl: 4*/}}
            dataSource={members}
            renderItem={person => (
                <List.Item key={person.id}>
                    <AvatarWithName user={person.user} truncate role={'family'} />
                </List.Item>
            )}
        />
    </Card>;
}

export default Family;