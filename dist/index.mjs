import*as r from"dot-wild";var h=(d,n,p={})=>{if(d==null)return null;let{reverse:c=!1,deleteMappedValues:f=!0,deleteEmptyParents:b=!0,keepUnmappedValues:i=!0}=p,e;return i?e=d:Array.isArray(d)?e=[]:e={},Object.keys(n).forEach(o=>{let s=c?n[o]:o,u=c?o:n[o],a=r.get(i?e:d,s);if(a!==void 0&&(Array.isArray(a)&&u.includes("*")?a.forEach((t,l)=>{let g=u.replace("*",l.toString());e=r.set(e,g,t)}):e=r.set(e,u,a),i&&f&&(e=r.remove(e,s),b))){let t=s.substring(0,s.includes(".")?s.lastIndexOf("."):0);for(;t&&t!=="";){let l=r.get(e,t);Array.isArray(l)&&l.length===0?e=r.remove(e,t):typeof l=="object"&&Object.keys(l).length===0&&(e=r.remove(e,t)),t=t.includes(".")?t.substring(0,t.lastIndexOf(".")):""}}}),e},m=h;export{m as default};
