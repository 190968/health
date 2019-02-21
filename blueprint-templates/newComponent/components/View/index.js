import React from 'react';
import moment from 'moment';
const {{pascalCase $moduleName}}View = props => {
    const {{{camelCase $moduleName}}} = props;
    const {id, title, createdOn} = {{camelCase $moduleName}} || {};

    let details = [
        ['Name', title],
        ['Created', createdOn && moment(createdOn).format('lll')],
    ]

    return <DescriptionList details={details}/>
}

export default {{pascalCase $moduleName}}View;