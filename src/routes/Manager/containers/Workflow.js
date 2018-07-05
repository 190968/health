import React from 'react';
import Workflow from '../components/Workflow';
import {compose,withStateHandlers} from 'recompose';

const enhance = compose(
    ///withQuery,
    withStateHandlers(
        (props) => (
            {
            searchText: '',
        }),
        {        
            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    workflow: props.workflow.map((record) => {
                        const match = record.title.match(new RegExp(searchText, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            title: (
                                <span>
                      {record.title.split( new RegExp(searchText, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty: ({searchText}) =>(value) => (
                {
                    searchText: '',
                     })
            })        

);
export default enhance(Workflow);