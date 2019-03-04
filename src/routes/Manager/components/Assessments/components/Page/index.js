import React from 'react';
import {Layout, Card} from 'antd';
import AssessementView from '../../containers/AssessmentView';
import LayoutHeader from '../../../../../../layouts/components/Header';
import LoadingPage from '../../../../../../components/LoadingPage';
import { LoadingBox } from '../../../../../../components/Loading';
import { formatDateToday, getSQLDateToday } from '../../../../../../components/Other/utils';

const {Header, Content, Footer} = Layout;

const AssessmentPageLayout = props => {
    const {location, loading, userAssessment} = props;
    console.log(props);
    if (loading) {
        return <LoadingBox />
    }
    const {user, startDate, assessment, getLatestReport} = userAssessment;
    const {name} = assessment || {};
    const {date=getSQLDateToday()} = getLatestReport || {};
    return <>
        <div style={{height:'100%', display: 'flex',
                'minHeight': '100vh',
                'flexDirection':'column'}}>

                <Header style={{background:'#fff'}}>
                    <LayoutHeader location={location} patientLayout  />
                </Header>
                <Content className={'userside'}>
                    <div style={{margin:'auto'}}>
                        
                        <AssessementView {...props} user={user} date={date} asPage />
                    </div>
                </Content>
                {/* <Footer>
                    <PatientFooter />
                </Footer> */}
            </div>
    </>
}

export default AssessmentPageLayout;