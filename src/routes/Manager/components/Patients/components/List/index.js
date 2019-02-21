import React from 'react';
import PatientsTable from '../../containers/PatientsTable';

const PatientsList = props => {
    const { onSearch, patients, ...otherProps } = props;
    
    return <React.Router>
        <PatientsTable  {...otherProps} patients={patients} 
    /*selectedCount={selectedCount} selectedObj={selectedObj} openShowButton={openShowButton} hideShowButton={hideShowButton} showButton={showButton} emitEmpty={emitEmpty} searchText={searchText} sliderChange={sliderChange}*/ 
    />
        </React.Router>
}
 
export default PatientsList;