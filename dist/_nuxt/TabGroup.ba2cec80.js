import m from"./TabGroupHeader.ad1f1a10.js";import{f,r as d,P as r,D as b}from"./entry.88b089c0.js";import"./IconCustom.vue.9d57cb0a.js";import"./states.829fe2cd.js";import"./state.aabe14df.js";import"./_plugin-vue_export-helper.c27b6911.js";const k=f({setup(v,{slots:u}){const n=d(null),o=d(0),c=i=>{o.value=i,n.value&&b(()=>{n.value.scrollIntoView({block:"nearest"})})};return()=>{const i=u.default(),s=[],l=i.filter(e=>{var a;return((a=e==null?void 0:e.type)==null?void 0:a.tag)==="tab-item"?(e.props.name?s.push(e.props.name):s.push("Tab"),!0):!1});return r("div",{ref:n,class:"my-4 border border-gray-200 rounded"},[r(m,{activeTabIndex:o.value,tabNameArr:s,"onUpdate:activeTabIndex":c}),r("div",{class:"p-2"},l.map((e,a)=>{var t,p;return r("div",{style:{display:a===o.value?"block":"none"}},[r("div",[((p=(t=e.children)==null?void 0:t.default)==null?void 0:p.call(t))||r("div")])])}))])}}});export{k as default};