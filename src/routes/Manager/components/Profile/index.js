import React from 'react';
import { Layout, Menu, Icon, Divider, Alert } from 'antd';
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


        const {id, tab = 'dashboard', subtab = ''} = match.params;

        const selectedItem = subtab || tab;
        const openItem = tab;

        console.log(match);
        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/'+id;
        }
        let cancerName = 'Small Cell Lung Cancer';
        let stageName = 'T1 N2 M0 Stage 1';

        return (
            <Layout style={{minHeight:'100vh'}}>
                <Sider
                    trigger={null} style={{background:'#fff'}}
                >
                    <div style={{padding:5}}>
                        <center><Avatar info={user} size="huge" /></center>
                        <center style={{marginTop:10}}><h2>{user.fullName}</h2></center>
                        <div style={{textAlign:'center', marginBottom:10}}>
                            <span style={{fontSize:'1.2em'}}>{user.genderText}</span>
                            <Divider type="vertical" />
                            <span style={{fontSize:'1.2em'}}>{user.age}</span>
                        </div>
                        <div style={{background:'#dedede', margin: '-5px', padding: '10px 10px', textAlign:'center'}}>
                            <h4>{cancerName}</h4>
                            <div>{stageName}</div>
                        </div>
                    </div>
                    <Divider dashed style={{marginBottom:0, marginTop:10}} />
                    <Menu theme="grey" mode="inline" style={{borderRight:0}} defaultSelectedKeys={[selectedItem]} defaultOpenKeys={[openItem]} >
                        <Menu.Item key="dashboard">
                            <NavLink to={mainUrl+'/dashboard'}>Dashboard</NavLink>
                        </Menu.Item>
                        <Menu.Item key="timeline">
                            <NavLink to={mainUrl+'/timeline'}>Timeline</NavLink>
                        </Menu.Item>
                        <Menu.Divider />
                        <SubMenu
                            key="pat_details"
                            title={<span><span>Patient Details</span></span>}
                        >
                        <Menu.Item key="dash">
                            <NavLink to={mainUrl+'/overview'}>Overview</NavLink>
                        </Menu.Item>
                        <Menu.Item key="info">
                            <NavLink to={mainUrl+'/details'}>General Information</NavLink>
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
                            <Menu.Item key="qms">
                                <NavLink to={mainUrl+'/qms'}>Quality Measures</NavLink>
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