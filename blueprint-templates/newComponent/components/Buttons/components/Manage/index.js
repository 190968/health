import React from 'react';
import { Button, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { {{pascalCase $moduleName}}Manager } from '../../../../containers/Manager';

const ManagerButtonPure = props => {
    const { showModal, toggleModal, icon, label, button=true, title='{{pascalCase $moduleName}}', ...otherProps } = props;
    const { {{camelCase $moduleName}} } = otherProps || {};
    const {id} = {{camelCase $moduleName}} || {};
    //  console.log(props);
    const textValues = { title, edit: id && id !== '' };
    const titleButton = <FormattedMessage values={textValues} {...DefaultI18nEn.addEditSomething} />;
    return <React.Fragment>
        {showModal && <{{pascalCase $moduleName}}Manager {...otherProps} onHide={toggleModal} />}
        <AddEditButton type={'primary'} label={label} button={button} icon={icon} size={'default'} tooltip={titleButton} onClick={toggleModal} />
    </React.Fragment>
}

export const {{pascalCase $moduleName}}ManagerButton = withToggleModal(ManagerButtonPure);
export default {{pascalCase $moduleName}}ManagerButton;