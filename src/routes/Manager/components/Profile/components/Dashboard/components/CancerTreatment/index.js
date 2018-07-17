import React from 'react';
import {Row, Col, Card, Divider, Radio} from 'antd';
import './index.less';
import CancerTreatmentDrugCombinations from './components/CancerTreatmentDrugCombinations';
import CancerTreatmentMarkers from './components/CancerTreatmentMarkers';
import {withHandlers,withState} from 'recompose';

const CancerTreatment = props => {
    const {treatment={}, user, loading=false, curTab, toggleTabs} = props;
    console.log(treatment, 'treatment');
    return <React.Fragment><Card title="Treatment Options" loading={loading}><Row style={{marginBottom:24}}>
        <Col sm={8}><div className={'ct-block'}><div className={'number'}>2</div><div className={'text'}>Actionable Markers</div></div></Col>
        <Col sm={8}><div className={'ct-block'}><div className={'number'}>17</div><div className={'text'}>Matching Drugs</div></div></Col>
        <Col sm={8}><div className={'ct-block'}><div className={'number'}>153</div><div className={'text'}>Relevant Combinations</div></div></Col>
    </Row>
    <Divider><Radio.Group defaultValue="combinations" buttonStyle="solid" onChange={toggleTabs}>
        <Radio.Button value="combinations">Combinations</Radio.Button>
        <Radio.Button value="descriptions">Description of Markers</Radio.Button>
    </Radio.Group>
    </Divider>

        {curTab === 'descriptions' && <CancerTreatmentMarkers user={user} treatment={treatment} />}
        {curTab === 'combinations' && <CancerTreatmentDrugCombinations user={user} treatment={treatment} />}
    </Card>
    </React.Fragment>
    ;
}

export default withState(
    'curTab', 'setCurTab', 'combinations'
)(withHandlers({
    toggleTabs: props => (e) => {

        props.setCurTab(e.target.value);
    }
})(CancerTreatment));