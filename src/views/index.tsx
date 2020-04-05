//import Loadable from'react-loadable'
import { Loading } from '../components/index'
import Loadable from "./Loadable"


const DashBoard = Loadable({
    Loader: () => import('./dashboard/DashBoard'),
    Loading: Loading
})

const ArticleEdit = Loadable({
    Loader: () => import('./Article/ArticleEdit'),
    Loading: Loading
})

const Article = Loadable({
    Loader: () => import('./Article/ArticleList'),
    Loading: Loading
})

const NotFound = Loadable({
    Loader: () => import('./not-found/NotFound'),
    Loading: Loading
})

const Login = Loadable({
    Loader: () => import('./login/Login'),
    Loading: Loading
})

const SignUp = Loadable({
    Loader: () => import('./sign-up/SignUp'),
    Loading: Loading
})

const Settings = Loadable({
    Loader: () => import('./settings/Settings'),
    Loading: Loading
})
const Notification = Loadable({
    Loader: () => import('./notification/Notification'),
    Loading: Loading
})

const NoRight = Loadable({
    Loader: () => import('./no-right/NoRight'),
    Loading: Loading
});

const Profile = Loadable({
    Loader: () => import('./profile/Profile'),
    Loading: Loading
});




export {
    DashBoard,
    Article,
    ArticleEdit,
    NotFound,
    Login,
    Settings,
    Notification,
    NoRight,
    Profile,
    SignUp
}