import s from"./ContentSlot.b305f197.js";import{f as o,Q as f,U as u,a7 as m}from"./entry.f993f9e6.js";import"./node.ce9b70e5.js";const l=o({name:"Markdown",extends:s,setup(t){const{parent:e}=m(),{between:n,default:a}=f(),r=u(()=>typeof t.unwrap=="string"?t.unwrap.split(" "):["*"]);return{fallbackSlot:a,tags:r,between:n,parent:e}}});export{l as default};