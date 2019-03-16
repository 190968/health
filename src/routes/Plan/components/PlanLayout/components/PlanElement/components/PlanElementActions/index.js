import React from 'react'
import PropTypes from 'prop-types';
import {
    SortableHandle,
} from 'react-sortable-hoc';
import PlanElementBuilder from '../../../../containers/PlanElementBuilder';
import {Icon, Tooltip, Button} from 'antd';
import './index.less'
import PlanElementsSelectboxPure from '../../../../components/PlanElementsSelectbox';
import { withToggleModal, withDrawer } from '../../../../../../../../components/Modal';
import { compose, defaultProps } from 'recompose';
import { PlanElementManagerButton } from '../../../../../../../../components/Plan/components/Builder/components/Buttons/components/ElementManager';
import { PlanElementDeleteButton } from '../../../../../../../../components/Plan/components/Builder/components/Buttons/containers/DeleteElement';


const DragHandle = SortableHandle(() => <Tooltip title="Sort"><span className="sorter-handler"></span></Tooltip>);


const PlanElementActions = (props) => {
    //console.log(props);
    let {element, i:order, openEditElement, toggleEditElement, deleteElement, addAfterElement, hideOrder, buttons=[]} = props;
    // let button =
    // console.log(openEditElement, 'openEditElement');
    // if (order !== null ) {
    //     return <React.Fragment>
    //         <PlanElementsSelectbox {...props} id="" type="" onHide={hideOrder} />
    //         {openEditElement && <PlanElementBuilder {...props} onHide={toggleEditElement} />}
    //     </React.Fragment>
    // } else if (openEditElement) {
    //     return <PlanElementBuilder {...props} onHide={toggleEditElement} />;
    // }
    if (buttons.length > 0) {
        return buttons.map((button, i) => {
            switch(button) {
                case 'addBefore':
                    return <React.Fragment key={i}>
                        <Tooltip key={i} title="Add First Element"  ><PlanElementManagerButton {...props} element={null} order={0} shape="round"  label={'Add First Element'} /></Tooltip>
                    </React.Fragment>
                    break;
                case 'addAfter':
                    // const {order} = element || {};
                    return <React.Fragment key={i}>
                        <Tooltip key={i} title="Add Element Here" onClick={props.addAfterElement} ><PlanElementManagerButton {...props}  element={null} order={order+1} shape="round"  label={'Add Element Here'} /></Tooltip>
                    </React.Fragment>
                    break;
            }
        })
    }
    return (<div>
        <DragHandle /> <PlanElementManagerButton {...props} /> <PlanElementDeleteButton  {...props}  />
    </div>)

}

export default PlanElementActions;


const enhance = compose(
    defaultProps({
        modalTitle: 'Select Element'
    }),
    withDrawer
);
const PlanElementsSelectbox = enhance(PlanElementsSelectboxPure);
