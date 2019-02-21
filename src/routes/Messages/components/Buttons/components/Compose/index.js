import React from 'react';
import {Tooltip, Button} from 'antd';
import { withToggleModal } from '../../../../../../components/Modal';
import { MessageCompose } from '../../../../containers/Compose';


const ComposeButtonPure = props => {
    const { showModal, toggleModal, ...otherProps } = props;
    const title = 'Create Conversatio';//<FormattedMessage values={{ title: <FormattedMessage {...DefaultI18nEn.attachment} /> }} {...DefaultI18nEn.addSomething} />;
    return <React.Fragment>
        {showModal && <MessageCompose {...otherProps} onHide={toggleModal} />}

        <Tooltip title={title} >
            <Button icon={'form'} size={'small'} onClick={toggleModal} ></Button>
        </Tooltip>
    </React.Fragment>
    // <Tooltip title="Create Conversation"><Icon type="form" onClick={toggleCreate} style={{color: '#1a8fff'}}/></Tooltip>
}

export const MessageComposeButton = withToggleModal(ComposeButtonPure);