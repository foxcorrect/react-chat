import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Layout from './containers/view/index';
import Overview from './containers/view/overvoew';
import MyMine from './containers/view/mymine';

function RouterConfig({ history }) {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Redirect exact from="/" to="/overview" ></Redirect>
                    <Route path="/" render={() => (
                        <Layout>
                            <Switch>
                                <Route path="/overview" component={Overview} />
                                <Route path="/personal" component={MyMine} />
                            </Switch>
                        </Layout>
                    )}></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default RouterConfig;