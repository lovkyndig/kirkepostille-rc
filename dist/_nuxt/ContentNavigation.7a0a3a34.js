import{a as f,u as d,h as l}from"./query.ed5b6bce.js";import{u as m}from"./state.8117f36d.js";import{_ as p}from"./nuxt-link.131b110c.js";import{f as v}from"./navigation.619158e5.js";import{f as g,U as h,V as _,R as y,Q as i}from"./entry.fbc4eb33.js";import"./preview.f1444e5c.js";const C=g({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(s){const{query:t}=h(s),n=_(()=>{var a;return typeof((a=t.value)==null?void 0:a.params)=="function"?t.value.params():t.value});if(!n.value&&m("dd-navigation").value){const{navigation:a}=f();return{navigation:a}}const{data:o}=await d(`content-navigation-${l(n.value)}`,()=>v(n.value));return{navigation:o}},render(s){const t=y(),{navigation:n}=s,o=e=>i(p,{to:e._path},()=>e.title),a=(e,u)=>i("ul",u?{"data-level":u}:null,e.map(r=>r.children?i("li",null,[o(r),a(r.children,u+1)]):i("li",null,o(r)))),c=e=>a(e,0);return t!=null&&t.default?t.default({navigation:n,...this.$attrs}):c(n)}}),R=C;export{R as default};