import React from 'react';
import {Card} from 'antd';
import QualMeasuresTable from './components/Table';
export const UserQualMeasures = props => {

    const {noCard=false, items=[], total=0, loading=false} = props;
   if (noCard) {
       return <QualMeasuresTable {...props}  />;
   }
    return (<Card type="table" loading={loading} title={'Quality Measures '+ (total > 0 ? ' ('+total+')' : '')} >
        <QualMeasuresTable {...props}  />
    </Card>)
}

export default UserQualMeasures;