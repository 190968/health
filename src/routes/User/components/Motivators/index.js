/**
 * Created by Pavel on 08.01.2018.
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import {
    FormattedMessage,
} from 'react-intl';

import { Form,  List,Avatar, Card } from 'antd';

class Motivators extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const  {info,loading} = this.props;



        if (loading) {
            return  <Card loading title={<FormattedMessage id="user.motivators.motivators.title" defaultMessage="MY MOTIVATORS" description="MY MOTIVATORS" />}>
                                 Loading</Card>;
        }
        const  {motivators} = info;
        const  {edges,totalCount} = motivators;
        let Item = [];
        motivators ?
            Item.push(  <Card title={<FormattedMessage id="user.motivators.motivators.title" defaultMessage="MY MOTIVATORS" description="MY MOTIVATORS" />}>
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 3,   md: 1, lg: 2/*, xl: 4*/}}
                    dataSource={edges}
                    renderItem={person => (

                        <List.Item key={person.id}>
                            {
                                person.user.firstName ?
                                    <Link to={'/u/'+person.id} style={{color: 'inherit'}}>
                                        <Avatar /*size="large"*/ style={{ verticalAlign: 'middle', backgroundColor: person.user.color }}>{person.user.firstName[0]}</Avatar>
                                        <span style={{textAlign:'center','marginLeft':10}}>{person.user.firstName}</span>
                                    </Link> :
                                    <div>
                                        <span><Avatar  style={{ verticalAlign: 'middle' }}>N</Avatar> </span>
                                        <label>No name</label>
                                    </div>
                            }

                        </List.Item>
                    )}
                />
            </Card>) : Item.push(  <Card title={<FormattedMessage id="user.motivators.motivators.title" defaultMessage="MY MOTIVATORS"
                                                                  description="MY MOTIVATORS"/>}><center> <p>No Motivators</p></center></Card>)
        return (
            Item

        );
       ;
    }
}

const WrappedMotivators= Form.create()(Motivators);
export default WrappedMotivators;