import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routesMap, IRoutesMap } from './routesMap';

interface Props {};

export const Routes: React.FC<Props> = () => {
    return (
            <Switch>
                {routesMap.map(({ path, component, exact }: IRoutesMap) => {
                    const Component = component;
                    return (
                        <Route key={path} path={path} exact={exact}>
                            <Component />
                        </Route>
                    )
                })}
            </Switch>
    );
};