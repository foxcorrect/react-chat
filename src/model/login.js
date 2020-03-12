import { routerRedux } from "dva/router";

export default {
    namespace: 'login',

    state: {
        currUser: {}
    },

    subscriptions: {

    },

    effects: {
        * login({ payload }, { put }) {
        }
    },

    reducers: {
        updateCurrUser(state, { payload }) {
            return {
                ...state,
                currUser: payload
            };
        },
    }
};