import React from 'react';
import {LineChart, Line, ResponsiveContainer, Tooltip as ReachartsTooltip} from 'recharts';
import { Row, Col,Layout, Menu, Icon, Divider, Alert, Button, Dropdown, Progress, Tooltip } from 'antd';
import {NavLink} from 'react-router-dom';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import Avatar from '../../../User/components/Avatar/index';
import ProfileContent from './components/ProfileContent';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import {withModal} from "../../../../components/Modal/index"
import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import DescriptionList from "../../../../components/Layout/DescriptionList/DescriptionList";
import ProfileManager from './containers/ProfileManager';
import { CalculatorButton } from './components/Calculators/containers/CalculatorButton';
import { PubMedArticlesButton } from '../../../Health/components/PubMedArticles/containers/PubMedArticlesButton';
import { FollowUpButton } from './components/Visits/containers/FollowUpButton';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Description = DescriptionList.Description;
const ButtonGroup = Button.Group;

const CancerTitlePure = ({cancer, openEditorModal, hideEditorModal, openEditor}) => {
    return <React.Fragment>
        <a onClick={openEditorModal}>{cancer.title}</a>
        {openEditor &&  <ProfileManager onHide={hideEditorModal} cancer={cancer} />}
    </React.Fragment>
}
const enhanceTitle = compose(
    withStateHandlers(
        (props) => ({
        openEditor: false,
        }),
        {
            openEditorModal: ({ counter }) => (value) => ({
                openEditor: true
            }),
            hideEditorModal: ({ counter }) => (value) => ({
                openEditor: false
            }),
        }
        )
);

const CancerTitle = enhanceTitle(CancerTitlePure);
 const menu = (
            <Menu>
                <Menu.Item key="1">Suspend</Menu.Item>
                <Menu.Item key="2">Delete</Menu.Item>
            </Menu>
        );
        const tabList = [
            {
                key: 'dashboard',
                tab: 'Overview',
            },
            {
                key: 'timeline',
                tab: 'Timeline',
            },
            {
                key: 'alerts',
                tab: 'Alerts',
            },
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
            {
                key: 'outreach',
                tab: 'Outreach',
            },
        ];

const BioDigitalButtonPure = props => {
    return <Icon type="picture" onClick={props.openBioDigital} />
}
const BioDigitalButton = withHandlers({
    openBioDigital: props => () => {
        const {l='Lungs'} = props;
        window.open('/static/myapp/biodigital.html?l='+l,'targetWindow',
                                   "toolbar=no, location=no, status=no, menubar=no, crollbars=yes, resizable=yes, width=500, height=500");
    }
})(BioDigitalButtonPure);

const Profile = props => {

   

        const {match, loading, user={},addCancer,hideManager,openManage,handleTabChange, fullName} = props;

        const {id, tab = 'dashboard', subtab = ''} = match.params;

        const selectedItem = subtab || tab;
        const openItem = tab;

        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/'+id;
        }
        let cancerName = 'Small Cell Lung Cancer';
        let stageName = 'T1 N2 M0 Stage 1';

       

        

        const {genderText, age, email, birthday='', phoneFormatted, addressText, getUserNetwork={}, getAdherence={}, getInsurance={}, getDiagnosis={}} = user;
        //
        const {lastLogin, joinedDate} = getUserNetwork;

        const {memberId = '',
            groupNumber = '',
            payer = {}} = getInsurance;
        const {name:payerName=''} = payer;

        const {code={}} = getDiagnosis || {};
        const {name:DiagnosisName} = code;

        // adherence
        const {medications:medAdherence={}, total:generalAdherence={}} = getAdherence;

        const {level:medAdherenceLevel=0} = medAdherence || {};
        const {level:generalAdherenceLevel=0} = generalAdherence || {};

        const descriptionDetails = [
            //['Name', user.fullName],
            ['Member ID', memberId],
            ['Gender', genderText],
            ['Age', age],
            // ['Medication Adherence', ],
            // ['Adherence', ],
            ['Phone', phoneFormatted],
            //['Email', email],
            ['Diagnosis', (DiagnosisName || null/*<span>Add Diagnosis</span>*/)],
            ['Cancer', <span>{cancerName} <BioDigitalButton /></span>],
            ['Stage', stageName],
            ['Last Login', lastLogin],
            //['Group', groupNumber],
            ['Insurance', payerName]
        ];


        const data = [
            {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
            {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
            {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
            {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
            {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
            {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
            {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      ];

        return (
            <PageHeaderLayout
                title={user.fullName}
                content={<Row style={{padding:5}}>
                    <Col md={6}><Avatar info={user} size="huge" /></Col>
                     
                    <Col md={18}>
                        <DescriptionList col={3} >
                            {descriptionDetails.map((details, i) => {
                                return  <Description key={i} term={details[0]} excludeEmpty >
                                    {details[1]}
                                </Description>;
                            })}
                        </DescriptionList>
                    </Col>
                </Row>}

                extraContentDiff={2}
                extraContent={<Row style={{textAlign:'center', borderLeft1: '1px solid #ccc'}}>
                    <Col>
                    Adherence
                    </Col>
                    <Col>
                        <Row>
                        <Col span={'12'}>
                        <Progress type="circle" percent={medAdherenceLevel} strokeColor={'#8884d8'} width={70} />
                        <br />Medical 
                        </Col>
                        <Col span={'12'}>
                        <Progress type="circle" percent={generalAdherenceLevel}  strokeColor={'#51ade2'}  width={70} />
                        <br />General 
                        </Col>
                        <Col>
                        <div style={{height:60, marginTop:5, padding: '0 10px'}}>
                        <ResponsiveContainer>
                        <LineChart   data={data}>
                        
                            <Line type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} />
                            <Line type='monotone' dataKey='uv' stroke='#51ade2' strokeWidth={2} />
                            <ReachartsTooltip/>
                        </LineChart>
                        </ResponsiveContainer>
                        </div>
                        </Col>
                        </Row>
                    </Col>
                </Row>}
                action={<React.Fragment>
                    <CalculatorButton user={user} />
                    <PubMedArticlesButton search={'Small Cell Lung Cancer'} />
                    <ButtonGroup>
                    <Tooltip title={'Edit Profile'}><Button icon={'edit'} onClick={addCancer}  ></Button></Tooltip>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Button>
                                <Icon type="ellipsis" />
                            </Button>
                        </Dropdown>
                    </ButtonGroup>
                    <ButtonGroup style={{ marginLeft: 8}}>
                        <Tooltip title={'Send Message'}><Button type="primary" icon={'mail'} ></Button></Tooltip>
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