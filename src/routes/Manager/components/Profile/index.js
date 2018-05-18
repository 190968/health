import React from 'react';
import { Layout, Menu, Icon, Divider } from 'antd';
import {NavLink} from 'react-router-dom';
import Avatar from '../../../User/components/Avatar/index';
import ProfileContent from './components/ProfileContent';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;



export default class Profile extends React.Component {


    static defaultProps = {
        plans:[],
        plansTotal:0
    }


    render() {
        const {match, loading, user={}, fullName} = this.props;


        const {id, tab = 'timeline', subtab = ''} = match.params;

        const selectedItem = subtab || tab;
        const openItem = tab;

        console.log(match);
        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/'+id;
        }

        return (
            <Layout style={{minHeight:'100vh'}}>
                <Sider
                    trigger={null} style={{background:'#fff'}}
                >
                    <div style={{padding:5}}>
                    <center><Avatar info={user} size="huge" /></center>
                    <center style={{marginTop:10}}><h2>{user.fullName}</h2></center>
                        <div style={{textAlign:'center'}}>
                            <span style={{fontSize:'1.2em'}}>{user.genderText}</span>
                            <Divider type="vertical" />
                            <span style={{fontSize:'1.2em'}}>{user.age} y.o.</span>
                        </div>
                    </div>
                    <Divider dashed style={{marginBottom:0}} />
                    <Menu theme="grey" mode="inline" style={{borderRight:0}} defaultSelectedKeys={[selectedItem]} defaultOpenKeys={[openItem]} >
                        <Menu.Item key="timeline">
                            <NavLink to={mainUrl+'/timeline'}>Timeline</NavLink>
                        </Menu.Item>
                        <Menu.Item key="tumorboard">
                            <NavLink to={mainUrl+'/tumorboard'}>Tumorboard</NavLink>
                        </Menu.Item>
                        <Menu.Divider />
                        <SubMenu
                            key="details"
                            title={<span><span>Patient Details</span></span>}
                        >
                        <Menu.Item key="dash">
                            <NavLink to={mainUrl+'/dash'}>Overview</NavLink>
                        </Menu.Item>
                        <Menu.Item key="info">
                            <NavLink to={mainUrl+'/info'}>General Information</NavLink>
                        </Menu.Item>
                        <Menu.Item key="health">
                            <NavLink to={mainUrl+'/health'}>Health Information</NavLink>
                        </Menu.Item>
                        <Menu.Item key="cohorts">
                            <NavLink to={mainUrl+'/cohorts'}>Cohorts</NavLink>
                        </Menu.Item>
                        <Menu.Item key="dme">
                            <NavLink to={mainUrl+'/dme'}>DME Orders</NavLink>
                        </Menu.Item>
                        <Menu.Item key="claims">
                            <NavLink to={mainUrl+'/claims'}>Claims</NavLink>
                        </Menu.Item>
                        <Menu.Item key="alert">
                            <NavLink to={mainUrl+'/alerts'}>Alert History</NavLink>
                        </Menu.Item>
                            <Menu.Item key="qmeasures">
                                <NavLink to={mainUrl+'/qmeasures'}>Quality Measures</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="adherence"
                            title={<span><span>Adherence</span></span>}
                        >
                            <Menu.Item key="adherence/meds">
                                <NavLink to={mainUrl+'/adherence/meds'}>Medications</NavLink>
                            </Menu.Item>
                            <Menu.Item key="adherence/trackers">
                                <NavLink to={mainUrl+'/adherence/trackers'}>Biometric Plan</NavLink>
                            </Menu.Item>
                            <Menu.Item key="adherence/aps">
                                <NavLink to={mainUrl+'/adherence/aps'}>ActionPlans</NavLink>
                            </Menu.Item>
                            <Menu.Item key="adherence/7days">
                                <NavLink to={mainUrl+'/adherence/7days'}>Past 7 Days</NavLink>
                            </Menu.Item>
                        </SubMenu>


                        <SubMenu
                            key="stakeholders"
                            title={<span><span>StakeHolders</span></span>}
                        >
                            <Menu.Item key="stakeholders/team"><NavLink to={mainUrl+'/stakeholders/team'}>Team Members</NavLink></Menu.Item>
                            <Menu.Item key="stakeholders/family"><NavLink to={mainUrl+'/stakeholders/family'}>Family Members</NavLink></Menu.Item>
                            <Menu.Item key="stakeholders/providers"><NavLink to={mainUrl+'/stakeholders/providers'}>Providers</NavLink></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ paddingTop: 24, paddingRight:24, background: '#fff', minHeight: 280 }}>
                        <ProfileContent {...this.props} />
                    </Content>
                </Layout>
            </Layout>);
    }
}