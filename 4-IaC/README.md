# Examples

Queue, not DLQ:

```
cfn-lint --template 1.template.yaml --append-rules cfn-rules/operations
```

DLQ, no alarm:

```
cfn-lint --template 2.template.yaml --append-rules cfn-rules/operations
```

DLQ and alarm:

```
cfn-lint --template 3.template.yaml --append-rules cfn-rules/operations
```

No billing tags:

```
cfn-lint --template 4.template.yaml --append-rules cfn-rules/finance
```

Public bucket:

```
cfn-lint --template 6.template.yaml --append-rules cfn-rules/security
```

```
cfn-lint --template 7.template.yaml --append-rules cfn-rules/security
```

Then, run all rules

# Rule Reference

https://github.com/aws-cloudformation/cfn-python-lint/blob/f5c3504f593d4311388a047fa4b6f18f792c919a/docs/getting_started/rules.md
