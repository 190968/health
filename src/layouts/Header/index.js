import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {HaveModule} from '../../../src/components/Network/index.js'
// add placeholders
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'

import { Tag, Row, Col, Menu, Icon, Avatar, Badge } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuDivider = Menu.Divider;

const HeaderPlaceholder = (
     <div></div>
);


class LHeader extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            isOpen: false,
            isOpenUser: false,
            loading: false
        };
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
    render() {
        const loading = this.props.loading;
        const token = this.props.token;
        const location = this.props.location;
        const new_messages = this.props.messages;
        const new_notifications = this.props.notifications;

        const menu_items = [
            ['Dashboard', '/'],
            ['Planstore', '/planstore', 'aps'],
            ['Community', '/community', 'community'],
        ];


        const user_menu_items = [
            ['Settings', '/settings'],
            ['Calendar', '/calendar', 'calendar'],
            ['Health', '/health', 'health'],
            ['Help Center', '/help', 'help'],
            [1],
            ['Logout', '/logout'],
        ];

        const menuHtml = menu_items.map((item) => {
            //console.log(item.toString());
            if (item[1] ) {
                /*<HaveModule module={item[2]}>*/
                return (
                    <Menu.Item key={item.toString()}>
                        <NavLink exact to={item[1]}>{item[0]}</NavLink>
                    </Menu.Item>
                )
            }

            return (
                <Menu.Item key={item.toString()}>
                    <NavLink  to={item[1]}>{item[0]}</NavLink>
                </Menu.Item>)

        });

//{/*customPlaceholder={HeaderPlaceholder}*/}

        if (!token) {
            return (
                <div style={{'textAlign':'center'}}>
                    <NavLink to="/"><img className="logo" style={{height:'50px'}} src={this.props.network.logo} /></NavLink>
                </div>
            )
        }
        return (
            <ReactPlaceholder ready={!loading} rows={3} >


                <Row type="flex" justify="space-between" align="middle">
                    <Col span={5}><img className="logo" style={{height:'50px', marginRight:'5px'}} src={this.props.network.logo} /> <Tag color="blue">Patient</Tag></Col>
                    <Col >
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            mode="horizontal"
                            style={{'borderBottom':'none'}}
                        >
                            {menuHtml}
                        </Menu>
                    </Col>

                    <Col>

                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            mode="horizontal"
                            style={{'borderBottom':'none'}}
                        >



                            <Menu.Item key='inbox'>
                                <NavLink exact to="/inbox"><Badge count={new_messages}><Icon type="mail" /></Badge></NavLink>
                            </Menu.Item>
                            <Menu.Item key='notifications'>
                                <NavLink exact to="/notifications"><Badge count={new_notifications}><Icon type="bell" /></Badge></NavLink>
                            </Menu.Item>


                            <SubMenu key="sub1" title={<span><Avatar size="small" style={{ verticalAlign: 'middle' }}>{this.props.user.first_name}</Avatar> <span>{this.props.user.first_name}!</span></span>}>

                                {user_menu_items.map((item) => {
                                    if (item.length == 1) {
                                        return (<Menu.Divider key={'div'} />)
                                    }
                                    return (
                                        <Menu.Item key={item.toString()}>
                                            <NavLink exact to={item[1]}>{item[0]}</NavLink>
                                        </Menu.Item>)

                                })}
                            </SubMenu>

                        </Menu>

                    </Col>

                </Row>
            </ReactPlaceholder>
        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state.network);
    //console.log(state.user);
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        messages:    state.user.info.new_messages,
        notifications:    state.user.info.new_notifications,
        network:    state.network,
        //loading: state.user.loading,
        user: state.user.info,
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(LHeader);