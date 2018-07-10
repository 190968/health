import React from 'react';
import {Button,Col} from 'antd';
import CreateNew from './containers/CreateNew';
import SelectExesting from './containers/SelectExesting';

const ProvidersManager = props => {
const {visibleModal,openModal,hideModal,visibleModalExesting,openModalExesting,hideModalExesting} =props;
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

export default ProvidersManager;