webpackJsonp([24],{554:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(26),u=(n.n(i),n(25)),c=n.n(u),l=n(282),p=(n.n(l),n(277)),s=n.n(p),f=n(0),b=n.n(f),h=n(11),m=(n.n(h),n(287)),y=n(10),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),v=s.a.TabPane,w=function(){return Object(m.a)({loader:function(){return n.e(27).then(n.bind(null,3255))},modules:["../containers/Records"],webpack:function(){return[3255]}})},O=function(){return Object(m.a)({loader:function(){return n.e(35).then(n.bind(null,3256))},modules:["./Immunization"],webpack:function(){return[3256]}})},j=function(){return Object(m.a)({loader:function(){return n.e(34).then(n.bind(null,3257))},modules:["./Visits"],webpack:function(){return[3257]}})},E=function(e){function t(){var e,n,a,i;r(this,t);for(var u=arguments.length,c=Array(u),l=0;l<u;l++)c[l]=arguments[l];return n=a=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),a.handleChange=function(e){a.props.history.push(e)},i=n,o(a,i)}return a(t,e),d(t,[{key:"render",value:function(){var e=this.props.match;return b.a.createElement(c.a,null,b.a.createElement(s.a,{tabPosition:"top",defaultActiveKey:this.props.location.pathname,onChange:this.handleChange},b.a.createElement(v,{tab:"My Records",key:e.url},b.a.createElement(y.e,{exact:!0,path:e.url,component:w()})),b.a.createElement(v,{tab:"Immunizations",key:e.url+"/immunization"},b.a.createElement(y.e,{exact:!0,path:e.url+"/immunization",component:O()})),b.a.createElement(v,{tab:"Visits",key:e.url+"/visits"},b.a.createElement(y.e,{exact:!0,path:e.url+"/visits",component:j()}))))}}]),t}(b.a.Component);t.default=Object(h.withApollo)(E)}});
//# sourceMappingURL=24.ceefcd10.chunk.js.map