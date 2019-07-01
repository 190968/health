import gql from 'graphql-tag';

export const PersonalNoteFragment = gql`
    fragment PersonalNote on PersonalNote {
        id
        title
        note
        createdOn
    }
`;

export const PersonalNoteFullFragment = gql`
    fragment PersonalNoteFull on PersonalNote {
        ...PersonalNote
    }
    ${ PersonalNoteFragment }
`;

export const PersonalNoteManageFragment = gql`
    fragment PersonalNoteManage on PersonalNote {
        ...PersonalNote
    }
    ${ PersonalNoteFragment }
`;