// import React from 'react';
// import {Link} from 'react-router-dom';
// import {Table, Button} from 'antd';
// import { withToggleModal } from '../../../../../../../../components/Modal';
// import PlanElementBuilder from '../../../../../../../Plan/components/PlanLayout/containers/PlanElementBuilder';
// import { compose, withState } from 'recompose';
// import {PlanElementsSelectbox} from '../../../../../../../Plan/components/PlanLayout/components/PlanElementsSelectbox';

// export const PlanElementManagerButtonPure = props => {
//     const {showModal, toggleModal, label, asButton=true, ...otherProps} = props;
//     // console.log(userAssessment);
//     const {element, type} = props;
//     return <React.Fragment>

//         {showModal && (!element ? <PlanElementsSelectbox {...otherProps}  onHide={toggleModal} /> : <PlanElementBuilder  {...otherProps}  onHide={toggleModal} />)}
//         {element ? <span onClick={toggleModal}>{label ? label : 'Edit'}</span> : <Button onClick={toggleModal} type={'primary'} icon={'plus'} >{label}</Button>}
//     </React.Fragment>
// }

// // const enhance = compose(
// //     withToggleModal,
// //     // withState('type', 'setType', props => props.type)
// // );
// export const PlanElementManagerButton = withToggleModal(PlanElementManagerButtonPure);