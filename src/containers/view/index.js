import * as React from 'react';
import styles from './index.less';
import '../../fonts/home/style.css';
import '../../fonts/person/style.css';
import { withRouter } from 'dva/router'

export default withRouter(class Layout extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.container}>
                    {this.props.children}
                </div>
                {
                    (this.props.location && this.props.location.pathname && (this.props.location.pathname == '/overview' || this.props.location.pathname == '/personal')) ? (
                        <div className={`${styles.display_com} ${styles.flex_direction_row} ${styles.justify_content_flex_center} ${styles.footer}`}>
                            <div
                                className={`${styles.display_com} ${styles.flex_direction_row} ${styles.justify_content_flex_center} ${styles.align_items_center} ${styles.dispaly_width}`}>
                                <div
                                    onClick={() => {
                                        console.log('111');
                                        this.props.history.push('/overview')
                                    }}
                                    className={styles.div_algin + ' ' + styles.cursor_pointer}>
                                    <p><i className="icon-home" /></p>
                                    <label>首页</label>
                                </div>
                            </div>
                            <div
                                className={`${styles.display_com} ${styles.flex_direction_row} ${styles.justify_content_flex_center} ${styles.align_items_center} ${styles.dispaly_width}`}>
                                <div
                                    onClick={() => {
                                        console.log('222');
                                        this.props.history.push('/personal')
                                    }}
                                    className={styles.div_algin + ' ' + styles.cursor_pointer}>
                                    <p><i className="icon-person" /></p>
                                    <label>我的</label>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

            </div>
        )
    }
})