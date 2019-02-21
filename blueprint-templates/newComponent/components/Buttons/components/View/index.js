import React from 'react';
import { FormattedMessage } from 'react-intl';
import { {{pascalCase $moduleName}}View } from '../../../../containers/View';

const ViewButton = props => {
    const { showModal, toggleModal, label, ...otherProps } = props;

    const { {{camelCase $moduleName}} } = otherProps || {};
    const { title } = {{camelCase $moduleName}} || {};

    return <React.Fragment>
        {showModal && <{{pascalCase $moduleName}}View {...otherProps} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || title}</a> 
    </React.Fragment>
}

export const {{pascalCase $moduleName}}ManagerButton = withToggleModal(ViewButton);
export default {{pascalCase $moduleName}}ManagerButton;