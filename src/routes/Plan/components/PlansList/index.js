import React from 'react';
import PropTypes from 'prop-types';

import PlanWidget from 'routes/Plan/components/Plan';
import { List, Card, Tooltip, Dropdown, Button, Icon, Menu  } from 'antd';
import { Link } from 'react-router-dom';
import {
    FormattedMessage,
} from 'react-intl';

const menu = (
    <Menu>
        <Menu.Item key="1">Show Active</Menu.Item>
        <Menu.Item key="2">Show Completed</Menu.Item>
        <Menu.Item key="3">Show Elapsed</Menu.Item>
    </Menu>
);
export class PlansList extends React.Component {
    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }


  render () {
    const {
      plans, user_id, loading
    } = this.props;

    if (loading) {
        return (<Card loading title={<FormattedMessage id="plan.title" defaultMessage="TODAY'S ACTIONPLANS" description="Medications for Today" />}>
           Loading
        </Card>)
    }

    return (
        <Card title={<FormattedMessage id="plan.title" defaultMessage="TODAY'S ACTIONPLANS" description="Medications for Today" />}
              extra={<div><Tooltip title={<FormattedMessage id="plan.settings" defaultMessage="Settings" />}><Dropdown overlay={menu} >
                  <Button size="small" style={{ marginRight: 8 }}>
                      <Icon type="setting" />
                  </Button>
              </Dropdown></Tooltip><Tooltip title={<FormattedMessage id="plan.add" defaultMessage="Add Actionplan" />}><Link to={'/planstore'}><Button size="small"><Icon type="plus" /></Button></Link></Tooltip></div>}
        >
            {plans.length > 0 ? <List
                split={false}
                grid={{gutter: 15, xs: 1, sm: 2, md: 2, lg: 3, xl: 4}}
                pagination={false}
                dataSource={plans}
                renderItem={product => (
                    <List.Item>
                        <PlanWidget info={product} key={product.id} user_id={user_id}/>
                    </List.Item>
                )}
            /> : <div className="ant-list-empty-text">No ActionPlans</div>}
        </Card>);
  }
}


PlansList.propTypes = {
  plans: PropTypes.array,
  loading: PropTypes.bool,
   // loadMoreEntries: PropTypes.function.isRequired,
};

export default PlansList;
