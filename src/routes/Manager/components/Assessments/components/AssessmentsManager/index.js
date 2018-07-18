import React from 'react';
import {Button,Col} from 'antd';
import Assessment from './containers/Assessment';
import SelectExesting from './containers/SelectExesting';
import {compose, withState, withHandlers,} from 'recompose';

const AssessmentsManager = props => {
const {visibleModal,openModal,hideModal,visibleModalExesting,openModalExesting,hideModalExesting} = props;
console.log(visibleModal,visibleModalExesting);
    return <React.Fragment >
                    <Col  offset={7} span={5}>
                        <Button type="primary" onClick={openModal}>Assessment</Button>   
                    </Col>
                    <Col offset={1}  span={6}>            
                        <Button type="primary" onClick={openModalExesting} >Form</Button>
                    </Col>
                    <br/><br/>
                    {visibleModal && <Assessment onHide={hideModal} />}
                    {visibleModalExesting && <SelectExesting onHide={hideModalExesting} />}
                   
        </React.Fragment>
}
const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
    withState('visibleModalExesting', 'setOpenManagerExesting', false),
    withHandlers({
        openModal: props => () => {
            props.setOpenManager(true);
        },
        hideModal: props => () => {
            props.setOpenManager(false);
        },
        openModalExesting: props => () => {
            props.setOpenManagerExesting(true);
        },
        hideModalExesting: props => () => {
            props.setOpenManagerExesting(false);
        }
    }),
);
export default enhance(AssessmentsManager);