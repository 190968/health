/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Layout, Avatar,Icon,Col,Card,Progress } from 'antd';
const { Content, Sider } = Layout;
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};
class ViewProfile extends React.Component {
    render() {

        const{info,loading}=this.props;
        if (loading) {
            return  <Card loading > </Card>;
        }
        //console.log(info);
        const {points,nextLevel} = info.motivation.currentLevel;
        //const {medications} = info.motivation.adherenceSummary;
        //console.log(info.motivation.adherenceSummary);
        //const {level} = medications;
        const level = 0;

        const {amount,title} = nextLevel;
        let remainingPoint = amount-points;
        const percent = Math.round(points/amount*100);
        return  (
        <Layout>
            <Content style={{marginLeft:50,marginRight:10}}>
                    <Card style={{marginBottom:15}}>
                        <Col span={8}>
                            <center>
                            <Avatar style={{width:100,height:100,borderRadius:50}} />

                            <p>{info.fullName}</p>
                                </center>
                        </Col>
                        <Col span={8}>
                            <center>
                                <Icon type="star" style={{ fontSize: 40, color: '#FFFF00' }} />
                                <Progress percent={percent} />
                            </center>
                            <center><span><h2>{points}</h2></span></center>
                            <center><span>{remainingPoint} Total Point</span></center>

                        </Col>
                        <Col span={8}>
                            <center>
                                <Progress type="dashboard" percent={level} />
                            </center>
                        </Col>
                </Card>
                <Card title={"ACTIONPLANS YOU MOTIVATE "+info.fullName} style={{marginBottom:15}} >
sv
                </Card>
                <Card title={"COMMUNICATION WITH "+info.fullName} style={{marginRight:10,marginBottom:15}} >
sdvs
                </Card>
            </Content>
            <Sider>

                <Card title={"MY PROMISES"} style={{marginBottom:15}} >
                    sv
                </Card>
                <Card title={"COMMITMENTS"} style={{marginBottom:15}}>
                    sv
                </Card>
            </Sider>

</Layout>
        );
    }
}
export default ViewProfile;