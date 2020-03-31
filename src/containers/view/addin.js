import * as React from 'react';
import styles from './index.less';
import RcSelect, { Option } from 'rc-select';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';
import './select.less';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import { connect } from 'dva';

const format = 'YYYY-MM-DD HH:mm:ss';
function getFormat(time) {
    return time ? format : 'YYYY-MM-DD';
}


export default connect(state => ({
    provinceList: state.login.provinceList,
    cityList: state.login.cityList
}))(class AddIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editData: {
                borthDate: ''
            },
            showDate: false,
            open: false,
            provinceList: [],
            cityList: [],
            streetList: [],

        };
        this.calendarContainerRef = React.createRef();
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'login/getProvinceList'
        }).then(() => {
            this.setState({ provinceList: this.props.provinceList })
        })
    }
    changeXing = (value) => {
        console.log(value);
    }
    onMouseDown = () => {
        this.setState({
            isMouseDown: true,
        });
    }
    onFocus = () => {
        if (!this.state.open && this.state.isMouseDown) {
            this.setState({
                isMouseDown: false,
            });
        } else {
            this.setState({
                open: true,
            });
        }
    }
    getCalendarContainer = () => this.calendarContainerRef.current;
    onOpenChange = (open) => {
        this.setState({
            open,
        });
    }
    onChange = (value, type) => {
        if (type == 'province') {
            this.props.dispatch({
                type: 'login/getCityList',
                payload: value
            }).then(() => {
                this.setState({ cityList: this.props.cityList })
            })
        }
        if (type == 'city') {
            this.state.cityList.map(item => {
                if (item.name == value) {
                    this.setState({ streetList: item.districts })
                }
            })
        }
        let { editData } = this.state;
        editData[type] = value;
        this.setState({ editData })
    }
    render() {
        const xingzuo = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
        const sexList = [{ name: '女', value: 1 }, { name: '男', value: 0 }];
        const { editData } = this.state;
        const state = this.state;
        const calendar = (<Calendar
            locale={zhCN}
            style={{ zIndex: 1001 }}
            dateInputPlaceholder="please input"
            format={'YYYY-MM-DD HH:mm:ss'}
            // timePicker={state.showTime ? timePickerElement : null}
            defaultValue={this.props.defaultCalendarValue}
            showDateInput={state.showDateInput}
            // disabledDate={disabledDate}
            focusablePanel={false}
        />);
        return (
            <div>
                <form className={styles.form}>
                    <p className={styles.form_title}>基本信息</p>
                    <div className={styles.form_item}>
                        <p className={`${styles.item_name} ${styles.required}`}>昵称</p>
                        <input type={'text'} placeholder={'请输入您的昵称'} className={styles.item_content} />
                    </div>
                    <div className={styles.form_item}>
                        <p className={`${styles.item_name} ${styles.required}`}>微信ID</p>
                        <input type={'text'} placeholder={'请输入您的微信ID'} className={styles.item_content} />
                    </div>
                    <div className={styles.form_item}>
                        <p className={`${styles.item_name} ${styles.required}`}>星座</p>
                        <RcSelect
                            allowClear
                            placeholder="placeholder"
                            style={{ width: '100%' }}
                            animation="slide-up"
                            showSearch
                            onChange={(value) => this.changeXing(value)}
                        >
                            {
                                xingzuo.map((item, index) => {
                                    return (
                                        <Option key={index} value={item}>{item}</Option>
                                    )
                                })
                            }
                        </RcSelect>
                    </div>
                    <div className={styles.form_item}>
                        <p className={`${styles.item_name} ${styles.required}`}>自我介绍</p>
                        <input type={'text'} placeholder={'请输入您的自我介绍'} className={styles.item_content} />
                    </div>
                    <div className={styles.form_item}>
                        <p className={`${styles.item_name} ${styles.required}`}>星座</p>
                        <RcSelect
                            allowClear
                            placeholder="placeholder"
                            style={{ width: '100%' }}
                            animation="slide-up"
                            showSearch
                            onChange={(value) => this.changeSex(value)}
                        >
                            {
                                sexList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    )
                                })
                            }
                        </RcSelect>
                    </div>
                    <div className={styles.form_item}>
                        <p className={`${styles.item_name} ${styles.required}`}>出生日期</p>
                        <DatePicker
                            animation="slide-up"
                            calendar={calendar}
                            value={state.value}
                            onChange={(value, ...arg) => this.onChange(value, 'brothDate')}
                            getCalendarContainer={this.getCalendarContainer}
                            onOpenChange={this.onOpenChange}
                            open={state.open}
                            style={{ zIndex: 1001 }}
                        >
                            {
                                ({ value }) => {
                                    return (
                                        <span className={styles.item_content} tabIndex="0" onMouseDown={this.onMouseDown} onFocus={this.onFocus}>
                                            <input
                                                placeholder="请选择出生日期"
                                                disabled={state.disabled}
                                                readOnly
                                                tabIndex="-1"
                                                className={`${styles.item_content}`}
                                                value={editData.borthDate}
                                            />
                                            <div ref={this.calendarContainerRef} />
                                        </span>
                                    );
                                }
                            }
                        </DatePicker>
                    </div>
                    <div className={styles.form_item}>
                        <p className={`${styles.item_name} ${styles.required}`}>居住地址</p>
                        <RcSelect
                            allowClear
                            placeholder="省"
                            style={{ width: '30%' }}
                            animation="slide-up"
                            showSearch
                            value={editData.province}
                            onChange={(value, ...arg) => this.onChange(value, 'province')}
                        >
                            {
                                this.state.provinceList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.name}>{item.name}</Option>
                                    )
                                })
                            }
                        </RcSelect>
                        <RcSelect
                            allowClear
                            placeholder="市"
                            style={{ width: '30%' }}
                            animation="slide-up"
                            showSearch
                            onChange={(value, ...arg) => this.onChange(value, 'city')}
                        >
                            {
                                this.state.cityList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.name}>{item.name}</Option>
                                    )
                                })
                            }
                        </RcSelect>
                        <RcSelect
                            allowClear
                            placeholder="区"
                            style={{ width: '30%' }}
                            animation="slide-up"
                            showSearch
                            onChange={(value, ...arg) => this.onChange(value, 'street')}
                        >
                            {
                                this.state.streetList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.name}>{item.name}</Option>
                                    )
                                })
                            }
                        </RcSelect>
                    </div>
                </form>
            </div>
        )
    }
})

