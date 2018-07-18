import React from 'react';
import {Button,Col} from 'antd';
import CreateNew from './containers/CreateNew';
import SelectExesting from './containers/SelectExesting';
import {compose, withState, withHandlers,} from 'recompose';

const ProvidersManager = props => {
const {visibleModal,openModal,hideModal,visibleModalExesting,openModalExesting,hideModalExesting} = props;
console.log(visibleModal,visibleModalExesting);
    return <React.Fragment >
                    <Col  offset={5} span={5}>
                        <Button type="primary" onClick={openModal}>Create new</Button>   
                    </Col>
                    <Col offset={1}  span={5}>            
                        <Button type="primary" onClick={openModalExesting} >Select from Existing</Button>
                    </Col>
                    <br/><br/>
                    {visibleModal && <CreateNew onHide={hideModal} />}
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
export default enhance(ProvidersManager);