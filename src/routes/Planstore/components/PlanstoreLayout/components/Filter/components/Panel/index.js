import React from 'react';
import CheckBoxGroup from '../CheckBoxGroup';
import CheckComponent from '../CheckBox';
import SliderComponent from '../Slider';
import {Card, Collapse} from 'antd';

const Panel = Collapse.Panel;

const FilterPanel = props => {
    const{filter, activeFilters, onSuccess} = props;

        return (
            <React.Fragment>
                {filter.fields.map((field) => {
                    if (field.type === "checkboxGroup") {
                        return <CheckBoxGroup key={field.value}
                                              activeFilters={activeFilters}
                                              code={filter.code} item={field} onSuccess={onSuccess} />
                    } else if (field.type === "checkbox") {
                        return <CheckComponent key={field.value}
                                               activeFilters={activeFilters}
                                               code={filter.code} fields={field} onSuccess={onSuccess} />
                    } else if (field.type === "range") {
                        return <SliderComponent key={field.value}
                                                activeFilters={activeFilters}
                                                onSuccess={onSuccess} code={filter.code} fields={field}/>
                    }
                    return field;
                })}
            </React.Fragment>
             )
}
export default FilterPanel