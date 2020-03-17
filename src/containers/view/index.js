import * as React from 'react';
import styles from './index.less';
import '../../fonts/home/style.css';
import '../../fonts/person/style.css';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.container}>
                    {this.props.children}
                </div>
                <div className={`${styles.display_com} ${styles.flex_direction_row} ${styles.justify_content_flex_center} ${styles.footer}`}>
                    <div className={`${styles.display_com} ${styles.flex_direction_row} ${styles.justify_content_flex_center} ${styles.align_items_center} ${styles.dispaly_width}`}>
                        <div className={styles.div_algin + ' ' + styles.cursor_pointer}>
                            <p><i className="icon-home" /></p>
                            <label>首页</label>
                        </div>
                    </div>
                    <div className={`${styles.display_com} ${styles.flex_direction_row} ${styles.justify_content_flex_center} ${styles.align_items_center} ${styles.dispaly_width}`}>
                        <div className={styles.div_algin + ' ' + styles.cursor_pointer}>
                            <p><i className="icon-person" /></p>
                            <label>我的</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}