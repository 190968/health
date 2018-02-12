/**
 * Created by Павел on 10.02.2018.
 */
import React, { PropTypes } from 'react';
import Medications from './components/Medications'
import Actionplans from './components/Actionplans'
import Trackers from './components/Trackers'
import Badges from './containers/Badges.js'
import Motivators from '../../containers/motivatorsContainer';
import Points from './containers/Points.js';
import Promises from './containers/Promises.js';
import {Row,Col,Card} from 'antd';
class Motivation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const  {info,loading} = this.props;

        if (loading) {
            return  <Card loading >
                Loading</Card>;
        }
const{adherenceSummary} = info;
        const {medications,trackers,plans} = adherenceSummary;
        return  (
            <React.Fragment>
            <Row gutter={8}>
                {medications && <Col offset={2} xs={24} md={10} lg={9} xl={6}>
                    <Medications medications={medications} />

                </Col>}
                {trackers && <Col offset={2} xs={24} md={10} lg={9} xl={6}>
                    <Trackers trackers={trackers} />

                </Col>}
                {plans && <Col offset={2} xs={24} md={10} lg={9} xl={6}>
                    <Actionplans plans={plans} />

                </Col>}
            </Row>
            <Row gutter={8}>
                 <Col offset={2} xs={24} md={10} lg={9} xl={6}>
                    <Badges />

                </Col>
                <Col offset={2} xs={24} md={10} lg={9} xl={6}>
                    <Motivators />

                </Col>
                <Col offset={2} xs={24} md={10} lg={9} xl={6}>
                    <Points />
                </Col>
                <Col offset={2} xs={24} md={10} lg={9} xl={6}>
                    <Promises />

                </Col>
            </Row>
            </React.Fragment>
            );
    }
}
export default Motivation;