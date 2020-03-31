import { routerRedux } from "dva/router";
import * as LoginService from '../containers/api/index';
import request from '../utils/request'

export default {
    namespace: 'login',

    state: {
        currUser: {},
        provinceList: [],
        cityList: []
    },

    subscriptions: {

    },

    effects: {
        * login({ payload }, { put }) {
        },
        * getProvinceList({ payload }, { call, put }) {
            let res = yield call(request.get, 'https://restapi.amap.com/v3/config/district?key=1d6f1191d4a3085cc149a9f8796afc50');
            if (res.info == 'OK') {
                yield put({
                    type: 'setProvinceCity',
                    provinceList: res.districts[0].districts
                })
            }
        },
        *getCityList({ payload }, { call, put }) {
            let res = yield call(request.get, `https://restapi.amap.com/v3/config/district?keywords=${payload}&subdistrict=3&key=1d6f1191d4a3085cc149a9f8796afc50`);
            if (res.info == 'OK') {
                yield put({
                    type: 'setProvinceCity',
                    cityList: res.districts[0].districts
                })
            }
        }
    },

    reducers: {
        updateCurrUser(state, { payload }) {
            return {
                ...state,
                currUser: payload
            };
        },
        setProvinceCity(state, { provinceList, cityList }) {
            return {
                ...state,
                provinceList, cityList
            };
        },
    }
};