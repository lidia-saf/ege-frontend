import { Tests } from '../components/tests';
import { AboutExam } from '../components/aboutexam';
import { Materials } from '../components/materials';
import { SignIn } from '../components/signin/SignIn';
import { Home } from '../components/home/Home';
import { Login } from '../components/login/Login';
import { QuestionPage } from '../components/tests/questionPage/QuestionPage';
import { TestPage } from '../components/tests/testpage/TestPage';
import { DevPage } from '../common/devpage/DevPage';
import { Admin } from '../components/admin/Admin';
import { AdminMaterials } from '../components/admin/adminmaterials/AdminMaterials';

export interface IRoutesMap {
    path: string;
    component: React.Component | React.FC;
    exact: boolean;
    hidden: boolean;
}

export const routesMap: IRoutesMap[] = [
    {
        path: '/',
        component: Home,
        exact: true,
        hidden: false
    },
    {
        path: '/tests',
        component: Tests,
        exact: true,
        hidden: false
    },
    {
        path: '/tests/:testId',
        component: TestPage,
        exact: true,
        hidden: false
    },
    {
        path: '/tests/:testId/question/:questionNumber',
        component: QuestionPage,
        exact: true,
        hidden: false
    },
    {
        path: '/aboutexam',
        component: AboutExam,
        exact: true,
        hidden: false
    },
    {
        path: '/materials',
        component: DevPage,
        exact: true,
        hidden: false
    },
    {
        path: '/signup',
        component: Login,
        exact: true,
        hidden: false
    },
    {
        path: '/signin',
        component: SignIn,
        exact: true,
        hidden: false
    },
    {
        path: '/admin',
        component: Admin,
        exact: true,
        hidden: true
    }
];
