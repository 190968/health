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
class CommunityLayout extends React.Component{
    render(){
        const {info,loading, user_id} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
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
}
export default withApollo(withRouter(CommunityLayout));
