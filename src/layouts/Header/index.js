import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import {HaveModule} from '../../../src/components/Network/index.js'
// add placeholders
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'

import { Menu, Avatar, Badge } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
                    <NavLink exact to={item[1]}>{item[0]}</NavLink>
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
                <div>
                        <img className="logo" style={{height:'50px'}} src={this.props.network.logo} />
                        <div style={{float:'right'}} >
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            mode="horizontal"
                        >

                            {menuHtml}

                            <Menu.Item key='inbox'>
                                <NavLink exact to="/inbox">Inbox {new_messages > 0 && <Badge count={new_messages}>{new_messages}</Badge>}</NavLink>
                            </Menu.Item>
                            <Menu.Item key='notifications'>
                                <NavLink exact to="/notifications">Notifications {new_notifications > 0 && <Badge count={new_notifications}>{new_notifications}</Badge>}</NavLink>
                            </Menu.Item>


                            <SubMenu key="sub1" title={<span><Avatar icon="user" size="small" /> <span>{this.props.user.first_name}!</span></span>}>

                                {user_menu_items.map((item) => {
                                    return (
                                        <Menu.Item key={item.toString()}>
                                            <NavLink exact to={item[1]}>{item[0]}</NavLink>
                                        </Menu.Item>)

                                })}
                            </SubMenu>

                        </Menu>
                        </div>
                </div>
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