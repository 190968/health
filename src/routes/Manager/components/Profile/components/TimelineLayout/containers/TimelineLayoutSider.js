import React from 'react';
import TimelineLayoutSiderPure from '../components/TimelineLayoutSider';
import {compose, withProps, withHandlers, withState} from 'recompose';
import { getTimelineElementCardTitle } from '../components/Timeline/components/TimelineElement';
import PathwayContent from '../../Pathway/containers/PathwayContent';

const enhance = compose(
    withState('activeTab', 'setActiveTab', props => null),
    withProps(props => {
        const {elements=[], showPathway} = props;
        let {activeElement, activeTab} = props;
        //console.log(elements);
        let panes = elements.map((el, i) => {
            return { title: getTimelineElementCardTitle(el), content: el, key: 'item_'+el.id }
        });

        if (showPathway) {
            const pathTab = {title: 'Pathway', closable:false, content: <PathwayContent user={props.user} /*pathway={props.pathway} setPathway={props.setPathway}*/ />, key: 'pathway'};
            panes = [pathTab, ...panes];
            //activeTab = 'pathway';
        } else {
            //console.log('No pathway');
            // get the first element as active
            if (!activeElement && elements.length > 0) {
                activeElement = elements[0];
                activeTab = 'item_'+activeElement.id
            }
        }

        return {panes, activeTab}
    }),

    withHandlers({
        remove: props => (targetKey) => {
            let element = props.activeElement;
            let activeKey = props.activeTab || 'item_'+element.id;
 
            const {panes, showPathway} = props;
            let lastIndex;
            panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
           
            let newPanes = panes.filter(pane => pane.key !== targetKey);

            const oldPanesLength = newPanes.length;
            //console.log(newPanes);
            newPanes = newPanes.filter(pane => pane.key !== 'pathway');
            if (oldPanesLength !== newPanes.length) {
                lastIndex--;
            }
            //
            if (newPanes.length > 0) {
                if (lastIndex >= 0 && activeKey === targetKey) {
                    //console.log(newPanes);
                    if (newPanes.length === 1) {
                        lastIndex = 0;
                    }
                    element = newPanes[lastIndex].content;
                }
            } else {
                element = undefined;
            }
            const elements = newPanes.map(pane => {
                return pane.content;
            });

            if (activeKey === targetKey) {
                if (element) {
                    props.setActiveTab('item_'+element.id);
                } else if (showPathway) {
                    props.setActiveTab('pathway');
                }
            }
            props.updateElements(elements, element);
        }
    }),
    withHandlers({
        onChange: props => (targetKey) => {
            console.log(targetKey);
            props.setActiveTab(targetKey);
        },
        onEdit: props => (targetKey, action) => {
            props[action](targetKey);
        },
    })
)

export const TimelineLayoutSider = enhance(TimelineLayoutSiderPure);

export default TimelineLayoutSider;