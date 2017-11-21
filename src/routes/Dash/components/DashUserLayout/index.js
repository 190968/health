import React from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { Box, BoxHeader, BoxHeaderSettings, BoxBody } from '../../../../components/Box';
import PropTypes from 'prop-types';

import ReactPlaceholder from 'react-placeholder';
import PersonalPlansList from 'routes/Plan/containers/PersonalPlansList';
import DashTodo from './containers/todo';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'



export class DashUserLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }
    static propTypes = {
        user_id: PropTypes.number,
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    render () {
        const {
            plans, loading,loadMoreEntries
        } = this.props;
        if ( loading) {
            //return (<div>Loading...</div>);
            return (
                <div className='box'>
                    <div className="box__header"><h3>ActionPlans</h3></div>
                    <div className="box__body">
                        <Row>
                            <ReactPlaceholder ready={!loading} rows={3} showLoadingAnimation  >
                                loading...
                            </ReactPlaceholder>
                        </Row>
                    </div>
                </div>
            );
        }

        return (
            <Container>
                <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
                    <h4 className="alert-heading">WELCOME TO YOUR PERSONAL HEALTH DASHBOARD!</h4>
                    <p>
                        To start reaching your health goals, visit the Planstore to get an ActionPlan or add medications or trackers.
                    </p>
                </Alert>
                <Row>

                    <Col xs="12"   md="8" lg="9">

                        <PersonalPlansList>
                            <BoxHeaderSettings>
                                some settings
                            </BoxHeaderSettings>
                            <h3>Today's Actionplans</h3>
                        </PersonalPlansList>


                        <Box>
                            <BoxHeader>
                                <BoxHeaderSettings>
                                    sddd
                                </BoxHeaderSettings>
                                <h3>Today's Medications</h3>
                            </BoxHeader>
                            <BoxBody>

                            </BoxBody>
                        </Box>

                        <Box>
                            <BoxHeader>
                                <BoxHeaderSettings>
                                    sddd
                                </BoxHeaderSettings>
                                <h3>Today's Trackers</h3>
                            </BoxHeader>
                            <BoxBody>

                            </BoxBody>
                        </Box>


                    </Col>
                    <Col xs="12" md="4" lg="3">
                        <Box>
                            <BoxHeader>
                                <h3>Todo</h3>
                            </BoxHeader>
                            <BoxBody>
                                <DashTodo></DashTodo>
                            </BoxBody>
                        </Box>
                        <Box>
                            <BoxHeader>
                                <h3>Calendar</h3>
                            </BoxHeader>
                            <BoxBody>
                            </BoxBody>
                        </Box>
                        <Box>
                            <BoxHeader>
                                <h3>Care Team</h3>
                            </BoxHeader>
                            <BoxBody>
                            </BoxBody>
                        </Box>
                        <Box>
                            <BoxHeader>
                                <h3>Family</h3>
                            </BoxHeader>
                            <BoxBody>
                            </BoxBody>
                        </Box>
                        <Box>
                            <BoxHeader>
                                <h3>Motivators</h3>
                            </BoxHeader>
                            <BoxBody>
                            </BoxBody>
                        </Box>



                    </Col>
                </Row>
            </Container>);
    }
}

export default DashUserLayout;


