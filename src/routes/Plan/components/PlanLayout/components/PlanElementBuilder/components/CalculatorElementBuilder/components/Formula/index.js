import React, { useState } from 'react';
import {Form, Input, Mentions, Button} from 'antd';
import {compose, withProps, withHandlers, withState} from 'recompose';
import './index.less';
const { Option, getMentions } = Mentions;
// const { toString, toContentState, getMentions, Nav } = Mention;

const Formula = props => {
    const {formula, loading, trackers, fields=[], onChange} = props;

    const [prefix, setPrefix] = useState('@');

    const onSearch = (_, prefix) => {
        console.log(prefix, 'prefixprefix');
        setPrefix(prefix);
    }
    console.log(props, 'props');
    const suggestions = {
        '@': trackers,
        '#': fields,
    }
    const items = suggestions[prefix];
    return <Mentions
        loading={loading}
        notFoundContent="No Trackers found"
        suggestions={suggestions}
        prefix={['@', '#']}
        defaultValue={formula}
        onChange={onChange}
        onSearch={onSearch}

        //onChange={validateFormula}
        //onSearchChange={onSearchChange}
    >
        {items.map((item, i) => {
            const {label} = item;
            if (!label) {
                return null;
            }
            return <Option key={i} value={label.split(' ').join('_')}>{label}</Option>
        })}

    </Mentions>
}


const enhance = compose(
    withState('formula', 'setFormula', props => props.value),
    withHandlers({
        onChange: props => value => {
            // console.log(value);
            props.onChange(value);

            const {trackers:trackersInit, fields} = props;

            const mentions = getMentions(value, {prefix: '@'});// mentions with @ or #
            // const mentions2 = getMentions(value, {prefix: '#'});// mentions with @ or #
            console.log(mentions, 'mentions');
            console.log(trackersInit, 'trackersInit');

            let trackers = [];
            mentions.map(mention => {
                const {prefix, value} = mention;
                const valueUnformatted = value.split('_').join(' ');
                console.log(valueUnformatted);
                const item = trackersInit.find(item => item.label === valueUnformatted);
                console.log(item);
                if (item) {
                    trackers.push(item);
                }
                
                return null;
            });
            console.log(trackers);
            props.form.setFieldsValue({trackers});

            return false;
           

            const suggestions = {
                '@': trackersInit,
                '#': fields,
            }
            console.log(trackersInit);
            console.log(value, 'value');
            // return false;
            //console.log();
           
            
            // props.setFormula(value);



            // //
            // console.log(toString(value));
            // const formula = formatFormula(toString(value));
            // const state = toContentState(formula);
            // console.log(toString(value));
            // console.log(formula);
            // console.log(toString(state));
            // //props.setFormula(toContentState(formula));
            // //props.setFormula(toContentState('@afc163'));
            // //console.log(formula);
            // console.log(value);
            // console.log(props);
            // //props.onChange(formula);
        },
    })
)

export default enhance(Formula);

export const formatFormula = formula => {
    if (!formula || formula === '') {
        return formula;
    }
    //console.log(formula);
    let x = formula;
    const separators = ['+', '-', '(', ')', '*', '/', '^'];
    for (var i = 0; i < separators.length; i++) {
        var rg = new RegExp("\\" + separators[i], "g");
        x = x.replace(rg, " " + separators[i] + " ");
    }
    x = x.split('  ').join(' ');// remove double spaces
    return x;
}