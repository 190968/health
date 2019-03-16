import React from 'react';
import {Layout, Menu, Skeleton} from 'antd';
import {NavLink, Route} from 'react-router-dom';
import LayoutHeader from '../../../../../../layouts/components/Header';
import LoadingPage from '../../../../../../components/LoadingPage';
import { LoadingPageSpinner, LoadingBox } from '../../../../../../components/Loading';
import { formatDateToday, getSQLDateToday } from '../../../../../../components/Other/utils';
import { AssessementManager } from '../../../Assessments/containers/AssessmentManager';
import './index.less';
const {Header, Content, Sider, Footer} = Layout;


export const BuilderSkeleton = props => {

    return <Layout className={'builderSkeleton'}>
        <Sider style={{
        // overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}
        collapsible
        breakpoint="lg"
        >
                <div className="logo" style={{padding: '19px 10px', color:'#fff',  'fontSize': '1.2em'}}>
                    <Skeleton paragraph={false} active/>
                </div>
                    <Skeleton title={false} paragraph={{rows:5}} />
        </Sider>
        <Layout>
            <div style={{height:'100%', display: 'flex',
                    'minHeight': '100vh',
                    'flexDirection':'column'}}>

                    <Header style={{background: '#fff', padding: 0}}>
                        <div style={{
                            height: 64,
                            background: '#fff',
                            position: 'relative'
                        }}>
                        <center><Skeleton paragraph={false} title={{width:300}}  active/></center>
                        </div>
                    </Header>
                    <Content >
                        <div style={{margin:'auto'}}>
                        <LoadingBox />
                            {/* <LoadingPageSpinner /> */}
                        </div>
                    </Content>
                    {/* <Footer>
                        <PatientFooter />
                    </Footer> */}
                </div>
        </Layout>
    </Layout>
}