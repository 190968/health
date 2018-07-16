import React from 'react';
import {Row, Col, Card, Divider} from 'antd';
import './index.less';
import CancerTreatmentDrugCombinations from './components/CancerTreatmentDrugCombinations';

const CancerTreatment = props => {

    return <React.Fragment><Card title="Treatment Options"><Row style={{marginBottom:24}}>
        <Col sm={8}><div className={'ct-block'}><div className={'number'}>2</div><div className={'text'}>Actionable Markers</div></div></Col>
        <Col sm={8}><div className={'ct-block'}><div className={'number'}>17</div><div className={'text'}>Matching Drugs</div></div></Col>
        <Col sm={8}><div className={'ct-block'}><div className={'number'}>153</div><div className={'text'}>Relevant Combinations</div></div></Col>
    </Row>
    <Divider>Combinations</Divider>
    <CancerTreatmentDrugCombinations />
    </Card>
    </React.Fragment>
    ;
}

export default CancerTreatment;