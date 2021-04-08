// 目标mni-vue
// 响应式
import { ref, reactive, effect } from './node_modules/@vue/reactivity/dist/reactivity.esm-browser.js'

const a = ref(10)
window.a = a


// let b;

// //computed
// effect(() => {
//       b = a.value + 10
//       console.log('b',b);
// })


// const  view = () => {
//       //div
//       document.querySelector("#app").textContent = null
//       const div = document.createElement('div')
//       div.textContent = "Heihie mini-vue -> " + a.value
//       document.querySelector("#app").append(div)
// }


// effect(() => {
//       view()
// })


// const App = {
//       // template -> render
//       render(context) {
//            effect(() => {                 
//                   //1. 性能问题-> diff
//                   //2. 公共流程 -> 抽离出去
//                   document.querySelector("#app").textContent = null
//                   const div = document.createElement('div')
//                   div.textContent = "Heihie mini-vue -> " + context.a.value
//                   const p = document.createElement('p')
//                   p.textContent = 'ppp'
//                   div.append(p)
//                   document.querySelector("#app").append(div)
//            }) 
//       },

//       setup() {
//             const a = ref(10)
//             window.a = a
//             return {
//                   a
//             }

//       }

// }


// App.render(App.setup())

import { App } from './App.js';
///vue 3
import { createApp } from './core/index.js'
createApp(App).mount(document.querySelector('#app'))