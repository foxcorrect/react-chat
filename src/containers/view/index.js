import * as React from 'react';
import styles from './index.less';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.children}
                </div>
                <div className={styles.footer}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}