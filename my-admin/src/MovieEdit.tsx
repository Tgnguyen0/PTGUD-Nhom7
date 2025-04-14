import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, EditProps } from "react-admin";

// Custom Edit component for the "movie" resource
export const MovieEdit = (props: EditProps) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="_id" label="ID" disabled /> {/* Display _id as read-only */}
            <TextInput source="Title" />
            <TextInput source="Year" />
            <TextInput source="Rated" />
            <TextInput source="Released" />
            <TextInput source="Runtime" />
            <TextInput source="Genre" />
            <TextInput source="Director" />
            <TextInput source="Writer" />
            <TextInput source="Actors" />
            <TextInput source="Plot" multiline /> {/* Use multiline for longer text */}
            <TextInput source="Language" />
            <TextInput source="Country" />
            <TextInput source="Awards" />
            <TextInput source="Poster" /> {/* This is a URL; you could use an ImageInput if you want to upload images */}
            {/* Handle the nested Ratings array */}
            <ArrayInput source="Ratings">
                <SimpleFormIterator>
                    <TextInput source="Source" />
                    <TextInput source="Value" />
                    <TextInput source="_id" label="Rating ID" disabled />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="Metascore" />
            <TextInput source="imdbRating" />
            <TextInput source="imdbVotes" />
            <TextInput source="imdbID" />
            <TextInput source="Type" />
            <TextInput source="Response" />
            <TextInput source="createdAt" disabled /> {/* Timestamps are typically read-only */}
            <TextInput source="updatedAt" disabled />
            <TextInput source="__v" disabled /> {/* Mongoose versioning field, typically read-only */}
        </SimpleForm>
    </Edit>
);