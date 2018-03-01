/**
 * Created by Pavel on 08.01.2018.
 */
import React from 'react';
import { Link } from 'react-router-dom'
import AvatarWithName from '../AvatarWithName/index';
import { Form,  List, Card } from 'antd';
import {
    injectIntl,
    FormattedMessage
} from 'react-intl';
import messages from './messages';
class Family extends React.Component {



    render() {

        const  {info,loading} = this.props;



        if (loading) {
            return  <Card loading title={<FormattedMessage id="user.family.family.title" defaultMessage="My Family" description="MY FAMILY" />}>
                Loading</Card>;
        }
        const  {family} = info;
        const {intl}=this.props;
        const  {edges} = family;

        return edges.length > 0 ?
        ( <Card title={intl.formatMessage(messages.myFamily)+" ("+this.props.info.family.totalCount+")"}>
            <List
                split={false}
                loading={loading}
                grid={{gutter: 10, xs: 3, md: 1, lg: 2/*, xl: 4*/}}
                dataSource={edges}
                renderItem={person => (

                    <List.Item key={person.id}>
                        <Link to={'/u/'+person.id} style={{color: 'inherit'}}>
                            <AvatarWithName info={person.user} />
                        </Link>

                    </List.Item>
                )}
            />
        </Card>) : null;

    }
}

const WrappedFamily = Form.create()(Family);
export default injectIntl(WrappedFamily);