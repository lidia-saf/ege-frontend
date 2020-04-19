import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routesMap, IRoutesMap } from './routesMap';
import { useGroupHandler } from '../utils/customhooks/GroupHandler';
import { authContext } from '../contexts/AuthContext';

interface Props {};

export const Routes: React.FC<Props> = () => {
    const { setIsUserAdminGroup, isUserAdminGroup } = React.useContext(authContext)
    useGroupHandler(setIsUserAdminGroup);

    return (
        <Switch>
            {routesMap.map(({ path, component, exact, hidden }: IRoutesMap) => {
                const Component = component;
                if (hidden && !isUserAdminGroup) {
                    return;
                }
                return (
                    <Route key={path} path={path} exact={exact}>
                        <Component />
                    </Route>
                )
            })}
        </Switch>
    );
};