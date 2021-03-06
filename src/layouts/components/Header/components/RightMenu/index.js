import React from 'react'
import {Redirect, Link } from 'react-router-dom';
import MenuBadges from './containers/MenuBadges';
import ChangeRoleModal from './containers/ChangeRole';
import {Menu, Row, Col } from 'antd';
import UserWidget from '../../../../../routes/User/components/UserWidget';
import CategorySelect from '../../../../../components/Autosuggest/containers/CategorySelect.js';
const SubMenu = Menu.SubMenu;

class RightMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            isOpen: false,
            isOpenUser: false,
            openChangeRole:false,
            openMedicalRepository:false,
            openCommunity:false,
            loading: false,
            notificationsLastCursor: props.lastCursor
        };
    }
    updateLastNotification = (cursor) => {

        this.setState({notificationsLastCursor: cursor});
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleUser() {
        this.setState({
            isOpenUser: !this.state.isOpenUser
        });
    }


    toggleRole = () => {
        this.setState({openChangeRole: !this.state.openChangeRole})
    };
    toggleMedicalRepository = () => {
        this.setState({openMedicalRepository: !this.state.openMedicalRepository})
    };

    handleClick = (data) => {
        // this.setState({openCommunity: !this.state.openCommunity})
        // <Redirect to={{pathname: '/community/a485'}} />
    }

    render() {
        //console.log(this.props, 'Loading right Menu')
        const {currentUser={}, updateCurrentUserInfo} = this.props;
        // check if we have other roles - add switcher
        const {possibleNetworkRoles=[], possibleProviderRoles=[], currentRole} = currentUser;
        const haveOtherRoles = possibleNetworkRoles.length > 1 || possibleProviderRoles.length > 1;
        const roles = possibleNetworkRoles;
        let user_menu_items = [];
        let defaultMenu = [];
        if (haveOtherRoles) {
            user_menu_items.push(['Change Mode', 'onclick',this.toggleRole]);
        }
        user_menu_items.push(['Medical Repository', 'onclick',this.toggleMedicalRepository]);
        if (currentRole === 'patient') {
            defaultMenu = [
                ['Settings', '/settings'],
                ['Calendar', '/calendar', 'calendar'],
                ['Health', '/health', 'health'],
                ['Help Center', '/help', 'help'],
            ];
        } else {
            defaultMenu = [
                ['Settings', '/settings'],
                ['Calendar', '/calendar', 'calendar'],
                ['Help Center', '/help', 'help'],
            ];
        }
        user_menu_items = [...user_menu_items, ...defaultMenu];

        user_menu_items.push([1]);
        user_menu_items.push(['Logout', '/logout']);

        return (
            <Row type="flex" justify="end" align="middle">
                <Col>
                    <Menu
                        /*onClick={this.handleClick}*/
                        mode="horizontal"
                        style={{'borderBottom':'none', 'float':'right'}}
                    >
                        <SubMenu key="sub1" title={<UserWidget user={currentUser} onlyFirst={true} />}>

                            {user_menu_items.map((item, i) => {
                                //console.log(item);
                                if (item.length === 1) {
                                    return (<Menu.Divider key={i} />)
                                }
                                return (
                                    <Menu.Item key={i}>

                                        {item[1] === 'onclick' ?
                                            <a onClick={item[2]}>{item[0]}</a>
                                        : <Link to={item[1]}>{item[0]}</Link>}
                                    </Menu.Item>)

                            })}
                        </SubMenu>

                    </Menu>
                    <MenuBadges updateCurrentUserInfo={updateCurrentUserInfo} currentUser={currentUser} lastNotificationCursor={this.state.notificationsLastCursor} updateLastNotification={this.updateLastNotification} />
                    {this.state.openChangeRole && <ChangeRoleModal roles={roles} currentRole={currentRole} onHide={this.toggleRole} />}
                    {this.state.openMedicalRepository && <CategorySelect onHide={this.toggleMedicalRepository} handleOk={this.handleClick.bind(this,"a485")} />}
                    {/*{this.state.openCommunity && <Redirect to={{pathname: '/community/a485'}} />}*/}

                </Col>
            </Row>
        );
    }
}

export default (RightMenu);