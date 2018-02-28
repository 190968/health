/**
 * Created by Pavel on 08.01.2018.
 */
import React from 'react';
import {  Link } from 'react-router-dom'
import {
    injectIntl
} from 'react-intl';
import AvatarWithName from '../AvatarWithName/index';
import messages from './messages';
import {Form,List, Card } from 'antd';
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
        const  {edges} = careTeam;
        return edges.length > 0 ?
            ( <Card title={title}>
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 3,   md: 1, lg: 2/*, xl: 4*/}}
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

const WrappedCareTeam = Form.create()(CareTeam);
export default injectIntl(WrappedCareTeam);