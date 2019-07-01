/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import { Row, Col,Card} from 'antd';
import { withApollo} from 'react-apollo'
import {withRouter} from "react-router-dom";
import MyCommutinies from '../CommunityLayout/containers/MyCategories.js'
import MainCategories from './components/MainCategories'
 import CategoryNews from './components/CategoryNews/containers/CategoryNews'
import '../../style.css';
import Motivators from '../../../User/containers/motivatorsContainer';
//import CareTeam from '../../../User/containers/careTeamContainer';
import Family from '../../../User/containers/familyContainer';
import DiscussionsList from './components/Discussion/containers/DiscussionsList.js';
import { withActiveNetwork } from '../../../../components/App/app-context.js';
const CommunityLayout = props => {
        const {info,loading, currentNetwork} = props;
        const {networkModuleExists} = currentNetwork || {};
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }
        if (networkModuleExists('is_mcgrawhill')) {
            return <>
                <MainCategories info={info} label={'Books'} slidesToShow={6} />
                <DiscussionsList />
            </>
        }
    return <Row gutter={20}>
            <Col xs={24} md={14} lg={15} xl={17}>
                <MyCommutinies />
                <DiscussionsList />
                <MainCategories info={info} />
            </Col>
            <Col xs={24} md={10} lg={9} xl={7}>
                <CategoryNews />
                <Motivators />
                <Family  />
            </Col>
        </Row>
}
export default withActiveNetwork(withApollo(withRouter(CommunityLayout)));
