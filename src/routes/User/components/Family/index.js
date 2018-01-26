/**
 * Created by Pavel on 08.01.2018.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import {
    FormattedMessage,
} from 'react-intl';

import { Form,  List,Avatar, Card } from 'antd';

class Family extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const  {info,loading} = this.props;



        if (loading) {
            return  <Card loading title={<FormattedMessage id="user.family.family.title" defaultMessage="MY FAMILY" description="MY FAMILY" />}>
                Loading</Card>;
        }
        const  {family} = info;
        const  {edges,totalCount} = family;
        let Item = [];
        family ?
        Item.push( <Card title={<FormattedMessage id="user.family.family.title" defaultMessage="MY FAMILY"
                                                  description="MY FAMILY"/>}>
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
                                    <label>No name</label>
                                </div>
                        }

                    </List.Item>
                )}
            />
        </Card>) : Item.push(  <Card title={<FormattedMessage id="user.family.family.title1" defaultMessage="MY FAMILY"
                                                              description="MY FAMILY"/>}><center> <p>No Family</p></center></Card>)

        return (

            Item


        );
    }
}

const WrappedFamily = Form.create()(Family);
export default WrappedFamily;