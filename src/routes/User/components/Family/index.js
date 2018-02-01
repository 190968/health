/**
 * Created by Pavel on 08.01.2018.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'

import { Form,  List,Avatar, Card } from 'antd';
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from './family.json';
class Family extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const  {info,loading} = this.props;



        if (loading) {
            return  <Card loading title={<FormattedMessage id="user.family.family.title" defaultMessage="My Family" description="MY FAMILY" />}>
                Loading</Card>;
        }
        const  {family} = info;
        const {intl}=this.props;
        const  {edges,totalCount} = family;
        let Item = [];
        return edges.length > 0 ?
        ( <Card title={intl.formatMessage(messages.myFamily)}>
            <List
                split={false}
                loading={loading}
                grid={{gutter: 10, xs: 3, md: 1, lg: 2/*, xl: 4*/}}
                dataSource={edges}
                renderItem={person => (

                    <List.Item key={person.id}>
                        {
                            person.user.firstName ?
                                <Link to={'/u/' + person.id} style={{color: 'inherit'}}>
                                    <Avatar /*size="large"*/ style={{
                                        verticalAlign: 'middle',
                                        backgroundColor: person.user.color
                                    }}>{person.user.firstName[0]}</Avatar>
                                    <span
                                        style={{textAlign: 'center', 'marginLeft': 10}}>{person.user.firstName}</span>
                                </Link> :
                                <div>
                                    <span><Avatar style={{verticalAlign: 'middle'}}>N</Avatar> </span>
                                    <label>{intl.formatMessage(messages.noName)}</label>
                                </div>
                        }

                    </List.Item>
                )}
            />
        </Card>) : null;

    }
}

const WrappedFamily = Form.create()(Family);
export default injectIntl(WrappedFamily);