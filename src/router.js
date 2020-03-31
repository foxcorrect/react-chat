import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Layout from './containers/view/index';
import Overview from './containers/view/overvoew';
import MyMine from './containers/view/mymine';
import AddIn from './containers/view/addin';

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
                                <Route path="/joinin" component={AddIn} />
                            </Switch>
                        </Layout>
                    )}></Route>

                </Switch>
            </Router>
        </div>
    )
}

export default RouterConfig;