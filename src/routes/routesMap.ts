import { Tests } from '../components/tests';
import { AboutExam } from '../components/aboutexam';
import { Materials } from '../components/materials';
import { SignIn } from '../components/signin/SignIn';
import { Home } from '../components/home/Home';
import { Login } from '../components/login/Login';
import { QuestionPage } from '../components/tests/questionPage/QuestionPage';

export interface IRoutesMap {
    path: string;
    component: React.Component | React.FC;
    exact: boolean;
    private: boolean;
}

export const routesMap: IRoutesMap[] = [
    {
        path: '/',
        component: Home,
        exact: true,
        private: false
    },
    {
        path: '/tests',
        component: Tests,
        exact: true,
        private: false
    },
    {
        path: '/tests/question/:id',
        component: QuestionPage,
        exact: true,
        private: false
    },
    {
        path: '/aboutexam',
        component: AboutExam,
        exact: true,
        private: false
    },
    {
        path: '/materials',
        component: Materials,
        exact: true,
        private: false
    },
    {
        path: '/signup',
        component: Login,
        exact: true,
        private: false
    },
    {
        path: '/signin',
        component: SignIn,
        exact: true,
        private: false
    }
];
