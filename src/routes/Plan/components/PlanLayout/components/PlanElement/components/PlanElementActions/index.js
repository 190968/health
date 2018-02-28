import React from 'react'
import PropTypes from 'prop-types';
import PlanElementEdit from '../../containers/PlanElementEditModal';
import {Icon, Modal} from 'antd';
const confirm = Modal.confirm;




export class PlanElement extends React.Component {

    state = {
        openEditElement:false
    }
    static propTypes = {
        id: PropTypes.integer
    };

    static defaultProps = {
        id: '',
        planId: ''
    }

    deleteElement = (id) => {
        const {deleteElement} = this.props;
        confirm({
            title: 'Do you want to delete these element?',
            //content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                deleteElement(id);
            },
        });
    }

    openEditElement = (id) => {
        this.setState({openEditElement:true});
    }

    hideElementEditModal = () => {
        this.setState({openEditElement:false});
    }

    render() {
        let {id, planId} = this.props;

        return (<div style={{float:'right'}}>
            {this.state.openEditElement && <PlanElementEdit {...this.props} onHide={this.hideElementEditModal} />}
            <Icon type="edit" onClick={() => this.openEditElement(id)} /> <Icon type="delete" onClick={() => this.deleteElement(id)} /></div>)
    }
}



export default PlanElement
