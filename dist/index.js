var y=Object.create;var p=Object.defineProperty;var W=Object.getOwnPropertyDescriptor;var A=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,V=Object.prototype.hasOwnProperty;var v=(e,r)=>{for(var d in r)p(e,d,{get:r[d],enumerable:!0})},g=(e,r,d,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of A(r))!V.call(e,o)&&o!==d&&p(e,o,{get:()=>r[o],enumerable:!(n=W(r,o))||n.enumerable});return e};var E=(e,r,d)=>(d=e!=null?y(P(e)):{},g(r||!e||!e.__esModule?p(d,"default",{value:e,enumerable:!0}):d,e)),O=e=>g(p({},"__esModule",{value:!0}),e);var I={};v(I,{default:()=>x});module.exports=O(I);var s=E(require("dot-wild")),j=(e,r,d={})=>{if(e==null)return null;let{reverse:n=!1,deleteMappedValues:o=!0,deleteEmptyParents:h=!0,keepUnmappedValues:f=!0}=d,t;return f?t=e:Array.isArray(e)?t=[]:t={},Object.keys(r).forEach(u=>{let i=n?r[u]:u,b=n?u:r[u],c=s.get(f?t:e,i);if(c!==void 0&&(Array.isArray(c)&&b.includes("*")?c.forEach((l,a)=>{let m=b.replace("*",a.toString());t=s.set(t,m,l)}):t=s.set(t,b,c),f&&o&&(t=s.remove(t,i),h))){let l=i.substring(0,i.includes(".")?i.lastIndexOf("."):0);for(;l&&l!=="";){let a=s.get(t,l);Array.isArray(a)&&a.length===0?t=s.remove(t,l):typeof a=="object"&&Object.keys(a).length===0&&(t=s.remove(t,l)),l=l.includes(".")?l.substring(0,l.lastIndexOf(".")):""}}}),t},x=j;
