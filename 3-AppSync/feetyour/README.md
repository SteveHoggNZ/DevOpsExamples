# AWS Amplify Workflow

```
amplify env list
```

```
git checkout prod
```

```
amplify env checkout prod
```

```
cd ~/Work/H4/DevOpsExamples/3-AppSync/feetyour/feetapp
```

```
npm run start
```

Login as `steve+prod@h4.nz`

```
query SearchFeatures {
  searchFeatures {
    items {
      id
      value
    }
  }
}

mutation UpdateFeature1 {
  updateFeature(input: {id:"/app/theme/version", value:"0.1.0"}) {
  	id
    value
  }
}

mutation UpdateFeature2 {
  updateFeature(input: {id:"/app/theme/colour", value:"red"}) {
  	id
    value
  }
}

mutation UpdateFeature3 {
  updateFeature(input: {id:"/app/theme/direction", value:"left"}) {
  	id
    value
  }
}
```

In another tab, switch environments:

```
amplify env checkout dev
```

# Cognito Muti-Tenant Example

Work around for Cognito Group limit
