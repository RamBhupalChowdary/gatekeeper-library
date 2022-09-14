"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[567],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>m});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=c(t),m=i,v=d["".concat(l,".").concat(m)]||d[m]||u[m]||a;return t?r.createElement(v,s(s({ref:n},p),{},{components:t})):r.createElement(v,s({ref:n},p))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,s=new Array(a);s[0]=d;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var c=2;c<a;c++)s[c]=t[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4330:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var r=t(7462),i=(t(7294),t(3905));const a={id:"uniqueserviceselector",title:"Unique Service Selector"},s="Unique Service Selector",o={unversionedId:"uniqueserviceselector",id:"uniqueserviceselector",title:"Unique Service Selector",description:"Description",source:"@site/docs/uniqueserviceselector.md",sourceDirName:".",slug:"/uniqueserviceselector",permalink:"/gatekeeper-library/website/uniqueserviceselector",draft:!1,editUrl:"https://github.com/open-policy-agent/gatekeeper-library/edit/master/website/docs/uniqueserviceselector.md",tags:[],version:"current",frontMatter:{id:"uniqueserviceselector",title:"Unique Service Selector"},sidebar:"docs",previous:{title:"Unique Ingress Host",permalink:"/gatekeeper-library/website/uniqueingresshost"},next:{title:"Introduction",permalink:"/gatekeeper-library/website/pspintro"}},l={},c=[{value:"Description",id:"description",level:2},{value:"Template",id:"template",level:2},{value:"Examples",id:"examples",level:2}],p={toc:c};function u(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"unique-service-selector"},"Unique Service Selector"),(0,i.kt)("h2",{id:"description"},"Description"),(0,i.kt)("p",null,"Requires Services to have unique selectors within a namespace. Selectors are considered the same if they have identical keys and values. Selectors may share a key/value pair so long as there is at least one distinct key/value pair between them.\n",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service"},"https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service")),(0,i.kt)("h2",{id:"template"},"Template"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: templates.gatekeeper.sh/v1\nkind: ConstraintTemplate\nmetadata:\n  name: k8suniqueserviceselector\n  annotations:\n    metadata.gatekeeper.sh/title: "Unique Service Selector"\n    description: >-\n      Requires Services to have unique selectors within a namespace.\n      Selectors are considered the same if they have identical keys and values.\n      Selectors may share a key/value pair so long as there is at least one\n      distinct key/value pair between them.\n\n      https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service\nspec:\n  crd:\n    spec:\n      names:\n        kind: K8sUniqueServiceSelector\n  targets:\n    - target: admission.k8s.gatekeeper.sh\n      rego: |\n        package k8suniqueserviceselector\n\n        make_apiversion(kind) = apiVersion {\n          g := kind.group\n          v := kind.version\n          g != ""\n          apiVersion = sprintf("%v/%v", [g, v])\n        }\n\n        make_apiversion(kind) = apiVersion {\n          kind.group == ""\n          apiVersion = kind.version\n        }\n\n        identical(obj, review) {\n          obj.metadata.namespace == review.namespace\n          obj.metadata.name == review.name\n          obj.kind == review.kind.kind\n          obj.apiVersion == make_apiversion(review.kind)\n        }\n\n        flatten_selector(obj) = flattened {\n          selectors := [s | s = concat(":", [key, val]); val = obj.spec.selector[key]]\n          flattened := concat(",", sort(selectors))\n        }\n\n        violation[{"msg": msg}] {\n          input.review.kind.kind == "Service"\n          input.review.kind.version == "v1"\n          input.review.kind.group == ""\n          input_selector := flatten_selector(input.review.object)\n          other := data.inventory.namespace[namespace][_]["Service"][name]\n          not identical(other, input.review)\n          other_selector := flatten_selector(other)\n          input_selector == other_selector\n          msg := sprintf("same selector as service <%v> in namespace <%v>", [name, namespace])\n        }\n\n')),(0,i.kt)("h2",{id:"examples"},"Examples"),(0,i.kt)("details",null,(0,i.kt)("summary",null,"block-endpoint-default-role"),(0,i.kt)("blockquote",null,(0,i.kt)("details",null,(0,i.kt)("summary",null,"constraint"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sUniqueServiceSelector\nmetadata:\n  name: unique-service-selector\n  labels:\n    owner: admin.agilebank.demo\n\n"))),(0,i.kt)("details",null,(0,i.kt)("summary",null,"example-allowed"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n  name: gatekeeper-test-service-disallowed\n  namespace: default\nspec:\n  ports:\n    - port: 443\n  selector:\n    key: other-value\n\n"))),(0,i.kt)("details",null,(0,i.kt)("summary",null,"example-disallowed"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n  name: gatekeeper-test-service-disallowed\n  namespace: default\nspec:\n  ports:\n    - port: 443\n  selector:\n    key: value\n\n"))))))}u.isMDXComponent=!0}}]);