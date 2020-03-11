import { Tests } from '../components/tests';
import { AboutExam } from '../components/aboutexam';
import { Materials } from '../components/materials';
import { SignIn } from '../components/signin/SignIn';
import { SignUp } from '../components/signup/SignUp';

export interface IRoutesMap {
    path: string;
    component: React.Component | React.FC;
    exact: boolean;
    private: boolean;
}

export const routesMap: IRoutesMap[] = [
    {
        path: '/tests',
        component: Tests,
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
        component: SignUp,
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
