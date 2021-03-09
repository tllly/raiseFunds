import Vue from 'vue'
import store from '../store/index.js'
//debugger
const has = Vue.directive('has', {
  　　inserted: function (el, binding, vnode) {
        let authList = store.getters.getAuthList
        let flag = false
        for (var i = 0; i < authList.length; i++) {
            if (binding.value == authList[i]) {
                flag = true
                break;
            }
        }
        if(!flag){
            el.style.display='none'
        }
  　　}
});

let hasFn = function(code){
  console.log(code)
  let authList = store.getters.getAuthList
  let flag = false
  for (var i = 0; i < authList.length; i++) {
    if (code == authList[i]) {
        flag = true
    }
  }
  return flag
}

export {has,hasFn}