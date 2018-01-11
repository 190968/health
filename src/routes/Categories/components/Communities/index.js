/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'
import { Carousel,Form,Card,List,Row,Col ,Avatar } from 'antd';
import { withApollo, gql } from 'react-apollo'


class CommunitiesForm extends React.Component{

    constructor(props){
        super(props);
        //console.log(props);
        this.state = {displayedFamily: props};
    }

    render(){
        const {info,loading} = this.props;
        if (loading) {
            return (
                <p>Loading!!!</p>
            );
        }
        const {discussions} = info;
        console.log(info);


        return(
            <Card
                title="COMMUNITY DISCUSSIONS"
            >
                <Row>
                    <List
                        split={false}
                        loading={loading}
                        grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 1, xl: 1}}
                        dataSource={discussions}
                        renderItem={item => (
                            <List.Item key={item.id}>

                                <Col span={1}>
                                    <Avatar size="large"></Avatar>
                                </Col>
                                <Col span={10}>
                                    <h4>{item.title}</h4>
                                    <p>{item.text.substr(0, 100)}</p>
                                </Col>

                            </List.Item>
                        )}
                    />
                </Row>
            </Card>
        );
    }

}

const WrappedCommunitiesForm = Form.create()(CommunitiesForm);
export default withApollo(WrappedCommunitiesForm);
