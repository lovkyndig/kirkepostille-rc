import s from"./ContentSlot.e09e0600.js";import{f as o,R as f,V as u,a8 as m}from"./entry.e1201b13.js";import"./node.930063c0.js";const l=o({name:"Markdown",extends:s,setup(t){const{parent:e}=m(),{between:n,default:a}=f(),r=u(()=>typeof t.unwrap=="string"?t.unwrap.split(" "):["*"]);return{fallbackSlot:a,tags:r,between:n,parent:e}}});export{l as default};