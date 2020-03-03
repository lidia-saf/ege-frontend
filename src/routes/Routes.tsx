import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routesMap, IRoutesMap } from './routesMap';

interface Props {}

export const Routes: React.FC<Props> = () => {
    return (
        <Switch>
            {routesMap.map(({ path, component, exact }: IRoutesMap) => {
                return (
                <Route path={path} exact={exact}>{component}</Route>
                )
            })}
        </Switch>
    );
};