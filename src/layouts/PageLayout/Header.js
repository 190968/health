import React from 'react'
import { connect } from 'react-redux'
import './PageHeader.scss'
import { Link,  NavLink as RouterNavLink } from 'react-router-dom';

import { Container, Collapse,  Badge, Navbar, NavbarToggler, NavbarBrand, NavDropdown,  DropdownItem, DropdownToggle, DropdownMenu, Nav, NavItem, NavLink } from 'reactstrap';

 class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            isOpen: false,
            isOpenUser: false
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
        return (
          <header>
            <Container>
                <Navbar color="faded" light className="navbar-expand-lg">
                    <NavbarBrand href="/"></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="m-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} active to="/planstore" >Planstore</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/counter">Community</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href='#'>Score</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/inbox">Inbox <Badge color="danger" pill>{this.state.network_id}</Badge></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/notification">Notifications <Badge color="danger" pill>0</Badge></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/notification">Points</NavLink>
                            </NavItem>
                            <NavDropdown isOpen={this.state.isOpenUser} toggle={this.toggleUser}>
                                <DropdownToggle nav caret>
                                    Username
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Header</DropdownItem>
                                    <DropdownItem disabled>Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem><NavLink href="/logout">Logout</NavLink></DropdownItem>
                                </DropdownMenu>
                            </NavDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
          </header>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state.network);
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        new_messages:    1,
        network_id:    state.network.id
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

