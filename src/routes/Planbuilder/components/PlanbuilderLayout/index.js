import React from 'react';
import { Col, Row, Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link,  NavLink as RouterNavLink } from 'react-router-dom';
import { Route } from "react-router-dom";

/** loadable **/
import Loadable from 'components/Loadable';
const asyncTab = (tab) => {
    //
    //console.log(tab);
    return  (
        Loadable({
            loader: () => {
                //
                //console.log('routes/Planbuilder/components/PlanbuilderLayout/tabs/'+tab+'.js');
                return import('routes/Planbuilder/components/PlanbuilderLayout/tabs/'+tab+'.js');
            }
        })
    );
}

import InfoTab from 'routes/Planbuilder/components/PlanbuilderLayout/tabs/info';

export class PlanbuilderLayout extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {};
    }
    static propTypes = {
        //plan: propType(Plan.fragments.plan).isRequired,
        //handleCancel: React.PropTypes.func.isRequired,
    }

    render() {
        const {
            plan, loading
        } = this.props;
        if (loading) {
            return ('loading');
        }
        const steps = plan.builder_steps;



        const routeComponents = steps.map(({url, code, sub_items}, index) => <div key={index}>
            {code &&
            <Route key={index} path={url} component={asyncTab(code)}/>
            }
            {sub_items.map((sub_url_info, i) => {
                return <Route key={i} exact path={sub_url_info.url} component={asyncTab(sub_url_info.code)} />
            })}
        </div>);


        return (
            <div>

                <Navbar color="faded" light className="navbar-expand-lg">
                    <Nav navbar>
                        {steps.map(
                            (url_info, index) => {
                                return <NavItem key={index}>
                                    <NavLink tag={RouterNavLink} to={url_info.url}>{url_info.label}</NavLink>
                                </NavItem>
                            }
                        )}
                    </Nav>
                </Navbar>
                <Navbar   className="navbar-expand-lg">

                        {steps.map(
                            (url_info, index) => {
                                var sub_items = url_info.sub_items || [];

                                return  <Nav key={index} navbar>{sub_items.map( (sub_url_info, i) => {
                                    return <NavItem key={i}>
                                        <NavLink exact tag={RouterNavLink} to={sub_url_info.url}>{sub_url_info.label}</NavLink>
                                    </NavItem>
                                })}</Nav>
                            }
                        )}
                </Navbar>

                <Row>
                    {routeComponents}
                </Row>
            </div>

        );
    }
}

export default PlanbuilderLayout;