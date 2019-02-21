import React from 'react';
import {Tabs} from 'antd';
import {branch} from 'recompose';
const TabPane = Tabs.TabPane;

const tabPane = Component => {
    const tabPaneHOC = props => {
        const {asTabPane} = props;
        const {label, key, loading} = asTabPane || {};
        console.log(props);
        return (
            <TabPane tab={label} key={key}>
                <Component {...props} />
            </TabPane>
        );
    }
    return tabPaneHOC;
 
}

export const withPossibleTabPane = branch(props => props.asTabPane, tabPane);