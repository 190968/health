webpackJsonp([21],{3285:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function u(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),c=n.n(i),a=n(17),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),f(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){return console.log(111),this.props.logout(),c.a.createElement(a.d,{to:{pathname:"/"}})}}]),t}(c.a.Component);t.a=l},524:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(36),r=n(25),u=(n.n(r),n(23)),i=n.n(u),c=n(3285),a=n(168),f=n(509),l=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n    mutation logout{\n        logout\n    }\n"],["\n    mutation logout{\n        logout\n    }\n"]),p=i()(l),s=Object(r.graphql)(p),b=function(e){return{}},y=function(e,t){return{logout:function(){t.mutate({refetchQueries:[{query:f.a}]}).then(function(n){n.loading||(t.client.resetStore(),e(Object(a.f)()),t.history.push("/"))})}}};t.default=Object(r.withApollo)(s(Object(o.b)(b,y)(c.a)))}});
//# sourceMappingURL=21.c48646e8.chunk.js.map