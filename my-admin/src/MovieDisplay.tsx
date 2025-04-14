import {
    Datagrid,
    List,
    TextField,
    SearchInput,
    ListProps,
} from "react-admin";

// Define the filters array with SearchInput
const movieFilters = [
    <SearchInput source="q" alwaysOn />, // Search input for full-text search
];

// Typing the props parameter with ListProps from react-admin
export const MovieDisplay = (props: ListProps) => (
    <List {...props} filters={movieFilters}>
        <Datagrid>
            <TextField source="_id" label="ID" />
            <TextField source="Title" />
            <TextField source="Year" />
            <TextField source="Rated" />
            <TextField source="Released" />
            <TextField source="Runtime" />
            <TextField source="Genre" />
            <TextField source="Director" />
            <TextField source="Writer" />
            <TextField source="Actors" />
            <TextField source="Plot" />
            <TextField source="Language" />
        </Datagrid>
    </List>
);