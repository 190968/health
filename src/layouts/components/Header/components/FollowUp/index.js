import React from 'react';
import {Icon, Button, Popover, Badge, Tooltip, Card} from 'antd';
import { EmptyList } from '../../../../../components/Loading';
import FollowUpButton from '../../../../../routes/Manager/components/Profile/components/Visits/containers/FollowUpButton';
import { FollowUpsList } from './containers/List';
const ButtonGroup = Button.Group;

const HeaderFollowUp = props => {
    const {showModal, toggleModal, followUps, ...otherProps} = props;
    const {total} = otherProps || {};
    const content = <FollowUpsList />;
    return <Popover placement="bottomRight" content={content} getPopupContainer={triggerNode => triggerNode.parentNode} 
                    //  visible={this.state.visible}
                    //  onVisibleChange={this.handleVisibleChange}
                     trigger="click" style={{width: 336}}>
                     <Badge count={total} overflowCount={999}><Icon type={'audit'} /></Badge>
            </Popover>;
    // return <React.Fragment>
    //     {/* {showModal && <GlobalSearchDrawer {...otherProps} asModal onHide={toggleModal} />} */}
    //     <ButtonGroup>
    //   <Button  size={'small'} icon="audit" />
    //   <Button  size={'small'} icon="schedule" />
    // </ButtonGroup>
    // </React.Fragment>
    // return 
}

export default HeaderFollowUp;