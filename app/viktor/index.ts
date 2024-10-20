// index.ts

import { viktorGetData } from './@api/functions/viktor.get.data';

// components
import ViktorAction from './@api/components/viktor.action';
import ViktorBoolean from './@api/components/viktor.boolean';
import ViktorBreadcrumb from './@api/components/viktor.breadcrumb';
import ViktorButton from './@api/components/viktor.button';
import ViktorDate from './@api/components/viktor.date';
import ViktorDetail from './@api/components/viktor.detail';
import ViktorEdit from './@api/components/viktor.edit';
import ViktorEmail from './@api/components/viktor.email';
import ViktorFlag from './@api/components/viktor.flag';
import ViktorHtml from './@api/components/viktor.html';
import ViktorIcon from './@api/components/viktor.icon';
import ViktorInsert from './@api/components/viktor.insert';
import ViktorLink from './@api/components/viktor.link';
import ViktorList from './@api/components/viktor.list';
import ViktorLogin from './@api/components/viktor.login';
import ViktorMap from './@api/components/viktor.map';
import ViktorNavbar from './@api/components/viktor.navbar';
import ViktorProvider from './@api/components/viktor.provider';
import ViktorTable from './@api/components/viktor.table';

// Objekt V s komponentami a typom ViktorType
export const V = {
    getData: viktorGetData,

    Action: ViktorAction,
    Boolean: ViktorBoolean,
    Breadcrumb: ViktorBreadcrumb,
    Button: ViktorButton,
    Date: ViktorDate,
    Detail: ViktorDetail,
    Edit: ViktorEdit,
    Email: ViktorEmail,
    Flag: ViktorFlag,
    Html: ViktorHtml,
    Icon: ViktorIcon,
    Insert: ViktorInsert,
    Link: ViktorLink,
    List: ViktorList,
    Login: ViktorLogin,
    Map: ViktorMap,
    Navbar: ViktorNavbar,
    Provider: ViktorProvider,
    Table: ViktorTable,

};
