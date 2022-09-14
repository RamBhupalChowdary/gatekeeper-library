"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[330],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>g});var i=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var m=i.createContext({}),c=function(e){var n=i.useContext(m),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=c(e.components);return i.createElement(m.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},p=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,m=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=c(t),g=r,d=p["".concat(m,".").concat(g)]||p[g]||u[g]||o;return t?i.createElement(d,a(a({ref:n},l),{},{components:t})):i.createElement(d,a({ref:n},l))}));function g(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,a=new Array(o);a[0]=p;var s={};for(var m in n)hasOwnProperty.call(n,m)&&(s[m]=n[m]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var c=2;c<o;c++)a[c]=t[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}p.displayName="MDXCreateElement"},4051:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>m,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var i=t(7462),r=(t(7294),t(3905));const o={id:"containerresourceratios",title:"Container Ratios"},a="Container Ratios",s={unversionedId:"containerresourceratios",id:"containerresourceratios",title:"Container Ratios",description:"Description",source:"@site/docs/containerresourceratios.md",sourceDirName:".",slug:"/containerresourceratios",permalink:"/gatekeeper-library/website/containerresourceratios",draft:!1,editUrl:"https://github.com/open-policy-agent/gatekeeper-library/edit/master/website/docs/containerresourceratios.md",tags:[],version:"current",frontMatter:{id:"containerresourceratios",title:"Container Ratios"},sidebar:"docs",previous:{title:"Container Requests",permalink:"/gatekeeper-library/website/containerrequests"},next:{title:"Required Resources",permalink:"/gatekeeper-library/website/containerresources"}},m={},c=[{value:"Description",id:"description",level:2},{value:"Template",id:"template",level:2},{value:"Examples",id:"examples",level:2}],l={toc:c};function u(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,i.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"container-ratios"},"Container Ratios"),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"Sets a maximum ratio for container resource limits to requests.\n",(0,r.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"},"https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/")),(0,r.kt)("h2",{id:"template"},"Template"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: templates.gatekeeper.sh/v1\nkind: ConstraintTemplate\nmetadata:\n  name: k8scontainerratios\n  annotations:\n    metadata.gatekeeper.sh/title: "Container Ratios"\n    description: >-\n      Sets a maximum ratio for container resource limits to requests.\n\n      https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/\nspec:\n  crd:\n    spec:\n      names:\n        kind: K8sContainerRatios\n      validation:\n        openAPIV3Schema:\n          type: object\n          properties:\n            exemptImages:\n              description: >-\n                Any container that uses an image that matches an entry in this list will be excluded\n                from enforcement. Prefix-matching can be signified with `*`. For example: `my-image-*`.\n\n                It is recommended that users use the fully-qualified Docker image name (e.g. start with a domain name)\n                in order to avoid unexpectedly exempting images from an untrusted repository.\n              type: array\n              items:\n                type: string\n            ratio:\n              type: string\n              description: >-\n                The maximum allowed ratio of `resources.limits` to\n                `resources.requests` on a container.\n            cpuRatio:\n              type: string\n              description: >-\n                The maximum allowed ratio of `resources.limits.cpu` to\n                `resources.requests.cpu` on a container. If not specified,\n                equal to `ratio`.\n  targets:\n    - target: admission.k8s.gatekeeper.sh\n      rego: |\n        package k8scontainerratios\n\n        import data.lib.exempt_container.is_exempt\n\n        missing(obj, field) = true {\n          not obj[field]\n        }\n\n        missing(obj, field) = true {\n          obj[field] == ""\n        }\n\n        canonify_cpu(orig) = new {\n          is_number(orig)\n          new := orig * 1000\n        }\n\n        canonify_cpu(orig) = new {\n          not is_number(orig)\n          endswith(orig, "m")\n          new := to_number(replace(orig, "m", ""))\n        }\n\n        canonify_cpu(orig) = new {\n          not is_number(orig)\n          not endswith(orig, "m")\n          re_match("^[0-9]+$", orig)\n          new := to_number(orig) * 1000\n        }\n\n        canonify_cpu(orig) = new {\n          not is_number(orig)\n          not endswith(orig, "m")\n          re_match("^[0-9]+[.][0-9]+$", orig)\n          new := to_number(orig) * 1000\n        }\n\n        # 10 ** 21\n        mem_multiple("E") = 1000000000000000000000 { true }\n\n        # 10 ** 18\n        mem_multiple("P") = 1000000000000000000 { true }\n\n        # 10 ** 15\n        mem_multiple("T") = 1000000000000000 { true }\n\n        # 10 ** 12\n        mem_multiple("G") = 1000000000000 { true }\n\n        # 10 ** 9\n        mem_multiple("M") = 1000000000 { true }\n\n        # 10 ** 6\n        mem_multiple("k") = 1000000 { true }\n\n        # 10 ** 3\n        mem_multiple("") = 1000 { true }\n\n        # Kubernetes accepts millibyte precision when it probably shouldn\'t.\n        # https://github.com/kubernetes/kubernetes/issues/28741\n        # 10 ** 0\n        mem_multiple("m") = 1 { true }\n\n        # 1000 * 2 ** 10\n        mem_multiple("Ki") = 1024000 { true }\n\n        # 1000 * 2 ** 20\n        mem_multiple("Mi") = 1048576000 { true }\n\n        # 1000 * 2 ** 30\n        mem_multiple("Gi") = 1073741824000 { true }\n\n        # 1000 * 2 ** 40\n        mem_multiple("Ti") = 1099511627776000 { true }\n\n        # 1000 * 2 ** 50\n        mem_multiple("Pi") = 1125899906842624000 { true }\n\n        # 1000 * 2 ** 60\n        mem_multiple("Ei") = 1152921504606846976000 { true }\n\n        get_suffix(mem) = suffix {\n          not is_string(mem)\n          suffix := ""\n        }\n\n        get_suffix(mem) = suffix {\n          is_string(mem)\n          count(mem) > 0\n          suffix := substring(mem, count(mem) - 1, -1)\n          mem_multiple(suffix)\n        }\n\n        get_suffix(mem) = suffix {\n          is_string(mem)\n          count(mem) > 1\n          suffix := substring(mem, count(mem) - 2, -1)\n          mem_multiple(suffix)\n        }\n\n        get_suffix(mem) = suffix {\n          is_string(mem)\n          count(mem) > 1\n          not mem_multiple(substring(mem, count(mem) - 1, -1))\n          not mem_multiple(substring(mem, count(mem) - 2, -1))\n          suffix := ""\n        }\n\n        get_suffix(mem) = suffix {\n          is_string(mem)\n          count(mem) == 1\n          not mem_multiple(substring(mem, count(mem) - 1, -1))\n          suffix := ""\n        }\n\n        get_suffix(mem) = suffix {\n          is_string(mem)\n          count(mem) == 0\n          suffix := ""\n        }\n\n        canonify_mem(orig) = new {\n          is_number(orig)\n          new := orig * 1000\n        }\n\n        canonify_mem(orig) = new {\n          not is_number(orig)\n          suffix := get_suffix(orig)\n          raw := replace(orig, suffix, "")\n          re_match("^[0-9]+(\\\\.[0-9]+)?$", raw)\n          new := to_number(raw) * mem_multiple(suffix)\n        }\n\n        violation[{"msg": msg}] {\n          general_violation[{"msg": msg, "field": "containers"}]\n        }\n\n        violation[{"msg": msg}] {\n          general_violation[{"msg": msg, "field": "initContainers"}]\n        }\n\n        # Ephemeral containers not checked as it is not possible to set field.\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          cpu_orig := container.resources.limits.cpu\n          not canonify_cpu(cpu_orig)\n          msg := sprintf("container <%v> cpu limit <%v> could not be parsed", [container.name, cpu_orig])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          mem_orig := container.resources.limits.memory\n          not canonify_mem(mem_orig)\n          msg := sprintf("container <%v> memory limit <%v> could not be parsed", [container.name, mem_orig])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          cpu_orig := container.resources.requests.cpu\n          not canonify_cpu(cpu_orig)\n          msg := sprintf("container <%v> cpu request <%v> could not be parsed", [container.name, cpu_orig])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          mem_orig := container.resources.requests.memory\n          not canonify_mem(mem_orig)\n          msg := sprintf("container <%v> memory request <%v> could not be parsed", [container.name, mem_orig])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          not container.resources\n          msg := sprintf("container <%v> has no resource limits", [container.name])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          not container.resources.limits\n          msg := sprintf("container <%v> has no resource limits", [container.name])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          missing(container.resources.limits, "cpu")\n          msg := sprintf("container <%v> has no cpu limit", [container.name])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          missing(container.resources.limits, "memory")\n          msg := sprintf("container <%v> has no memory limit", [container.name])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          not container.resources.requests\n          msg := sprintf("container <%v> has no resource requests", [container.name])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          missing(container.resources.requests, "cpu")\n          msg := sprintf("container <%v> has no cpu request", [container.name])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          missing(container.resources.requests, "memory")\n          msg := sprintf("container <%v> has no memory request", [container.name])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          cpu_limits_orig := container.resources.limits.cpu\n          cpu_limits := canonify_cpu(cpu_limits_orig)\n          cpu_requests_orig := container.resources.requests.cpu\n          cpu_requests := canonify_cpu(cpu_requests_orig)\n          cpu_ratio := object.get(input.parameters, "cpuRatio", input.parameters.ratio)\n          to_number(cpu_limits) > to_number(cpu_ratio) * to_number(cpu_requests)\n          msg := sprintf("container <%v> cpu limit <%v> is higher than the maximum allowed ratio of <%v>", [container.name, cpu_limits_orig, cpu_ratio])\n        }\n\n        general_violation[{"msg": msg, "field": field}] {\n          container := input.review.object.spec[field][_]\n          not is_exempt(container)\n          mem_limits_orig := container.resources.limits.memory\n          mem_requests_orig := container.resources.requests.memory\n          mem_limits := canonify_mem(mem_limits_orig)\n          mem_requests := canonify_mem(mem_requests_orig)\n          mem_ratio := input.parameters.ratio\n          to_number(mem_limits) > to_number(mem_ratio) * to_number(mem_requests)\n          msg := sprintf("container <%v> memory limit <%v> is higher than the maximum allowed ratio of <%v>", [container.name, mem_limits_orig, mem_ratio])\n        }\n      libs:\n        - |\n          package lib.exempt_container\n\n          is_exempt(container) {\n              exempt_images := object.get(object.get(input, "parameters", {}), "exemptImages", [])\n              img := container.image\n              exemption := exempt_images[_]\n              _matches_exemption(img, exemption)\n          }\n\n          _matches_exemption(img, exemption) {\n              not endswith(exemption, "*")\n              exemption == img\n          }\n\n          _matches_exemption(img, exemption) {\n              endswith(exemption, "*")\n              prefix := trim_suffix(exemption, "*")\n              startswith(img, prefix)\n          }\n\n')),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("details",null,(0,r.kt)("summary",null,"memory-ratio-only"),(0,r.kt)("blockquote",null,(0,r.kt)("details",null,(0,r.kt)("summary",null,"constraint"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sContainerRatios\nmetadata:\n  name: container-must-meet-ratio\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Pod"]\n  parameters:\n    ratio: "2"\n\n'))),(0,r.kt)("details",null,(0,r.kt)("summary",null,"example-allowed"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Pod\nmetadata:\n  name: opa-disallowed\n  labels:\n    owner: me.agilebank.demo\nspec:\n  containers:\n    - name: opa\n      image: openpolicyagent/opa:0.9.2\n      args:\n        - "run"\n        - "--server"\n        - "--addr=localhost:8080"\n      resources:\n        limits:\n          cpu: "200m"\n          memory: "200Mi"\n        requests:\n          cpu: "100m"\n          memory: "100Mi"\n\n'))),(0,r.kt)("details",null,(0,r.kt)("summary",null,"example-disallowed"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Pod\nmetadata:\n  name: opa-disallowed\n  labels:\n    owner: me.agilebank.demo\nspec:\n  containers:\n    - name: opa\n      image: openpolicyagent/opa:0.9.2\n      args:\n        - "run"\n        - "--server"\n        - "--addr=localhost:8080"\n      resources:\n        limits:\n          cpu: "800m"\n          memory: "2Gi"\n        requests:\n          cpu: "100m"\n          memory: "100Mi"\n\n'))))),(0,r.kt)("details",null,(0,r.kt)("summary",null,"memory-and-cpu-ratios"),(0,r.kt)("blockquote",null,(0,r.kt)("details",null,(0,r.kt)("summary",null,"constraint"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sContainerRatios\nmetadata:\n  name: container-must-meet-memory-and-cpu-ratio\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Pod"]\n  parameters:\n    ratio: "1"\n    cpuRatio: "10"\n\n'))),(0,r.kt)("details",null,(0,r.kt)("summary",null,"example-allowed"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Pod\nmetadata:\n  name: opa-allowed\n  labels:\n    owner: me.agilebank.demo\nspec:\n  containers:\n    - name: opa\n      image: openpolicyagent/opa:0.9.2\n      args:\n        - "run"\n        - "--server"\n        - "--addr=localhost:8080"\n      resources:\n        limits:\n          cpu: "4"\n          memory: "2Gi"\n        requests:\n          cpu: "1"\n          memory: "2Gi"\n\n'))),(0,r.kt)("details",null,(0,r.kt)("summary",null,"example-disallowed"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Pod\nmetadata:\n  name: opa-disallowed\n  labels:\n    owner: me.agilebank.demo\nspec:\n  containers:\n    - name: opa\n      image: openpolicyagent/opa:0.9.2\n      args:\n        - "run"\n        - "--server"\n        - "--addr=localhost:8080"\n      resources:\n        limits:\n          cpu: "4"\n          memory: "2Gi"\n        requests:\n          cpu: "100m"\n          memory: "2Gi"\n\n'))))))}u.isMDXComponent=!0}}]);