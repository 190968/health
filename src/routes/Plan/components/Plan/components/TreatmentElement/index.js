import React from 'react'
import PropTypes from 'prop-types'
import {Card, Divider,List} from 'antd';
import TreatmentElementBlock from './components/TreatmentElementBlock';
import './index.less';
import TreatmentViewElements from '../../../../../Health/components/View/components/Treatment/components/Elements';

const TreatmentElement = ({item, plan, isPreviewMode, isBuilderMode, mode, handleReport=false, disabled=false}) => {
    const {elements} = item;
    return <TreatmentViewElements elements={elements} itemLayout={'horizontal'}/>
}
export default TreatmentElement;