import React from 'react';
import { List, Card } from 'antd';
import { getTreatmentElementLabel } from '../../../../../Forms/components/Treatment/components/ElementManager';
import { TreatmentFormElement } from '../../../../../Forms/components/Treatment/components/Elements/containers/Element';

export const TreatmentViewElements = props => {
    const {elements=[], itemLayout} = props;
   
    if (itemLayout === 'horizontal') {
      return <List 
      //  grid={{ gutter: 16, column: 2 }}
      itemLayout={'vertical'}
       dataSource={elements}
       renderItem={(element, i) => (
         <List.Item  key={i} >
          <h3>{getTreatmentElementLabel(element)}</h3>
          <TreatmentFormElement element={element} itemLayout={itemLayout} />
         </List.Item>
       )}
      />
    }
    return <List 
    //  grid={{ gutter: 16, column: 2 }}
    itemLayout={'vertical'}
    split={false}
     dataSource={elements}
     renderItem={(element, i) => (
       <List.Item  key={i} >
         <Card title={getTreatmentElementLabel(element)}><TreatmentFormElement element={element}/></Card>
       </List.Item>
     )}
    />
}

export default TreatmentViewElements;