---
id: apparmor
title: App Armor
---

# App Armor

## Description
Configures an allow-list of AppArmor profiles for use by containers. This corresponds to specific annotations applied to a PodSecurityPolicy. For information on AppArmor, see https://kubernetes.io/docs/tutorials/clusters/apparmor/

## Template
```yaml
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8spspapparmor
  annotations:
    metadata.gatekeeper.sh/title: "App Armor"
    description: >-
      Configures an allow-list of AppArmor profiles for use by containers.
      This corresponds to specific annotations applied to a PodSecurityPolicy.
      For information on AppArmor, see
      https://kubernetes.io/docs/tutorials/clusters/apparmor/
spec:
  crd:
    spec:
      names:
        kind: K8sPSPAppArmor
      validation:
        # Schema for the `parameters` field
        openAPIV3Schema:
          type: object
          description: >-
            Configures an allow-list of AppArmor profiles for use by containers.
            This corresponds to specific annotations applied to a PodSecurityPolicy.
            For information on AppArmor, see
            https://kubernetes.io/docs/tutorials/clusters/apparmor/
          properties:
            exemptImages:
              description: >-
                Any container that uses an image that matches an entry in this list will be excluded
                from enforcement. Prefix-matching can be signified with `*`. For example: `my-image-*`.

                It is recommended that users use the fully-qualified Docker image name (e.g. start with a domain name)
                in order to avoid unexpectedly exempting images from an untrusted repository.
              type: array
              items:
                type: string
            allowedProfiles:
              description: "An array of AppArmor profiles. Examples: `runtime/default`, `unconfined`."
              type: array
              items:
                type: string
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8spspapparmor

        import data.lib.exempt_container.is_exempt

        violation[{"msg": msg, "details": {}}] {
            metadata := input.review.object.metadata
            container := input_containers[_]
            not is_exempt(container)
            not input_apparmor_allowed(container, metadata)
            msg := sprintf("AppArmor profile is not allowed, pod: %v, container: %v. Allowed profiles: %v", [input.review.object.metadata.name, container.name, input.parameters.allowedProfiles])
        }

        input_apparmor_allowed(container, metadata) {
            get_annotation_for(container, metadata) == input.parameters.allowedProfiles[_]
        }

        input_containers[c] {
            c := input.review.object.spec.containers[_]
        }
        input_containers[c] {
            c := input.review.object.spec.initContainers[_]
        }
        input_containers[c] {
            c := input.review.object.spec.ephemeralContainers[_]
        }

        get_annotation_for(container, metadata) = out {
            out = metadata.annotations[sprintf("container.apparmor.security.beta.kubernetes.io/%v", [container.name])]
        }
        get_annotation_for(container, metadata) = out {
            not metadata.annotations[sprintf("container.apparmor.security.beta.kubernetes.io/%v", [container.name])]
            out = "runtime/default"
        }
      libs:
        - |
          package lib.exempt_container

          is_exempt(container) {
              exempt_images := object.get(object.get(input, "parameters", {}), "exemptImages", [])
              img := container.image
              exemption := exempt_images[_]
              _matches_exemption(img, exemption)
          }

          _matches_exemption(img, exemption) {
              not endswith(exemption, "*")
              exemption == img
          }

          _matches_exemption(img, exemption) {
              endswith(exemption, "*")
              prefix := trim_suffix(exemption, "*")
              startswith(img, prefix)
          }

```

## Examples
<details>
<summary>apparmor</summary><blockquote>

<details>
<summary>constraint</summary>

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sPSPAppArmor
metadata:
  name: psp-apparmor
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
  parameters:
    allowedProfiles:
    - runtime/default

```

</details>

<details>
<summary>example-allowed</summary>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-apparmor-allowed
  annotations:
    # apparmor.security.beta.kubernetes.io/pod: unconfined # runtime/default
    container.apparmor.security.beta.kubernetes.io/nginx: runtime/default
  labels:
    app: nginx-apparmor
spec:
  containers:
  - name: nginx
    image: nginx

```

</details>
<details>
<summary>example-disallowed</summary>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-apparmor-disallowed
  annotations:
    # apparmor.security.beta.kubernetes.io/pod: unconfined # runtime/default
    container.apparmor.security.beta.kubernetes.io/nginx: unconfined
  labels:
    app: nginx-apparmor
spec:
  containers:
  - name: nginx
    image: nginx

```

</details>
<details>
<summary>disallowed-ephemeral</summary>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-apparmor-disallowed
  annotations:
    # apparmor.security.beta.kubernetes.io/pod: unconfined # runtime/default
    container.apparmor.security.beta.kubernetes.io/nginx: unconfined
  labels:
    app: nginx-apparmor
spec:
  ephemeralContainers:
  - name: nginx
    image: nginx

```

</details>


</blockquote></details>