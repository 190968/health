import React from 'react';
import { withApollo } from 'react-apollo';
import { compose, withHandlers, withState, withProps, branch, renderComponen, lifecycle } from 'recompose';
import AliasElementBuilder, { prepareInput } from '../components/AliasElementBuilder';
import { Form } from 'antd';
import { modalHOC, withSpinnerWhileLoading } from "../modal";
import { PathwayBodyWithQuery } from "../components/AliasElementBuilder/containers/queries";
import { PLAN_ELEMENT_CHILDREN_QUERY } from "../../PlanElement/containers/queries";
import { getPlanElementLabelFromElement } from '../../../../../../../components/Plan/utils';

let queryOptions = {
    query: PLAN_ELEMENT_CHILDREN_QUERY,
    fetchPolicy: 'network_only'
}

const checkIfLeaf = (type) => {
    return type !== 'condition' && type !== 'decision';;
}


const enhance = compose(
    PathwayBodyWithQuery,
    // withHandlers({
    //     prepareInput: props => values => {
    //         return prepareInput(values);
    //     },
    // }),
    withApollo,


    withProps(props => {
        const { elements = [] } = props;
        //console.log(props);
        const { element = {} } = props;
        const { itemInfo = {} } = element || {};
        const { elementRoute = [] } = itemInfo || {};
        let options = elements.map(element => {

            const isLeaf = checkIfLeaf(element.type);
            const label = getPlanElementLabelFromElement(element);
            return {
                key: element.id,
                value: element.id,
                label: label,
                type: element.type,
                isLeaf: isLeaf,
            }

            // const haveMatch = elementRoute.filter(elementId => {
            //     elementId === element.id;
            // });

            //return option;
        });
        // elementRoute.map(elementId => {
        //     options = options.map(option => {
        //
        //     });
        //     return null;
        // });

        return { options }
    }),
    withState('options', 'setOptions', props => props.options),

    withApollo,

    withHandlers({
        loadData: props => selectedOptions => {
            const targetOption = selectedOptions[selectedOptions.length - 1];
            targetOption.loading = true;

            // load options lazily

            queryOptions.variables = {
                planId: props.plan.id,
                id: targetOption.value
            };

            props.client.query(queryOptions)
                .then(({ data: { loading, planElement: { childrenElements = [] } } }) => {

                    console.log(childrenElements);
                    if (!loading) {
                        targetOption.loading = false;
                        if (childrenElements.length > 0) {

                            const children = childrenElements.map(element => {
                                const isLeaf = checkIfLeaf(element.type);
                                return {
                                    key: element.id,
                                    value: element.id,
                                    label: getPlanElementLabelFromElement(element),
                                    type: element.type,
                                    isLeaf: isLeaf,
                                }
                            })

                            targetOption.children = children;
                            console.log([...props.options, props.options]);
                            props.setOptions([...props.options, props.options]);
                        } else {
                            targetOption.isLeaf = checkIfLeaf(targetOption.type);
                        }
                    }

                })
            setTimeout(() => {


            }, 1000);
            // load elements
            //console.log(selectedOptions);
        },

        modalTitle: props => values => {
            return props.id ? 'Edit Go To' : 'Add Go To';
        },
    }),
    lifecycle({
        componentDidMount() {
            // console.log(this.props);
            let { options, details = {} } = this.props;
            //console.log(element);
            //console.log(itemInfo);
            const { elementRoute = [] } = details || {};
            //console.log(elementRoute);
            let level = 0;
            options.map(option => {

                if (!option.isLeaf) {
                    //
                    const elementId = elementRoute[level] || false;
                    if (elementId === option.value) {
                        // if we have such route
                        this.props.loadData([option]);
                    }
                }

                return option;
            });
        }
    }),
)
export default enhance(AliasElementBuilder);



export const preparePlanElementAliasInput = (values) => {
    const { elementId = [], label, btnLabel } = values;
    const element = elementId[elementId.length - 1];
    return {
        elementId: element,
        elementRoute: elementId,
        label,
        buttonLabel: btnLabel
    }
}