import * as React from 'react';
import styles from './index.less';
import '../../fonts/chat/style.css';

export default class Overview extends React.Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <div className={styles.over_top}>
                    <p className={styles.over_top_title}>二进制女孩</p>
                    <h1 className={styles.over_top_subtitle}>有1就有0</h1>
                    <div className={styles.over_top_subtitle_desc}>
                        <div className={styles.over_top_box}></div>
                        <div className={styles.over_top_subtitle_desc_txt}>相亲才会赢</div>
                        <div className={styles.over_top_box}></div>
                    </div>

                </div>
                <div className={styles.over_container}>
                    <div className={`${styles.display_com} ${styles.over_item}`}>
                        <div className={`${styles.display_com} ${styles.flex_direction_row} ${styles.justify_content_flex_center} ${styles.align_items_center} ${styles.item_avatar}`}>
                            <span className={`${styles.avatar} ${styles.bk_edit}`}><i className="icon-edit" /></span>
                        </div>
                        <div className={`${styles.display_com} ${styles.align_items_center} ${styles.item_content}`}>
                            <div className={styles.item_content_txt}>
                                <p className={styles.item_content_title}>活动报名</p>
                                <p className={styles.item_content_subtitle}>点击报名一周CP活动，填写个人资料报名</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.display_com} ${styles.over_item}`}>
                        <div className={`${styles.display_com} ${styles.flex_direction_row} ${styles.justify_content_flex_center} ${styles.align_items_center} ${styles.item_avatar}`}>
                            <span className={`${styles.avatar} ${styles.bk_date}`}><i className="icon-date" /></span>
                        </div>
                        <div className={`${styles.display_com} ${styles.align_items_center} ${styles.item_content}`}>
                            <div className={styles.item_content_txt}>
                                <p className={styles.item_content_title}>每日签到</p>
                                <p className={styles.item_content_subtitle}>报名成功，每日与CP参与签到</p>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.display_com} ${styles.over_item}`}>
                        <div className={`${styles.display_com} ${styles.flex_direction_row} ${styles.justify_content_flex_center} ${styles.align_items_center} ${styles.item_avatar}`}>
                            <span className={`${styles.avatar} ${styles.bk_chat}`}><i className="icon-chat" /></span>
                        </div>
                        <div className={`${styles.display_com} ${styles.align_items_center} ${styles.item_content}`}>
                            <div className={styles.item_content_txt}>
                                <p className={styles.item_content_title}>聊天界面</p>
                                <p className={styles.item_content_subtitle}>报名成功，点击与CP发起会话</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}