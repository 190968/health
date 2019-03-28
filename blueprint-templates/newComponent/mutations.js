
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { {{pascalCase $moduleName}}Fragment } from './fragments';
import {branch, compose} from 'recompose';
import { with{{pascalCase $moduleName}}ManageQuery } from './queries';

const DELETE_{{upperCase $moduleName}}_MUTATION = gql`
    mutation DELETE_{{upperCase $moduleName}}($id: UID!){
        delete{{pascalCase $moduleName}}(id:$id)
    }
`;
const CREATE_{{upperCase $moduleName}}_MUTATION = gql`
    mutation CREATE_{{upperCase $moduleName}}($input: {{pascalCase $moduleName}}Input!){
        create{{pascalCase $moduleName}}(input:$input) {
            ...{{pascalCase $moduleName}}
        }
    }
    ${ {{pascalCase $moduleName}}Fragment }
`;
const UPDATE_{{upperCase $moduleName}}_MUTATION = gql`
    mutation UPDATE_{{upperCase $moduleName}}($id: UID!, $input: {{pascalCase $moduleName}}Input!){
        update{{pascalCase $moduleName}}(id:$id, input: $input) {
            ...{{pascalCase $moduleName}}
        }
    }
    ${ {{pascalCase $moduleName}}Fragment }
`;

export const withDelete{{pascalCase $moduleName}}Mutation = graphql(DELETE_{{upperCase $moduleName}}_MUTATION, {
    props: ({ownProps:{ {{lowerCase $moduleName}} }, mutate }) => ({
        delete{{pascalCase $moduleName}}: () => {
            return mutate({variables: { id: {{lowerCase $moduleName}}.id}});
        },
    }),
});

const withCreate{{pascalCase $moduleName}}Mutation = graphql(CREATE_{{upperCase $moduleName}}_MUTATION, {
    props: ({ownProps, mutate }) => ({
        create{{pascalCase $moduleName}}: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdate{{pascalCase $moduleName}}Mutation = graphql(UPDATE_{{upperCase $moduleName}}_MUTATION, {
    props: ({ownProps:{ {{lowerCase $moduleName}} }, mutate }) => ({
        update{{pascalCase $moduleName}}: (input) => {
            return mutate({variables: { id: {{lowerCase $moduleName}}.id, input}});
        },
    }),
});

const withUpdate{{pascalCase $moduleName}}MutationQuery = compose(
    with{{pascalCase $moduleName}}ManageQuery,
    withUpdate{{pascalCase $moduleName}}Mutation
);
export const withCreateOrUpdate{{pascalCase $moduleName}} = branch(props => props.{{camelCase $moduleName}}, withUpdate{{pascalCase $moduleName}}MutationQuery, withCreate{{pascalCase $moduleName}}Mutation);