/**
 * Created by Pavel on 08.01.2018.
 */
import React, { PropTypes } from 'react';
import { Redirect, Link } from 'react-router-dom'
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';

import {Modal, Form, Icon, List,Avatar, Button, Card } from 'antd';

class MotivatorsForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const  {info,loading} = this.props;



        if (loading) {
            return  '<div>Loading</div>';
        }
        const  {motivators} = info;
        const  {edges,totalCount} = motivators;

        return (
                <Card title={<FormattedMessage id="user.motivators.motivators.title" defaultMessage="MY MOTIVATORS" description="MY MOTIVATORS" />}>
                    <List
                        split={false}
                        loading={loading}
                        grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4}}
                        dataSource={edges}
                        renderItem={people => (

                            <List.Item key={people.id}>
                                {
                                    people.user.first_name ?
                                        <div>
                                        <span><Avatar size="large" style={{ verticalAlign: 'middle' }}>{people.user.first_name[0]}</Avatar> </span>
                                        <label>{people.user.first_name}</label>
                                    </div> :
                                    <div>
                                        <span><Avatar size="large" style={{ verticalAlign: 'middle' }}>N</Avatar> </span>
                                        <label>No name</label>
                                    </div>
                                }

                            </List.Item>
                        )}
                    />
                </Card>

        );
    }
}

const WrappedMotivatorsForm = Form.create()(MotivatorsForm);
export default WrappedMotivatorsForm;