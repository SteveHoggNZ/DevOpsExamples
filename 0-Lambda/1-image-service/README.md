# Test Locally

```
sam local invoke --event test/event.json --env-vars test/env.json GetVersion
```

# View Logs

```
sam logs --stack-name image-service-dev --name ListImages --tail
```

# Test API

```
sam local start-api --env-vars test/env.json
```

```
curl -s http://127.0.0.1:3000/version
```

```
ENV=dev scripts/autoBuild.sh
```

# References

## X-Ray With Lambda

https://docs.aws.amazon.com/lambda/latest/dg/lambda-x-ray.html

Custom sub segments:
https://medium.com/financial-engines-techblog/enabling-aws-x-ray-on-aws-lambda-40fdbd6740b1
