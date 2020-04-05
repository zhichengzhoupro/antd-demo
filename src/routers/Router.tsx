import {
    DashBoard,
    Article,
    ArticleEdit,
    NotFound,
    Login,
    Settings,
    Notification, NoRight, Profile,SignUp
} from '../views'


export const mainRoutes = [
    {
        pathName : '/404',
        component: NotFound
    },
    {
        pathName : '/login',
        component: Login
    },
    {
        pathName : '/signup',
        component: SignUp
    }
];

export const adminRoutes: Route[] = [
    {
        pathName : '/admin/dashboard',
        component: DashBoard,
        title: "DashBoard",
        iconComponent: () =>  import('@ant-design/icons/DashboardOutlined'),
        isNav: true,
        exact: false,
        roles: ['001', '002', '003']
    },
    {
        pathName : '/admin/article',
        component: Article,
        exact: true,
        title: "Articles",
        iconComponent: () =>  import('@ant-design/icons/UnorderedListOutlined'),
        isNav: true,
        roles: ['001', '002']
    },
    {
        pathName : '/admin/article/edit/:id',
        component: ArticleEdit,
        isNav :false,
        exact: false,
        title: '',
        iconComponent:'',
        roles: ['001']
    },
    {
        pathName : '/admin/settings',
        component: Settings,
        title: "Settings",
        iconComponent: () =>  import('@ant-design/icons/SettingOutlined'),
        isNav: true,
        exact: false,
        roles: ['001']
    },
    {
        pathName : '/admin/notification',
        component: Notification,
        title: "Notification",
        iconComponent: () =>  import('@ant-design/icons/NotificationOutlined'),
        isNav: true,
        exact: false,
        roles: ['001', '002', '003']
    },
    {
        pathName : '/admin/noright',
        component: NoRight,
        title: "Notification",
        iconComponent: () =>  {},
        isNav: false,
        exact: false,
        roles: ['001', '002', '003']
    },
    {
        pathName : '/admin/profile',
        component: Profile,
        title: "Profile",
        iconComponent: () =>  import('@ant-design/icons/UserOutlined'),
        isNav: true,
        exact: false,
        roles: ['001', '002', '003']
    },
];

export interface Route {
    pathName : string;
    component: any;
    title: string,
    iconComponent: any;
    isNav: boolean;
    exact: boolean;
    roles?: string[]
}
