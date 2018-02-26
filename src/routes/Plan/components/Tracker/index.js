import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less';
import VMasker from "vanilla-masker";
import { Input } from 'antd';

export default class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:props.value
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        onChange: PropTypes.function,
        item: PropTypes.object,
        value: PropTypes.number
    };
    static defaultProps = {
        value: ''
    };

    onChange(event) {
        const {inputMask} = this.props.item;

        let value = event.target.value;
        value = inputMask != '' ? VMasker.toPattern(value, inputMask) : VMasker.toNumber(value);
        this.setState({value:value});
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value);
        }
    }

    render() {
        const {item} = this.props;
        const {value} = this.state;

        const {units, inputMask} = item;
        const unitsName = units.name;
        let className = "tracker-input"+(value ? ' tracker-input-reported' : '');

        return (<Input className={className}
            value={value}
            //formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, '/')}
            formatter={value => {
                if (inputMask != '') {
                    return VMasker.toPattern(value, inputMask)
                } else {
                    return VMasker.toNumber(value);
                }
            }}
            //parser={value => VMasker.toPattern(value, inputMask)}
            //parser={value => value.replace(/\$\s?|(,*)/g, '')}
            placeholder={unitsName}
            onChange={this.onChange}
        />)
    }
}

export class TrackerUncontrolled extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value:props.value
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        item: PropTypes.object,
        value: PropTypes.float
    };
    static defaultProps = {
        value: null
    };

    onChange(value) {
        this.setState({value:value});
    }

    render() {
        const {item} = this.props;

        const {value} = this.state;
        const {units, inputMask} = item;
        const unitsName = units.name;
        console.log(value);
        let className = "tracker-input"+(value ? ' tracker-input-reported' : '');

        return (<Input className={className}
            value={value}
            //formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, '/')}
            formatter={value => {

                if (inputMask != '') {

                    return VMasker.toPattern(value, inputMask)
                } else {

                    return VMasker.toNumber(value);
                }

            }}
            //parser={value => VMasker.toPattern(value, inputMask)}
            //parser={value => value.replace(/\$\s?|(,*)/g, '')}
            placeholder={unitsName}
            onChange={this.onChange}
        />)
    }
}