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

class CareTeamForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const  {info,loading} = this.props;



        if (loading) {
            return  '<div>Loading</div>';
        }
        const  {careTeam} = info;
        const  {edges,totalCount} = careTeam;
      //  console.log(edges,"------------",totalCount);
        return (
            <Card title={<FormattedMessage id="user.careteam.careteam.title" defaultMessage="MY CARE TEAM" description="MY CARE TEAM" />}>
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4}}
                    dataSource={edges}
                    renderItem={people => (
                        <List.Item key={people.id}>
                            <div>
                                <span><Avatar size="large" style={{ verticalAlign: 'middle' }}>{people.user.first_name[0]}</Avatar> </span>
                                <label>{people.user.first_name}</label>
                            </div>
                        </List.Item>
                    )}
                />
            </Card>

        );
    }
}

const WrappedCareTeam = Form.create()(CareTeamForm);
export default WrappedCareTeam;