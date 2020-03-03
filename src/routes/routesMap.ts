import { Tests } from '../components/tests';
import { AboutExam } from '../components/aboutexam';
import { Materials } from '../components/materials';

export interface IRoutesMap {
    path: string;
    component: React.Component | React.FC;
    exact: boolean;
}

export const routesMap: IRoutesMap[] = [
    {
        path: '/tests',
        component: Tests,
        exact: true
    },
    {
        path: '/aboutexam',
        component: AboutExam,
        exact: true
    },
    {
        path: '/materials',
        component: Materials,
        exact: true
    }
];
