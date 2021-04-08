import { effect } from './index.js'
import { mountElement, diff } from './renderer.js'
export  function createApp(rootComponent) {
      return {
            mount(rootContainer) {
                 const result = rootComponent.setup()
                 let isMounted = false
                 let prevSubTree
                 effect(() => {
                   if(!isMounted) {
                        //vnode
                        isMounted = true
                        const subTree = rootComponent.render(result)
                        console.log(subTree);
                        rootContainer.textContent = ''
                        
                        // vnode -> mountElement
                        mountElement(subTree, rootContainer)
                        //  rootContainer.append(element)
                        prevSubTree = subTree
                  }else {
                         
                        const subTree = rootComponent.render(result)
                         //update
                         
                        console.log(prevSubTree, subTree) 
                        diff(prevSubTree,subTree)
                        prevSubTree = subTree 
                  }  
                   

                 })

            }
      }
}