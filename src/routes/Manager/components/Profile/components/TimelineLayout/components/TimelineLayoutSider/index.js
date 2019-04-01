import React from 'react';
import { Tabs, Tooltip } from 'antd';
import Truncate  from 'react-truncate';

//import {getTimelineElementCardTitle} from "../Timeline/components/TimelineElement";
import TimelineElement from '../Timeline/containers/TimelineElement';

const TabPane = Tabs.TabPane;


const TimelineLayoutSider = (props) => {
    const {onChange, onEdit, activeTab, panes, activeElement, user, showPathway=false} = props;
    const tabTitleLength = panes.length > 2 ? 100 : 0;
    //console.log(props);
    let activeKey = activeTab || 'item_'+activeElement.id;
    if (activeTab === 'pathway' && !showPathway) {
        activeKey = 'item_'+activeElement.id;
    }
    return <div style={{marginLeft:10}}><Tabs
        onChange={onChange}
        onEdit={onEdit}
        activeKey={activeKey}
        type="editable-card"
        hideAdd
        className={'no-margin'}
    >
        {panes.map(pane => {
            const tabTitle = <Truncate width={tabTitleLength} >{pane.title}</Truncate>;//<Tooltip text={pane.title}></Tooltip>
            if (pane.key === 'pathway') {
                return <TabPane tab={tabTitle} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>
            }
            return <TabPane tab={tabTitle} key={pane.key} closable={pane.closable}><TimelineElement item={pane.content} user={user} getOnlyActivity /></TabPane>;
        })}
    </Tabs></div>
}

export default TimelineLayoutSider;