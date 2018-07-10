import React from 'react';
import { compose, withState, withHandlers } from 'recompose';


cosnt PathwayFlowButtonPure = props => {
    
    return <React.Fragment>
        <Icon type="flow"/> View Flow
        </React.Fragment>
}

const enhance = compose(
    withState('openModal','setOpenModal', false),
    withHandlers({
        toggleView: props=> () => {
            props.setOpenModal(!props.openModal);
        }
    })
)
export const PathwayFlowButton = enhance(PathwayFlowButtonPure);