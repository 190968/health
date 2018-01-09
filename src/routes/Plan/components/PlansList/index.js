import React from 'react';
import PropTypes from 'prop-types';

import PlanWidget from 'routes/Plan/components/Plan';
import { List, Card  } from 'antd';
import {
    FormattedMessage,
} from 'react-intl';

const pageOpts = { total: 4, hideOnSinglePage:true};

export class PlansList extends React.Component {
    changePage = (page) => {
        this.props.loadMoreEntries(page)
    }

  render () {
    const {
      plans, loading, loadMoreEntries
    } = this.props;

    var rows = [];
    if (loading) {
        return (<Card loading title={<FormattedMessage id="plan.title" defaultMessage="TODAY'S ACTIONPLANS" description="Medications for Today" />}>
           Loading
        </Card>)
    }

    return (
        <Card title={<FormattedMessage id="plan.title" defaultMessage="TODAY'S ACTIONPLANS" description="Medications for Today" />}>
            <List
                split={false}
                grid={{gutter: 10, xs: 1, sm: 2, md: 3, lg: 4, xl: 4}}
                pagination={pageOpts}
                dataSource={plans}
                renderItem={product => (
                    <List.Item key={product.id}>
                        <PlanWidget info={product} key={product.id}/>
                    </List.Item>
                )}
            />
        </Card>);
  }
}


PlansList.propTypes = {
  plans: PropTypes.array,
  loading: PropTypes.bool,
   // loadMoreEntries: PropTypes.function.isRequired,
};

export default PlansList;
