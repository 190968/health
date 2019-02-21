import gql from 'graphql-tag';

export const {{pascalCase $moduleName}}Fragment = gql`
    fragment {{pascalCase $moduleName}} on {{pascalCase  $moduleName}} {
        id
    }
`;

export const {{pascalCase $moduleName}}FullFragment = gql`
    fragment {{pascalCase $moduleName}}Full on {{pascalCase $moduleName}} {
        ...{{pascalCase $moduleName}}
    }
    ${ {{pascalCase $moduleName}}Fragment }
`;

export const {{pascalCase $moduleName}}ManageFragment = gql`
    fragment ProviderManage on Provider {
        ...{{pascalCase $moduleName}}
    }
    ${ {{pascalCase $moduleName}}Fragment }
`;