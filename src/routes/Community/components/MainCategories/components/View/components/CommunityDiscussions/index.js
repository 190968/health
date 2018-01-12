/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'
import { Icon,Form,Card,List,Row,Col ,Avatar } from 'antd';
import { withApollo, gql } from 'react-apollo'

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class CommunityDiscussionsForm extends React.Component{

    constructor(props){
        super(props);
        //console.log(props);
        this.state = {displayedFamily: props};
    }

    render(){
        const {loading} = this.props;
        if (loading) {
            return (
                <p>Loading!!!</p>
            );
        }
        const {name,discussions} = this.props;
        //console.log(this.props);


        return(
            <Card
                title={name.toUpperCase()+" COMMUNITY DISCUSSIONS"}
            >
                <Row>
                    <List
                        loading={loading}
                        itemLayout="vertical"
                        dataSource={discussions}
                        renderItem={item => (
                            <List.Item key={item.id}
                                       actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}

                            >

                                <List.Item.Meta
                                    avatar={<Avatar size="large"></Avatar>}
                                    title={item.title}
                                    description={item.text.substr(0, 100)}
                                />
                            </List.Item>

                        )}
                    />
                </Row>
            </Card>
        );
    }

}

const WrappedCommunityDiscussionsForm = Form.create()(CommunityDiscussionsForm);
export default withApollo(WrappedCommunityDiscussionsForm);
