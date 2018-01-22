import React from 'react'
import PropTypes from 'prop-types';
import Tracker from '../../../../../../Tracker';
//import Tracker from '../../../../../../../containers/Tracker';

export class TrackerField extends React.Component {

    constructor(props) {
        super(props);
        const {report} = this.props;
        this.state = {
            isReported: false,
            value: report && report.value || null
        };
        this.handleChange = this.handleChange.bind(this);
        this.triggerChange = this.triggerChange.bind(this);
    };
    static propTypes = {
        id: PropTypes.number,
        date: PropTypes.string,
        info: PropTypes.object.isRequired,
        list_id: PropTypes.string,
        reportKey: PropTypes.number,
        column: PropTypes.number,
        report: PropTypes.object,
    };

    toggleReported = () => {
        //console.log(this.state.isClicked);
        if (this.state.isReported) {
            this.setState({isReported:false});
        } else {
            this.setState({isReported:true});
        }
        //console.log(this.state.isClicked);
    }

    componentWillReceiveProps = (nextProps) => {
        //console.log(nextProps);
        const {report} = nextProps;
        this.setState({
            value: report && report.value || null
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

        this.timer = setTimeout(function () {this.triggerChange(value)}.bind(this), 500);


    }

    triggerChange(value) {
        //e.preventDefault();
        //console.log(value);
        //console.log(this.props);
        const { onChange, info, report, date, list_id, reportKey, column } = this.props;
        const {id} = info.measurement;
        let report_input = {id:(report && report.id ? report.id : 0), value:value, date:date, reportKey:reportKey, column:column};

        return onChange(id, report_input, list_id);
    }

    render() {
        //console.log(this.props);
        const {info, report} = this.props;

        //console.log(info);
        //console.log(report);
        const {id, label, units, inputMask} = info.measurement;
        const unit_id = units.id;
        const unit_name = units.name;
        const report_value = this.state.value;
        //console.log(report_value);
        //console.log(report_value);
        //const pattern = '/(\\d{3})(?=\\d)/g';
        //let inputMask = '999/999';
        //console.log(inputMask);
        //console.log(report_value);
        //let outputMask = '999/999';
        //console.log(report_value);
        //console.log(inputMask);
        //console.log(VMasker.toPattern(report_value, inputMask));
        //const hasReport = this.state.isClicked;
        //console.log(inputMaskRegex);
        //return (<InputMask value={report_value}  mask={inputMask} maskChar=" " onChange={this.handleChange} />)
        //console.log(this.handleChange);
        return (<Tracker item={info.measurement} value={report_value} onChange={() => (this.handleChange)} />)
    }
}



export default TrackerField
