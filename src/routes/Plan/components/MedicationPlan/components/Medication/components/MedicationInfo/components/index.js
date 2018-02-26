import React from 'react'
import {Tooltip, Icon, Row, Col, Popconfirm, Popover} from 'antd';
import {
    FormattedMessage,
} from 'react-intl';
import styles from './index.less';
import MedicationEditForm from '../../MedicationEdit/containers'
import MedicationChartPopup from '../../MedicationChartPopup';
import MedicationFullDetails from '../../../containers/MedicationFullDetails';

export class MedicationInfo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
        this.state = {visible: false, showDetails: false};
        this.toggleDetails = this.toggleDetails.bind(this);
    };

    static propTypes = {};
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    handleDelete = () => {
        const {deleteMed, info, user_id} = this.props;
        const {id} = info;
        return deleteMed(id, user_id);//, !this.state.isClicked, this.toggleCoin);
    }

    toggleDetails() {
        this.setState({showDetails:!this.state.showDetails});
    }

    iconClick() {
        this.setState({visible: true});
    }

    render() {
        const {loading, user_id, date} = this.props;
        if (loading) {
            return (<div>Loading</div>)
        }

        // const userId = 24038;
        const {id, drug} = this.props.info;

        const {name, dosage} = drug;

        const content = <div>
            <Tooltip title="Details"><Icon type="info-circle-o" onClick={this.toggleDetails}/></Tooltip> <MedicationChartPopup
            item={this.props.info} userId={user_id} date={date} label="Weekly" /> <Tooltip title="Edit"><Icon onClick={() => this.iconClick()}
                                        type="edit"/></Tooltip> <Tooltip title="Delete"><Popconfirm
            title="Are you sure you want to delete this medication?" onConfirm={this.handleDelete}
            okText="Yes" cancelText="No"><Icon type="delete"/></Popconfirm></Tooltip>
        </div>;
        return (
            <div>


                {this.state.visible &&
                <MedicationEditForm id={id}
                                    userId={user_id}
                                    date={date}
                                    title={<FormattedMessage id="plan.medicationplan.medication.medicationedit.modal"
                                                             defaultMessage="Edit" description="Edit"/>}
                                    onCancel={this.handleCancel}/>}


                {this.state.showDetails && <MedicationFullDetails id={id}  userId={user_id}
                                                                  date={date} onClose={this.toggleDetails} />}


                <Row>
                    <Col>
                        <Popover content={content} trigger="hover">{name}</Popover> <Icon type="video-camera"/> <Icon type="camera-o"/>
                    </Col>
                    <Col style={{fontSize: '0.8em'}}>
                        {dosage}
                    </Col>
                </Row>

            </div>
        )
    }
}


export default MedicationInfo
