import React from 'react';
import {LineChart, Line, ResponsiveContainer, Tooltip as ReachartsTooltip} from 'recharts';
import { Row, Col,Layout, Menu, Icon, Divider, Alert, Button, Dropdown, Progress, Tooltip } from 'antd';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';

import ProfileContent from './components/ProfileContent';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import AvatarWithName from '../../../User/components/AvatarWithName';
import ProfileManager from './containers/ProfileManager';
import { CalculatorButton } from './components/Calculators/containers/CalculatorButton';
import { PubMedArticlesButton } from '../../../Health/components/PubMedArticles/containers/PubMedArticlesButton';
import { FollowUpButton } from './components/Visits/containers/FollowUpButton';
import NotificationButton from './components/Alerts/components/Button';
import PatientManagerButton from '../Patients/components/PatientEditButton';
import { UberRequestButton } from '../../../../components/Uber/components/Button';
const ButtonGroup = Button.Group;

 const menu = (
            <Menu>
                <Menu.Item key="1">Suspend</Menu.Item>
                <Menu.Item key="2">Delete</Menu.Item>
            </Menu>
);


const getTabs = (role) => {
    let tabList = []
    switch(role) {
        case 'advocate':
            tabList = [
                {
                    key: 'dashboard',
                    tab: 'Overview',
                },
                {
                    key: 'calendar',
                    tab: 'Calendar',
                },
                {
                    key: 'plans',
                    tab: 'Plans',
                },

                {
                    key: 'details',
                    tab: 'Details',
                }
            ];
            break;
        default:
            tabList = [
                {
                    key: 'dashboard',
                    tab: 'Overview',
                },
                {
                    key: 'timeline',
                    tab: 'Timeline',
                },
                {
                    key: 'health',
                    tab: 'Health',
                },
                {
                    key: 'calendar',
                    tab: 'Calendar',
                },
                // {
                //     key: 'alerts',
                //     tab: 'Alerts',
                // },
                {
                    key: 'plans',
                    tab: 'Plans',
                },

                {
                    key: 'details',
                    tab: 'Details',
                },
                {
                    key: 'stakeholders',
                    tab: 'Stakeholders',
                },
                {
                    key: 'treatmentOptions',
                    tab: 'Treatment Options',
                },
                // {
                //     key: 'outreach',
                //     tab: 'Outreach',
                // },
            ];
            break;
    }
    return tabList;
}
       


const Profile = props => {

   

        const {match, loading, user={},hideManager,openManage,handleTabChange, currentUser} = props;

        const {id, tab = 'dashboard', subtab = ''} = match.params;

        const selectedItem = subtab || tab;
        const openItem = tab;

        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/'+id;
        }
       
        const {currentRole} = currentUser || {};
        console.log(currentUser);
       const tabList = getTabs(currentRole);
       const canEdit = currentRole === 'manager';
       const showExtraHeaderInfo = canEdit || currentRole !== 'advocate';

        return (
            <PageHeaderLayout
                title={<AvatarWithName user={user} size={30} widget={false} useLink={false} />}
                // content={<Row style={{padding:5}}>
                //     <Col md={6}><Avatar info={user} size="huge" /></Col>
                     
                //     <Col md={18}>
                //         <DescriptionList col={3} >
                //             {descriptionDetails.map((details, i) => {
                //                 return  <Description key={i} term={details[0]} excludeEmpty >
                //                     {details[1]}
                //                 </Description>;
                //             })}
                //         </DescriptionList>
                //     </Col>
                // </Row>}

                // extraContentDiff={2}
                // extraContent={<Row style={{textAlign:'center', borderLeft1: '1px solid #ccc'}}>
                //     <Col>
                //     Adherence
                //     </Col>
                //     <Col>
                //         <Row>
                //         <Col span={'12'}>
                //         <Progress type="circle" percent={medAdherenceLevel} strokeColor={medAdherenceColor} width={70} />
                //         <br />Medical 
                //         </Col>
                //         <Col span={'12'}>
                //         <Progress type="circle" percent={generalAdherenceLevel}  strokeColor={generalAdherenceColor}  width={70} />
                //         <br />General 
                //         </Col>
                //         {/*<Col>
                //         <div style={{height:60, marginTop:5, padding: '0 10px'}}>
                //         <ResponsiveContainer>
                //         <LineChart   data={data}>
                        
                //             <Line type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} />
                //             <Line type='monotone' dataKey='uv' stroke='#51ade2' strokeWidth={2} />
                //             <ReachartsTooltip/>
                //         </LineChart>
                //         </ResponsiveContainer>
                //         </div>
                //         </Col>*/}
                //         </Row>
                //     </Col>
                // </Row>}
                action={<React.Fragment>
                    <UberRequestButton /> {showExtraHeaderInfo && <CalculatorButton user={user} />}
                    {/* {showExtraHeaderInfo && <PubMedArticlesButton search={'Small Cell Lung Cancer'} />} */}
                    {canEdit && <ButtonGroup>
                    <Tooltip title={'Edit Profile'}><PatientManagerButton patient={user} /></Tooltip>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Button icon={'ellipsis'} />
                        </Dropdown>
                    </ButtonGroup>}
                    <ButtonGroup style={{ marginLeft: 8}}>
                        <Tooltip title={'Send Message'}><Button icon={'mail'} ></Button></Tooltip>
                        <NotificationButton user={user} />
                        <FollowUpButton patient={user} />
                    </ButtonGroup>
                    
                </React.Fragment>}
                tabList={tabList}
                activeTab={tab}
                onTabChange={handleTabChange}
            >
                <ProfileContent {...props} />
                {openManage && <ProfileManager patient={user} onHide={hideManager} />}
            </PageHeaderLayout>
            
            );
    }

    const enhance = compose(
        withState('openManage', 'setOpenManager', false),
        withHandlers({
            addCancer: props => () => {
                props.setOpenManager(true);
            },
            hideManager: props => () => {
                props.setOpenManager(false);
            }
        })
    );
    
export default enhance(Profile);