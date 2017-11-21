import React from 'react'
import { connect } from 'react-redux'
import './PageHeader.scss'
import { NavLink as RouterNavLink } from 'react-router-dom';
import {HaveModule} from '../../../src/components/Network/index.js'
// add placeholders
import ReactPlaceholder from 'react-placeholder';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders'

import { Container, Row, Collapse,  Badge, Navbar, NavbarToggler, NavbarBrand, NavDropdown,  DropdownItem, DropdownToggle, DropdownMenu, Nav, NavItem, NavLink } from 'reactstrap';


const HeaderPlaceholder = (
    <header className="show-loading-animation">
        <Container>
            <Navbar color="faded" light className="navbar-expand-lg">
                <NavbarBrand href="/"></NavbarBrand>
                <NavbarToggler />
                <Collapse navbar>
                    <Nav className="m-auto" navbar>
                        <NavItem>
                            <NavLink disabled href="/"> <TextRow></TextRow></NavLink>
                        </NavItem>
                        <NavItem>
                            <TextRow></TextRow>
                        </NavItem>
                        <NavItem>
                            <TextRow></TextRow>
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <RoundShape></RoundShape>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </Container>
    </header>
);


class Header extends React.Component {
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
       //console.log(loading);
        const new_messages = this.props.messages;
        const new_notifications = this.props.notifications;

        return (
            <ReactPlaceholder ready={!loading} customPlaceholder={HeaderPlaceholder}>
          <header>
            <Container>
                <Navbar color="faded" light className="navbar-expand-lg">
                    <NavbarBrand href="/"><img className="logo" src={this.props.network.logo} /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="m-auto" navbar>


                            <NavItem>
                                <NavLink exact tag={RouterNavLink} to="/">Dashboard</NavLink>
                            </NavItem>
                            <HaveModule module="aps">
                                <NavItem>
                                    <NavLink tag={RouterNavLink}  to="/planstore" >Planstore</NavLink>
                                </NavItem>
                            </HaveModule>

                            <HaveModule module="planstore">
                            <NavItem>
                                <NavLink  tag={RouterNavLink} to="/community">Community</NavLink>
                            </NavItem>
                            </HaveModule>
                        </Nav>
                        <Nav navbar>
                            <NavItem>
                                <NavLink  tag={RouterNavLink} to="/inbox">Inbox  {new_messages > 0 && <Badge color="danger" pill>{new_messages}</Badge>}</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  tag={RouterNavLink} to="/notification">Notifications {new_notifications > 0 && <Badge color="danger" pill>{new_notifications}</Badge>}</NavLink>
                            </NavItem>
                            <HaveModule module="points">
                            <NavItem>
                                <NavLink  tag={RouterNavLink} to="/notification">Points</NavLink>
                            </NavItem>
                            </HaveModule>
                            <NavDropdown isOpen={this.state.isOpenUser} toggle={this.toggleUser} >
                                <DropdownToggle nav caret>
                                    Hi {this.props.user.first_name}!
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.toggleUser}><NavLink tag={RouterNavLink} to="/settings">Settings</NavLink></DropdownItem>
                                    <DropdownItem onClick={this.toggleUser}><NavLink tag={RouterNavLink} to="/calendar">Calendar</NavLink></DropdownItem>
                                    <HaveModule module="health">
                                        <DropdownItem onClick={this.toggleUser}><NavLink tag={RouterNavLink} to="/health">My Health</NavLink></DropdownItem>
                                    </HaveModule>
                                    <DropdownItem onClick={this.toggleUser}><NavLink tag={RouterNavLink} to="/help">Help Center</NavLink></DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem><NavLink tag={RouterNavLink} to="/logout">Logout</NavLink></DropdownItem>
                                </DropdownMenu>
                            </NavDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
          </header>
            </ReactPlaceholder>
        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state.network);
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        messages:    state.user.info.new_messages,
        notifications:    state.user.info.new_notifications,
        network:    state.network,
        loading: state.user.loading,
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
)(Header);

