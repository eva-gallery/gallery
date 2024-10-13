// functions

import { getData, setData } from './functions/get.data';
import { capitalize, lowerCase } from './functions/tools';

// components
import AdminAction from './components/action';
import {
    AdminBoolean,
    AdminDate,
    AdminEmail,
    AdminFlag,
    AdminHtml,
    AdminIcon,
    AdminLink,
    AdminLinkIcon
} from './components/components';
import AdminButton from './components/button';
import AdminDetail from './components/detail';
import AdminEdit from './components/edit';
import AdminForm from './components/form';
import AdminImage from './components/image';
import AdminInsert from './components/insert';
import AdminList from './components/list';
import AdminLogin from './components/login';
import AdminMap from './components/map';
import AdminNavbar from './components/navbar';
import { AdminTable, AdminTableRow, AdminTableColumn } from './components/table';



// Objekt V s komponentami a typom AdminType
export const A = {
    getData: getData,
    setData: setData,
    lowerCase: lowerCase,
    capitalize: capitalize,

    Action: AdminAction,
    Boolean: AdminBoolean,
    Button: AdminButton,
    Date: AdminDate,
    Detail: AdminDetail,
    Edit: AdminEdit,
    Email: AdminEmail,
    Flag: AdminFlag,
    Form: AdminForm,
    Html: AdminHtml,
    Icon: AdminIcon,
    Image: AdminImage,
    Insert: AdminInsert,
    Link: AdminLink,
    LinkIcon: AdminLinkIcon,
    List: AdminList,
    Login: AdminLogin,
    Map: AdminMap,
    Navbar: AdminNavbar,
    Table: AdminTable,
    TableRow: AdminTableRow,
    TableColumn: AdminTableColumn,

};
