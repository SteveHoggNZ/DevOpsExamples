# Examples

## Test Locally

```
sam local invoke --template 1-version-service.yaml --event test/event.json --env-vars test/env.json GetVersion
```

## Test API

```
sam local start-api --template 1-version-service.yaml --env-vars test/env.json
```

```
curl -s http://127.0.0.1:3000/version | jq
```

# Image Copy Event

Image copy logs:

```
sam logs --stack-name image-service-dev-ImageService-OWN5Z6VR0N54 --name ProcessImage --filter "LAMBDA ID"
```

```
sam logs --stack-name image-service-dev-ImageService-OWN5Z6VR0N54 --name ProcessImage --filter "LAMBDA ID" | awk '{print $7}' | sort | uniq -c | sort -n
```

## Auto Build Code

```
ENV=dev scripts/autoBuild.sh
```

## X-Ray Example

Note: Will trigger random errors

```
curl -s https://dbw7f0c26m.execute-api.ap-southeast-2.amazonaws.com/Prod/images
```

# References

## X-Ray With Lambda

https://docs.aws.amazon.com/lambda/latest/dg/lambda-x-ray.html

Custom sub segments:
https://medium.com/financial-engines-techblog/enabling-aws-x-ray-on-aws-lambda-40fdbd6740b1
