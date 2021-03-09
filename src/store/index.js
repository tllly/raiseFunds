import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
        authList:null, //权限列表
	},
	actions:{
        setAuthList({commit,state},name){
            commit("setCurPath", name);
        },

    },
	mutations:{
        setAuthList(state,name){
            state.authList = name
        },

	},
	getters:{
        getAuthList(state){
            return state.authList
        },
	}
})

