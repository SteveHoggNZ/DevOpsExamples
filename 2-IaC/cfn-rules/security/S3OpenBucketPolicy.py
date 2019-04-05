"""
  Copyright 2019 H4 LTD. All Rights Reserved.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
"""
from cfnlint import CloudFormationLintRule
from cfnlint import RuleMatch
import cfnlint.helpers


class S3OpenBucketPolicy(CloudFormationLintRule):
    """Check if an open-to-the-world bucket policies are applied to a non web buckets"""
    id = 'E92001'
    shortdesc = 'Non web bucket not have open-to-the-world policy'
    description = 'Check that non-web buckets do not have a liberal bucket policy'
    tags = ['resources', 's3', 'bucketpolicy']

    def match(self, cfn):
        """Check S3 BucketPolicy for non web buckets to see if they're open"""

        matches = []

        resources = cfn.get_resources(['AWS::S3::BucketPolicy'])

        for resource_name, resource_obj in resources.items():
            properties = resource_obj.get('Properties')
            bucket = properties.get('Bucket')
            statements = properties.get('PolicyDocument').get('Statement')
            if isinstance(bucket, dict):
                bucket_name = bucket.get('Ref')
                if not bucket_name.endswith('Public'):
                    sf = list(filter(lambda x: x.get('Effect') == 'Allow' and \
                        x.get('Principal') == '*', statements))
                    if sf:
                        message = 'Bucket Policy for non-Public suffix bucket {0} open to the world'
                        matches.append(
                            RuleMatch(
                                ['Resources', bucket_name],
                                message.format('/'.join(map(str, ['Resources', bucket_name])))
                            )
                        )

        return matches
