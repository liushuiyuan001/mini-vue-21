import { ref, h } from './core/index.js'
export const App = {
   render(context) {
      // tag -> div
      // props
      // children -> 'heihei'
      
      // const div = document.createElement('div')
      // div.textContent = "Heihie mini-vue -> " + context.a.value
      // const p = document.createElement('p')
      // p.textContent = 'ppp'
      // div.append(p)

      // return div
      // return h('div', {id: 1}, 'heihei' + context.a.value)
    
      return h('div', {id: 1}, [h('p',{},'hehei' + context.a.value),h('p',{},'haha')])
},

   setup() {
       const a = ref(10)
       window.a = a
       return {
            a
       }
   }
}
