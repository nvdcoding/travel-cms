"use strict";(self.webpackChunkdu_lich_cms=self.webpackChunkdu_lich_cms||[]).push([[992],{7212:function(e,n,t){t.d(n,{j:function(){return r}});var r=t.p+"static/media/logo.feaf19761e28fa956a04.png"},6163:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var r=t(4165),a=t(5861),s=t(7313),i=(t(2980),t(6063)),u=t(3195),c=t(7786),o=t(9491),l=t(7212),h=t(1911),d=t(3648),f=t(623),m=t(6417);function p(){var e=(0,h.k6)(),n=function(){var n=(0,a.Z)((0,r.Z)().mark((function n(t){var a;return(0,r.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,f.D2)("/auth/login-admin",t);case 2:if(200!==(a=n.sent).statusCode){n.next=10;break}i.ZP.success("\u0110\u0103ng nh\u1eadp th\xe0nh c\xf4ng"),(0,d.o4)(a.returnValue.accessToken),(0,d.zI)(a.returnValue.refreshToken),e.push("/"),n.next=11;break;case 10:return n.abrupt("return",i.ZP.error("T\xe0i kho\u1ea3n kh\xf4ng t\u1ed3n t\u1ea1i"));case 11:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,s.useEffect)((function(){}),[]),(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)("div",{className:"sign-in_wrapper",children:[(0,m.jsxs)("div",{className:"logo",children:[(0,m.jsx)("img",{alt:"",src:l.j}),(0,m.jsx)("h3",{className:"active-title",children:" TravelVN"})]}),(0,m.jsxs)("div",{className:"active-main",children:[(0,m.jsx)("h1",{className:"main-header-title",children:"\u0110\u0103ng nh\u1eadp"}),(0,m.jsxs)(u.Z,{name:"basic",onFinish:n,onFinishFailed:function(e){console.log("Failed:",e)},autoComplete:"off",children:[(0,m.jsx)(u.Z.Item,{name:"email",label:"Email",rules:[{type:"email",message:"E-mail kh\xf4ng h\u1ee3p l\u1ec7."},{required:!0,message:"E-mail kh\xf4ng \u0111\u01b0\u1ecdc \u0111\u1ec3 tr\u1ed1ng!"}],hasFeedback:!0,children:(0,m.jsx)(c.Z,{})}),(0,m.jsx)(u.Z.Item,{name:"password",label:"M\u1eadt kh\u1ea9u",rules:[{required:!0,message:"M\u1eadt kh\u1ea9u kh\xf4ng \u0111\u01b0\u1ecdc \u0111\u1ec3 tr\u1ed1ng!"}],hasFeedback:!0,children:(0,m.jsx)(c.Z.Password,{})}),(0,m.jsx)(u.Z.Item,{children:(0,m.jsx)(o.Z,{type:"primary",danger:!0,htmlType:"submit",className:"button-active-user",children:"\u0110\u0103ng nh\u1eadp"})})]})]})]})})}},623:function(e,n,t){t.d(n,{$P:function(){return o},D2:function(){return c},vV:function(){return l},zQ:function(){return u}});var r=t(6573),a=t(9726),s=t(3648),i=r.Z.create({timeout:18e4,baseURL:"https://api.ktravel.online/"});i.interceptors.request.use((function(e){return e.headers.Authorization="Bearer ".concat((0,s.LP)()),e}),(function(e){return Promise.reject(e)}));i.interceptors.response.use((function(e){return e}),(function(e){var n,t;e.config;if(console.log(e),404===(null===e||void 0===e||null===(n=e.response)||void 0===n?void 0:n.status))return a.m.replace("/");if(401===(null===e||void 0===e||null===(t=e.response)||void 0===t?void 0:t.status)&&(0,s.YV)())return(0,s.qz)(),(0,s.l$)(),a.m.replace("/"),Promise.reject(e);return Promise.reject(e)}));var u=function(e,n){return i.get(e,{params:n}).then((function(e){return e.data}))},c=function(e,n,t){return i.post(e,n,{params:t}).then((function(e){return e.data}))},o=function(e,n){return i.put(e,n).then((function(e){return e.data}))},l=function(e,n){return i.delete(e,{data:n}).then((function(e){return e.data}))}},2980:function(){}}]);