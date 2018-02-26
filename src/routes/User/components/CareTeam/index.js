/**
 * Created by Pavel on 08.01.2018.
 */
import React from 'react';
import {  Link } from 'react-router-dom'
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from './messages';
import {Form,List,Avatar, Card } from 'antd';
class CareTeam extends React.Component {



    render() {

        const  {info,loading} = this.props;



        if (loading) {
            return  <Card loading >
                Loading</Card>;
        }
        const {intl}=this.props;
        const title = intl.formatMessage(messages.myCareTeam);
        const  {careTeam} = info;
        const  {edges,totalCount} = careTeam;
        return edges.length > 0 ?
            ( <Card title={title}>
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
                                        <label>{intl.formatMessage(messages.noName)}</label>
                                    </div>
                            }

                        </List.Item>
                    )}
                />
            </Card>) : null;
    }
}

const WrappedCareTeam = Form.create()(CareTeam);
export default injectIntl(WrappedCareTeam);