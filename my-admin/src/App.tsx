import { Layout } from "./Layout";
import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { MovieDisplay } from "./MovieDisplay";
import { MovieEdit } from "./MovieEdit";
import { UserDisplay } from "./UserDisplay";
import { authProvider } from "./authorProvider";
import { MovieCreate } from "./MovieCreate";
import { i18nProvider } from "./I18N";

export const App = () => (
    <Admin layout={Layout} dataProvider={dataProvider} authProvider={authProvider} >

        <Resource name="movie" list={MovieDisplay} edit={MovieEdit} create={MovieCreate} />
        <Resource name="users" list={UserDisplay} />
    </Admin>
);
