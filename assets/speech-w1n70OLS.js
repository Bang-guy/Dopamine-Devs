import{r as h}from"./index-D66CjrxA.js";/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=t=>t==null?void 0:t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function E(t,e,n=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:_(t),size:24,node:e,...n.length>0?{aliases:n}:{}}}/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=t=>{let e="",n=!1;for(const o of t){if(o==="-"||o==="_"||o<=" "){n=e.length>0;continue}e.length===0?e+=o.toLowerCase():e+=n?o.toUpperCase():o,n=!1}return e};/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=t=>{const e=P(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(...t)=>{const e=new Set;for(const n of t)if(typeof n=="string")for(const o of n.split(/\s+/))o&&e.add(o);return[...e].join(" ")};/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function C(t){return t!=null}function $(t,e={}){var g,w;const n=e.attributeNames??{},o=s=>n[s]??s,c=t.size??t.width??a.width,r=t.size??t.height??a.height,i=((g=t.aliases)==null?void 0:g.filter(s=>typeof s=="string"&&s.trim()!=="").map(s=>`lucide-${s}`))??[],f=[...t.name?[`lucide-${t.name}`]:[],...i],l=((w=e.className)==null?void 0:w.split(" ").filter(Boolean))??[],k=e.includeDefaultClasses===!1?m(...l):m("lucide",...f,...l),y=e.absoluteStrokeWidth?Number(e.strokeWidth??a["stroke-width"])*Number(t.size??t.width??a.width)/Number(e.size??e.width??a.width):e.strokeWidth??a["stroke-width"];return["svg",{...Object.entries(a).reduce((s,[u,d])=>(s[o(u)]=d,s),{}),..."color"in e&&e.color&&{[o("stroke")]:e.color},..."size"in e&&C(e.size)&&{[o("width")]:e.size,[o("height")]:e.size},..."width"in e&&C(e.width)&&{[o("width")]:e.width},..."height"in e&&C(e.height)&&{[o("height")]:e.height},[o("stroke-width")]:y,...k&&{[o("class")]:k},[o("viewBox")]:`0 0 ${c} ${r}`,...e.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},t.node.map(s=>{const[u,d,b]=s,S=e.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...d}:d;return b?[u,S,b]:[u,S]})]}/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function M(t,e={}){return $(t,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=t=>{if(t==null||typeof t!="object")return!1;for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&(e.startsWith("aria-")||e==="role"||e==="title")&&t[e]!=null)return!0;return!1},q=h.createContext({}),D=()=>h.useContext(q),F=h.forwardRef(({color:t,size:e,width:n,height:o,strokeWidth:c,absoluteStrokeWidth:r,nonScalingStroke:i,className:f="",children:l,iconNode:k=[],icon:y={node:k,aliases:[],size:24},...N},g)=>{const{size:w=24,strokeWidth:s=2,absoluteStrokeWidth:u=!1,nonScalingStroke:d=!1,color:b="currentColor",className:S=""}=D()??{},v=!!l||V(N),[z,W,L=[]]=M(y,{color:t??b,width:n??e??w,height:o??e??w,strokeWidth:c??s,absoluteStrokeWidth:r??u,nonScalingStroke:i??d,className:m(S,f),hasA11yProp:v,attributes:N});return h.createElement(z,{ref:g,...W},[...L.map(([I,j])=>h.createElement(I,j)),...Array.isArray(l)?l:[l]])});/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function O(t,e=[],n=[]){const o=typeof t=="string"?E(t,e,n):t,c=h.forwardRef(({className:r,...i},f)=>h.createElement(F,{ref:f,icon:o,className:r,...i}));return o.name&&(c.displayName=B(o.name)),c}/**
 * @license lucide-react v1.75.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};A.node;const U=O(A),p={en:"en-IN",hi:"hi-IN",mr:"mr-IN"};function H(t,e="en"){if(!window.speechSynthesis){x();return}if(window.speechSynthesis.speaking){window.speechSynthesis.cancel();return}const n=new SpeechSynthesisUtterance(t);n.lang=p[e]??"en-IN",n.rate=.9,n.pitch=1,n.volume=1;const o=window.speechSynthesis.getVoices(),c=p[e]??"en-IN",r=o.find(i=>i.lang===c)??o.find(i=>i.lang.startsWith(e));r&&(n.voice=r),n.onerror=()=>{x()},window.speechSynthesis.speak(n)}function x(t,e){console.warn("SpeechSynthesis unavailable and audio fallback not yet implemented.")}function G(){var t;(t=window.speechSynthesis)!=null&&t.speaking&&window.speechSynthesis.cancel()}export{U as V,H as a,O as c,G as s};
