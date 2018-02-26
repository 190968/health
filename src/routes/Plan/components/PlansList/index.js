import React from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import PlanWidget from 'routes/Plan/components/Plan';
import { Progress,List, Card, Tooltip, Dropdown, Button, Icon, Menu  } from 'antd';
import { Link } from 'react-router-dom';
import {
    FormattedMessage,
} from 'react-intl';


export class PlansList extends React.Component {

    static defaultProps = {
        list: false
    }
    constructor(props) {
        super(props);
        this.handleStatus = this.handleStatus.bind(this);
    }
    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }
    handleStatus(e) {
        this.props.loadByStatus(e.key);
    }



  render () {
    const {
      plans, user_id, loading, list
    } = this.props;

    if (loading) {
        return (<Card loading title={<FormattedMessage id="plan.title" defaultMessage="Today's Actionplans" description="Medications for Today" />}>
           Loading
        </Card>)
    }
      const menu = (
          <Menu onClick={this.handleStatus}>
              <Menu.Item  key="active">Show Active</Menu.Item>
              <Menu.Item  key="completed">Show Completed</Menu.Item>
              <Menu.Item  key="elapsed">Show Elapsed</Menu.Item>
              <Menu.Item  key="archived">Show Archived</Menu.Item>
          </Menu>
      );

    return (
        <Card title={<FormattedMessage id="plan.title1" defaultMessage="Today's ActionPlans" description="Today's ActionPlans" />}
              extra={<Button.Group><Tooltip title={<FormattedMessage id="plan.settings" defaultMessage="Settings" />}><Dropdown overlay={menu} placement="bottomRight" >
                  <Button size="small">
                      <Icon type="setting" />
                  </Button>
              </Dropdown></Tooltip><Tooltip title={<FormattedMessage id="plan.add" defaultMessage="Add ActionPlan" />}><Button size="small"><Link to={'/planstore'}><Icon type="plus" /></Link></Button></Tooltip></Button.Group>}
        >
            {plans.length > 0 ? (list ?
                <List
                    itemLayout="vertical"
                    pagination={false}
                    dataSource={plans}
                    renderItem={product => (
                        <List.Item
                            key={product.id}
                            extra={<Link to={'/plan/'+product.id}><img width={150} alt="logo" src={product.plan.thumb.large} /></Link>}
                        >
                            <List.Item.Meta
                                title={<Link to={'/plan/'+product.id}>{product.plan.title}</Link>}
                                description={<Truncate lines={3}>{product.plan.description}</Truncate>}
                            />


                        </List.Item>
                    )}
                />
                : <List
                split={false}
                grid={{gutter: 15, xs: 1, sm: 2, md: 2, lg: 3, xl: 4}}
                pagination={false}
                dataSource={plans}
                renderItem={product => (
                    <List.Item>
                        <PlanWidget info={product.plan} upid={product.id} key={product.id} user_id={user_id}/>
                    </List.Item>
                )}
            />) : <div className="ant-list-empty-text">No ActionPlans</div>}
        </Card>);
  }
}


PlansList.propTypes = {
  plans: PropTypes.array,
  loading: PropTypes.bool,
   // loadMoreEntries: PropTypes.function.isRequired,
};

export default PlansList;
