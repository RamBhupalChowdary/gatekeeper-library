"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[625],{3905:(e,a,n)=>{n.d(a,{Zo:()=>m,kt:()=>g});var s=n(7294);function t(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function r(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,s)}return n}function l(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?r(Object(n),!0).forEach((function(a){t(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function o(e,a){if(null==e)return{};var n,s,t=function(e,a){if(null==e)return{};var n,s,t={},r=Object.keys(e);for(s=0;s<r.length;s++)n=r[s],a.indexOf(n)>=0||(t[n]=e[n]);return t}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(s=0;s<r.length;s++)n=r[s],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}var i=s.createContext({}),c=function(e){var a=s.useContext(i),n=a;return e&&(n="function"==typeof e?e(a):l(l({},a),e)),n},m=function(e){var a=c(e.components);return s.createElement(i.Provider,{value:a},e.children)},p={inlineCode:"code",wrapper:function(e){var a=e.children;return s.createElement(s.Fragment,{},a)}},u=s.forwardRef((function(e,a){var n=e.components,t=e.mdxType,r=e.originalType,i=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),u=c(n),g=t,d=u["".concat(i,".").concat(g)]||u[g]||p[g]||r;return n?s.createElement(d,l(l({ref:a},m),{},{components:n})):s.createElement(d,l({ref:a},m))}));function g(e,a){var n=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var r=n.length,l=new Array(r);l[0]=u;var o={};for(var i in a)hasOwnProperty.call(a,i)&&(o[i]=a[i]);o.originalType=e,o.mdxType="string"==typeof e?e:t,l[1]=o;for(var c=2;c<r;c++)l[c]=n[c];return s.createElement.apply(null,l)}return s.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7492:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>i,contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var s=n(7462),t=(n(7294),n(3905));const r={id:"storageclass",title:"Storage Class"},l="Storage Class",o={unversionedId:"storageclass",id:"storageclass",title:"Storage Class",description:"Description",source:"@site/docs/storageclass.md",sourceDirName:".",slug:"/storageclass",permalink:"/gatekeeper-library/website/storageclass",draft:!1,editUrl:"https://github.com/open-policy-agent/gatekeeper-library/edit/master/website/docs/storageclass.md",tags:[],version:"current",frontMatter:{id:"storageclass",title:"Storage Class"},sidebar:"docs",previous:{title:"Required Probes",permalink:"/gatekeeper-library/website/requiredprobes"},next:{title:"Unique Ingress Host",permalink:"/gatekeeper-library/website/uniqueingresshost"}},i={},c=[{value:"Description",id:"description",level:2},{value:"Template",id:"template",level:2},{value:"Examples",id:"examples",level:2}],m={toc:c};function p(e){let{components:a,...n}=e;return(0,t.kt)("wrapper",(0,s.Z)({},m,n,{components:a,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"storage-class"},"Storage Class"),(0,t.kt)("h2",{id:"description"},"Description"),(0,t.kt)("p",null,"Requires storage classes to be specified when used. Only Gatekeeper 3.9+ is supported."),(0,t.kt)("h2",{id:"template"},"Template"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: templates.gatekeeper.sh/v1\nkind: ConstraintTemplate\nmetadata:\n  name: k8sstorageclass\n  annotations:\n    metadata.gatekeeper.sh/title: "Storage Class"\n    description: >-\n      Requires storage classes to be specified when used. Only Gatekeeper 3.9+ is supported.\nspec:\n  crd:\n    spec:\n      names:\n        kind: K8sStorageClass\n      validation:\n        openAPIV3Schema:\n          type: object\n          description: >-\n            Requires storage classes to be specified when used.\n          properties:\n            includeStorageClassesInMessage:\n              type: boolean\n              default: true\n  targets:\n    - target: admission.k8s.gatekeeper.sh\n      rego: |\n        package k8sstorageclass\n\n        is_pvc(obj) {\n          obj.apiVersion == "v1"\n          obj.kind == "PersistentVolumeClaim"\n        }\n\n        is_statefulset(obj) {\n          obj.apiVersion == "apps/v1"\n          obj.kind == "StatefulSet"\n        }\n\n        violation[{"msg": msg}] {\n          not data.inventory.cluster["storage.k8s.io/v1"]["StorageClass"]\n          msg := sprintf("StorageClasses not synced. Gatekeeper may be misconfigured. Please have a cluster-admin consult the documentation.", [])\n        }\n\n        storageclass_found(name) {\n          data.inventory.cluster["storage.k8s.io/v1"]["StorageClass"][name]\n        }\n\n        violation[{"msg": pvc_storageclass_badname_msg}] {\n          is_pvc(input.review.object)\n          not storageclass_found(input.review.object.spec.storageClassName)\n        }\n        pvc_storageclass_badname_msg := sprintf("pvc did not specify a valid storage class name <%v>. Must be one of [%v]", args) {\n          input.parameters.includeStorageClassesInMessage\n          args := [\n            input.review.object.spec.storageClassName,\n            concat(", ", [n | data.inventory.cluster["storage.k8s.io/v1"]["StorageClass"][n]])\n          ]\n        } else := sprintf(\n          "pvc did not specify a valid storage class name <%v>.",\n          [input.review.object.spec.storageClassName]\n        )\n\n        violation[{"msg": pvc_storageclass_noname_msg}] {\n          is_pvc(input.review.object)\n          not input.review.object.spec.storageClassName\n        }\n        pvc_storageclass_noname_msg := sprintf("pvc did not specify a storage class name. Must be one of [%v]", args) {\n          input.parameters.includeStorageClassesInMessage\n          args := [\n            concat(", ", [n | data.inventory.cluster["storage.k8s.io/v1"]["StorageClass"][n]])\n          ]\n        } else := sprintf(\n          "pvc did not specify a storage class name.",\n          []\n        )\n\n        violation[{"msg": statefulset_vct_badname_msg(vct)}] {\n          is_statefulset(input.review.object)\n          vct := input.review.object.spec.volumeClaimTemplates[_]\n          not storageclass_found(vct.spec.storageClassName)\n        }\n        statefulset_vct_badname_msg(vct) := msg {\n          input.parameters.includeStorageClassesInMessage\n          msg := sprintf(\n              "statefulset did not specify a valid storage class name <%v>. Must be one of [%v]", [\n              vct.spec.storageClassName,\n              concat(", ", [n | data.inventory.cluster["storage.k8s.io/v1"]["StorageClass"][n]])\n          ])\n        }\n        statefulset_vct_badname_msg(vct) := msg {\n          not input.parameters.includeStorageClassesInMessage\n          msg := sprintf(\n            "statefulset did not specify a valid storage class name <%v>.", [\n              vct.spec.storageClassName\n          ])\n        }\n\n        violation[{"msg": statefulset_vct_noname_msg}] {\n          is_statefulset(input.review.object)\n          vct := input.review.object.spec.volumeClaimTemplates[_]\n          not vct.spec.storageClassName\n        }\n        statefulset_vct_noname_msg := sprintf("statefulset did not specify a storage class name. Must be one of [%v]", args) {\n          input.parameters.includeStorageClassesInMessage\n          args := [\n            concat(", ", [n | data.inventory.cluster["storage.k8s.io/v1"]["StorageClass"][n]])\n          ]\n        } else := sprintf(\n          "statefulset did not specify a storage class name.",\n          []\n        )\n\n        #FIXME pod generic ephemeral might be good to validate some day too.\n\n')),(0,t.kt)("h2",{id:"examples"},"Examples"),(0,t.kt)("details",null,(0,t.kt)("summary",null,"storageclass"),(0,t.kt)("blockquote",null,(0,t.kt)("details",null,(0,t.kt)("summary",null,"constraint"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sStorageClass\nmetadata:\n  name: storageclass\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["PersistentVolumeClaim"]\n      - apiGroups: ["apps"]\n        kinds: ["StatefulSet"]\n  parameters:\n    includeStorageClassesInMessage: true\n\n'))),(0,t.kt)("details",null,(0,t.kt)("summary",null,"example-allowed-pvc"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: ok\nspec:\n  accessModes:\n    - ReadWriteOnce\n  volumeMode: Filesystem\n  resources:\n    requests:\n      storage: 8Gi\n  storageClassName: somestorageclass\n\n"))),(0,t.kt)("details",null,(0,t.kt)("summary",null,"example-allowed-ss"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: volumeclaimstorageclass\nspec:\n  selector:\n    matchLabels:\n      app: volumeclaimstorageclass\n  serviceName: volumeclaimstorageclass\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app: volumeclaimstorageclass\n    spec:\n      containers:\n      - name: main\n        image: k8s.gcr.io/nginx-slim:0.8\n        volumeMounts:\n        - name: data\n          mountPath: /usr/share/nginx/html\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: ["ReadWriteOnce"]\n      storageClassName: "somestorageclass"\n      resources:\n        requests:\n          storage: 1Gi\n\n'))),(0,t.kt)("details",null,(0,t.kt)("summary",null,"example-disallowed-pvc-badname"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: badstorageclass\nspec:\n  accessModes:\n    - ReadWriteOnce\n  volumeMode: Filesystem\n  resources:\n    requests:\n      storage: 8Gi\n  storageClassName: badstorageclass\n\n"))),(0,t.kt)("details",null,(0,t.kt)("summary",null,"example-disallowed-ssvct-badnamename"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: badvolumeclaimstorageclass\nspec:\n  selector:\n    matchLabels:\n      app: badvolumeclaimstorageclass\n  serviceName: badvolumeclaimstorageclass\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app: badvolumeclaimstorageclass\n    spec:\n      containers:\n      - name: main\n        image: k8s.gcr.io/nginx-slim:0.8\n        volumeMounts:\n        - name: data\n          mountPath: /usr/share/nginx/html\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: ["ReadWriteOnce"]\n      storageClassName: "badstorageclass"\n      resources:\n        requests:\n          storage: 1Gi\n\n'))),(0,t.kt)("details",null,(0,t.kt)("summary",null,"example-disallowed-pvc-nonamename"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-yaml"},"---\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: nostorageclass\nspec:\n  accessModes:\n    - ReadWriteOnce\n  volumeMode: Filesystem\n  resources:\n    requests:\n      storage: 8Gi\n\n"))),(0,t.kt)("details",null,(0,t.kt)("summary",null,"example-disallowed-ssvct-nonamename"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: novolumeclaimstorageclass\nspec:\n  selector:\n    matchLabels:\n      app: novolumeclaimstorageclass\n  serviceName: novolumeclaimstorageclass\n  replicas: 1\n  template:\n    metadata:\n      labels:\n        app: novolumeclaimstorageclass\n    spec:\n      containers:\n      - name: main\n        image: k8s.gcr.io/nginx-slim:0.8\n        volumeMounts:\n        - name: data\n          mountPath: /usr/share/nginx/html\n  volumeClaimTemplates:\n  - metadata:\n      name: data\n    spec:\n      accessModes: ["ReadWriteOnce"]\n      resources:\n        requests:\n          storage: 1Gi\n\n'))))))}p.isMDXComponent=!0}}]);