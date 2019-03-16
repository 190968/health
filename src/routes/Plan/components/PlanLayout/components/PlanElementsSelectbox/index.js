import React from 'react'
import {Row, Col, Tag, Affix } from 'antd';
import PlanElementBuilder from '../../containers/PlanElementBuilder';//PlanElementBuilder/containers/PlanElementManagerAdd
import PlanElementSelect from '../PlanElement/components/PlanElementSelect';
import { compose, withState, withProps } from 'recompose';
import { withToggleModal, withDrawer } from '../../../../../../components/Modal';


const PlanElementsSelectboxPure = props => {

    const {showModal, toggleModal, label, setType, asButton=true, ...otherProps} = props;
    const {mode, type} = otherProps;
    // return <React.Fragment>

    //     {showModal && (!element ? <PlanElementsSelectbox {...otherProps}  onHide={toggleModal} /> : <PlanElementBuilder  {...otherProps}  onHide={toggleModal} />)}
    //     {element ? <span onClick={toggleModal}>{label ? label : 'Edit'}</span> : <Button onClick={toggleModal} type={'primary'} icon={'plus'} >{label}</Button>}
    // </React.Fragment>

    return <>
    {type && <PlanElementBuilder {...otherProps} onHide={toggleModal} />}

    <Affix><div style={{backgroundColor: '#ffffff'}}><PlanElementSelect mode={mode} onSelect={setType}  onHide={toggleModal} /></div></Affix>

    </>
}

const enhance = compose(
    withToggleModal,
    withState('type', 'setType', props =>props.type),
    withProps(props => {
        return {modalTitle: 'Select Element Type'}
    }),
    withDrawer
);
export const PlanElementsSelectbox = enhance(PlanElementsSelectboxPure);
export default PlanElementsSelectbox;

// export class PlanElementsSelectbox extends React.Component {
//     state = {
//         openAddElement:false,
//         type:''
//     }

//     static propTypes = {
//     };

//     static defaultProps = {
//         isBuilderMode:false,
//         parentId:'',// element
//         caseValue:'',// case iD(for options - it's option ID, for tracker - it's value)
//         mode: ''// section, introduction, lesson, pathway modes...
//     }

//     onSelect = (type) => {
//         this.setState({openAddElement:true, type})
//     }

//     hideElementAddModal = () => {
//         this.setState({openAddElement:false, type: ''});
//         console.log(this.props);
//         if (this.props.onHide) {
//             this.props.onHide();
//         }

//     }


//     render() {

//         const {mode} = this.props;


//         return (<Row gutter={5} >
//             </Row>)
//     }
// }

// export default PlanElementsSelectbox;