import React from 'react'
import PropTypes from 'prop-types';
import Tracker from '../../../../../../Tracker';
//import Tracker from '../../../../../../../containers/Tracker';

export class TrackerField extends React.Component {

    constructor(props) {
        super(props);
        //console.log(props);
        const {report} = this.props;
        this.state = {
            isReported: false,
            value: (report && report.value) || null
        };
        this.handleChange = this.handleChange.bind(this);
        this.triggerChange = this.triggerChange.bind(this);
    };
    static propTypes = {
        id: PropTypes.number,
        date: PropTypes.string,
        // info: PropTypes.object.isRequired,
        list_id: PropTypes.string,
        reportKey: PropTypes.number,
        column: PropTypes.number,
        report: PropTypes.object,
    };

    toggleReported = () => {

        if (this.state.isReported) {
            this.setState({isReported:false});
        } else {
            this.setState({isReported:true});
        }

    }

    componentWillReceiveProps = (nextProps) => {

        const {report} = nextProps;
        this.setState({
            value: (report && report.value) || null
        });

        if (!nextProps.loading) {
            /*this.setState({
                //value,
                fetching: false,
            });*/
        }
    }

    componentWillMount = () => {
        /*const {id, quantity, report} = this.props;
        const report_id = report.id || 0;
        if (report_id) {
            this.setState({isReported: true});
        }*/
    }

    handleChange = (value) => {
        clearTimeout(this.timer);

        this.setState({ value });

        this.timer = setTimeout(function () {this.triggerChange(value)}.bind(this), 1000);


    }

    triggerChange(value) {
        //e.preventDefault();
        //console.log(value);
        const { onChange} = this.props;

        return onChange(value);
    }

    render() {

        const {tracker} = this.props;
        const {info=tracker} = this.props;
        const report_value = this.state.value;
        console.log(report_value);
        return (<Tracker item={info.measurement} value={report_value} onChange={this.handleChange} />)
    }
}



export default TrackerField
