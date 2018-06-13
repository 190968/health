import React from 'react';
import { Row, Col,Layout, Menu, Icon, Divider, Alert, Button, Dropdown } from 'antd';
import {NavLink} from 'react-router-dom';
import Avatar from '../../../User/components/Avatar/index';
import ProfileContent from './components/ProfileContent';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";

import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import DescriptionList from "../../../../components/Layout/DescriptionList/DescriptionList";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Description = DescriptionList.Description;
const ButtonGroup = Button.Group;

export default class Profile extends React.Component {


    static defaultProps = {
        plans:[],
        plansTotal:0
    }

    handleTabChange = (key) => {
        //console.log(key);
        //console.log(this.props);\
        const {id, tab = 'dashboard', subtab = ''} = this.props.match.params;

        const selectedItem = subtab || tab;
        const openItem = tab;

        console.log(tab, subtab);
        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/'+id;
        }

        this.props.history.push(mainUrl+'/'+key);
    }


    render() {
        const {match, loading, user={}, fullName} = this.props;


        const {id, tab = 'dashboard', subtab = ''} = match.params;

        const selectedItem = subtab || tab;
        const openItem = tab;

        console.log(tab, subtab);
        let mainUrl = '/u';
        if (id !== '') {
            mainUrl += '/'+id;
        }
        let cancerName = 'Small Cell Lung Cancer';
        let stageName = 'T1 N2 M0 Stage 1';

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
        ];

        const {genderText, age, email, birthday='', phoneFormatted, addressText, getUserNetwork={}, getAdherence={}, getInsurance={}} = user;
        //
        const {lastLogin, joinedDate} = getUserNetwork;

        const {memberId = '',
            groupNumber = '',
            payer = {}} = getInsurance;
        const {name:payerName=''} = payer;

        const descriptionDetails = [
            //['Name', user.fullName],
            ['Member ID', memberId],
            ['Gender', genderText],
            ['Age', age],
            //['Birthday', birthday],
            ['Phone', phoneFormatted],
            //['Email', email],
            ['Cancer', cancerName],
            ['Stage', stageName],
            ['Last Login', lastLogin],
            //['Group', groupNumber],
            ['Insurance', payerName]
        ];


        return (
            <PageHeaderLayout
                title={user.fullName}
                content={<Row style={{padding:5}}>
                    <Col md={6}><Avatar info={user} size="huge" /></Col>
                    <Col md={18}>
                        <DescriptionList col={3}>

                            {descriptionDetails.map((details, i) => {
                                return  <Description term={details[0]}  >
                                    {details[1]}
                                </Description>;
                            })}
                        </DescriptionList>
                    </Col>
                </Row>}
                action={<React.Fragment>
                    <ButtonGroup>
                        <Button icon={'edit'} >Edit Profile</Button>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Button>
                                <Icon type="ellipsis" />
                            </Button>
                        </Dropdown>
                    </ButtonGroup>
                    <Button type="primary" icon={'mail'} style={{    marginLeft: 8}}>Send Message</Button>
                </React.Fragment>}

                tabList={tabList}
                activeTab={tab}
                onTabChange={this.handleTabChange}
            >

                <ProfileContent {...this.props} />

            </PageHeaderLayout>
            );
    }
}