//vue3 -> custom renderer 自定义渲染器
function createElement(type){
   return document.createElement(type)
}
function createTextNode(type) {
    return  document.createTextNode(type)
}

function patchProp(el,key,preValue,nextValue) {
      if(nextValue === null) {
            el.removeAttribute(key)
            return
      }
      el.setAttribute(key,nextValue)
}

function insert(el,parent) {
    parent.append(el)
}
function remove(el,parent) {
    parent.removeChild(el)
}

export function mountElement(vnode, container) {
  //vnode -> element
  //tag
  const { tag, props,children} = vnode
  const element = (vnode.el = createElement(tag))  //props
  Object.keys(props).forEach((key) => {
     patchProp(element,key,null,props[key]) 
  })
  //children
  //string / array
  if(typeof children === 'string'){
        const textNode = createTextNode(children)
        insert(textNode,element)
      }else if(Array.isArray(children)){
        children.forEach((v) => mountElement(v, element))
  }
 
  //insert
  insert(element,container)

}

//n1 old
//n2 new
export function diff(n1,n2) {
 // tag
 if(n1.tag !== n2.tag) {
    n1.el.replaceWith( n2.el = createElement(n2.tag))
 } else {
   // props
  // 1. old {id: 1} new:{id:2}
  const el = (n2.el = n1.el)
  const {props: oldProps } = n1
  const {props: newProps } = n2

  Object.keys(newProps).forEach(key => {
        if(oldProps[key] !== newProps[key]){
              patchProp(el,key,oldProps[key],newProps[key])
        }
  }) 
  // 2.old {id,class} new:{id}
  Object.keys(oldProps).forEach(key => {
        if(!newProps[key]){
              patchProp(el,key,oldProps[key],null)
        }
  })
  //children
  const { children: oldChildren } = n1
  const { children: newChildren } = n2

  if(typeof newChildren === 'string') {
      if(typeof oldChildren === 'string'){
            if(newChildren !== oldChildren) {
                  el.textContent = newChildren
            }
      } else if(Array.isArray(oldChildren)) {
            el.textContent = newChildren
      }
   }else if(Array.isArray(newChildren)){
      if(typeof oldChildren === 'string'){
            //reset
            el.textContent = ''
            newChildren.forEach(v => mountElement(v,el))
      }else if(Array.isArray(oldChildren)) {
            // 1.依次对比
            // 2.old 多出来的时候需要删除
            // 3.new 多查出来的需要创建
            const len = Math.min(newChildren.length,oldChildren.length)
            for (let i = 0; i < len; i++) {
                  const oldChild = oldChildren[i];
                  const newChild = newChildren[i]
                  diff(oldChild,newChild)
            }

            //old > new -> remove
            if(oldChildren.length > len) {
                  for(let i = len; i < oldChildren.length; i++) {
                        const vnode = oldChildren[i]
                        remove(vnode.el,el)
                  }
            }

            //new > old -> crete
            if(newChildren.length > len) {
                  for(let i = len; i < newChildren.length; i++) {
                        const vnode = newChildren[i]
                        mountElement(vnode,el)
                  }
            }


      }
   }

 }

}