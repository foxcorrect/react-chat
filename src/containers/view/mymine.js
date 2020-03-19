import * as React from 'react';
import styles from './index.less'

export default class MyMine extends React.Component {
    componentDidMount() {

    }
    render() {
        const currUser = { name: 'test', password: '****', token: '123456' };
        // const currUser = '';
        if (currUser) {
            return (
                <div style={{ height: '100%', paddingTop: '15px', backgroundColor: '#F5F5F5' }}>
                    <div className={styles.mine_top}></div>
                    <div className={styles.mine_container}></div>
                </div>
            )
        } else {
            return (
                <div>
                    <img src={require('../../img/unlogin.jpg')} />
                </div>
            )
        }

    }
}