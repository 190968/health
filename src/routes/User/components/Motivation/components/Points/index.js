/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Progress , Icon,Card } from 'antd';
import ModalPointsHistory from './containers/ModalPointsHistory'
class Points extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }
    showModal = () => {
        this.setState({visible: true});
    }
    handleCancel = () => {
        this.setState({ visible: false});
    }
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return  <Card loading >
                Loading</Card>;
        }
        const {points,nextLevel} = info.currentLevel;
        const {amount,title} = nextLevel;
        let remainingPoint = amount-points;
        const percent = Math.round(points/amount*100);
        return  (
            <Card title="My Points">


                { this.state.visible && <ModalPointsHistory handleCancel={this.handleCancel} />}


                <center>
                <Icon type="star" style={{ fontSize: 40, color: '#FFFF00' }} onClick={this.showModal} />
                    <Progress percent={percent} />
                </center>
               <center><span><h2>{points}</h2></span></center>
                <center><span>{remainingPoint} points to next {title} level</span></center>
            </Card>

        );
    }
}
export default Points;