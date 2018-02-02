/**
 * Created by Pavel on 11.01.2018.
 */
/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Tooltip,Form,Card,List,Row} from 'antd';
import { withApollo, gql } from 'react-apollo'
import { Link } from 'react-router-dom'
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import messages from './listCommunity.json';
class ListCommunity extends React.Component{

    constructor(props){
        super(props);

    }

    render(){
        const {loading} = this.props;
        if (loading) {
            return (
                <Card loading  title="Main Categories">Loading!!!</Card>
            );
        }
        const { intl } = this.props;
        const {name,categories} = this.props;


        return(
            <Card
                title={name.toUpperCase()+intl.formatMessage(messages.communities)}
            >
                <Row>
                    <List
                        split={false}
                        loading={loading}
                        grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 5, xl: 5}}
                        dataSource={categories}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Link  to={"/community/"+item.id}>
                                    <Card
                                        cover={<img alt={item.name} height={120} src={item.thumb.large}/>}
                                    >
                                        <Tooltip title={item.name}>{item.name.substring(0, 10)}</Tooltip></Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                </Row>
            </Card>
        );
    }
}

const WrappedListCommunity = Form.create()(ListCommunity);
export default withApollo(injectIntl(WrappedListCommunity));
