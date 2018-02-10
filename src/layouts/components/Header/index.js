import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import ReactPlaceholder from 'react-placeholder';
import RightMenu from './containers/RightMenu';
import { Tag, Row, Col, Menu} from 'antd';



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
        //console.log(location);
        const menu_items = [
            ['Dashboard', '/'],
            ['Planstore', '/planstore', 'aps'],
            ['Community', '/community', 'community'],
        ];

        const menuHtml = menu_items.map((item) => {
            //console.log(item.toString());
            if (item[1] ) {
                /*<HaveModule module={item[2]}>*/
                //console.log(item[1]);
                return (
                    <Menu.Item as={NavLink} to={item[1]} key={item[1]}>
                        <NavLink to={item[1]}>{item[0]}</NavLink>
                    </Menu.Item>
                )
            }

            return (
                <Menu.Item key={item.toString()}>
                    <NavLink  to={item[1]}>{item[0]}</NavLink>
                </Menu.Item>)

        });

        const locationPath = '/'+location.pathname.split('/')[1];
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
                    <Col span={5}><Link to={'/'}><img className="logo" style={{height:'50px', marginRight:'5px'}} src={this.props.network.logo} /></Link> <Tag color="blue">Patient</Tag></Col>
                    <Col >
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={[locationPath]}
                            mode="horizontal"
                            style={{'borderBottom':'none'}}
                        >
                            {menuHtml}
                        </Menu>
                    </Col>

                    <Col>
                        <RightMenu />
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
        messages:    state.user.info.unreadMessages,
        notifications:    state.user.info.unreadNotifications,
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