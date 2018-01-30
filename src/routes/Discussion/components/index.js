import React, { PropTypes } from 'react';
import { Form,Card,Row,Col,Button,Input,List,Icon,Avatar } from 'antd';
import { withApollo, gql } from 'react-apollo'
import {withRouter} from "react-router-dom";
const FormItem = Form.Item;
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};
class Discussions extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const {loading,discussion} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }

        const {title,text,createdAt,category,replies} = discussion;
        const {edges} = replies;
        const {isJoined} = category;
console.log(isJoined);
      //  let mass =[];

            {/*edges.forEach((item)=>{*/}
               {/*mass.push(*/}
                   {/*<div>*/}
                   {/*<Row>*/}
                       {/*<Col span={2}>*/}
                           {/*<Avatar  style={{ verticalAlign: 'middle' }}>P</Avatar>*/}
            //            </Col>
            //            <Col style={{ 'border-radius': "10px", border:"1px solid #c7ebfb" ,background:'#eef9fe'}} span={15}>
            //                <p>{item.text}</p>
            //                <h5>{item.createdAt.slice(0,10)}</h5>
            //            </Col>
            //        </Row>
            //        <br/>
            //            </div>
            //    )
            // })

        return(
            <div>

                <Card
                    title={title}
                >
                    <Row>
                          <p>{text}</p>
                        </Row>
                    <Row>

                    <Avatar style={{ verticalAlign: 'middle' }}>N</Avatar> <label>{createdAt.slice(0,10)}</label>

                        </Row>
                </Card><br/>
                <Card
                title={
                    <Row>
                        <Col span={2}>
                            <Avatar  style={{ verticalAlign: 'middle' }}>N</Avatar>
                        </Col>
                        <Col span={19}>
                            <Input
                                suffix={<Icon type="paper-clip" />}
                            />
                        </Col>
                        <Col offset={1} span={2}>
                            {
                                isJoined ? <Button  type="primary">Post</Button>:<Button disabled type="primary">Post</Button>
                            }
                        </Col>
                    </Row>
                }
                >
                    <Row>
                        <List
                            loading={loading}
                            itemLayout="vertical"
                            dataSource={edges}
                            renderItem={item => (
                                <List.Item key={item.id}
                                           actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}

                                >

                                    <List.Item.Meta
                                        avatar={<Avatar size="large"></Avatar>}
                                        description={item.text}
                                    />
                                </List.Item>

                            )}
                        />
                    </Row>
                </Card>
            </div>
        );
    }

}

const WrappedDiscussions = Form.create()(Discussions);
export default withApollo(withRouter(WrappedDiscussions));
