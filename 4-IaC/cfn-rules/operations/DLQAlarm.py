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


class DLQAlarm(CloudFormationLintRule):
    """Check if a CloudWatch Alarm exists for each DLQ"""
    id = 'E91001'
    shortdesc = 'SQS DLQ have alarms'
    description = 'Check that SQS DLQ have CloudWatch Alarm'
    tags = ['resources', 'sqs', 'alarm']

    def match(self, cfn):
        """Check CloudWatch Alarms for SQL DLQ"""

        matches = []
        alarms = {}

        resources = cfn.get_resources()
        for resource_name, resource_obj in resources.items():
            resource_type = resource_obj.get('Type', "")
            resource_properties = resource_obj.get('Properties', {})
            if resource_type == 'AWS::SQS::Queue' and resource_name.endswith('DLQ'):
                if not alarms:
                    alarms = cfn.get_resources(['AWS::CloudWatch::Alarm'])

                alarm_match = None
                for alarm, alarm_obj in alarms.items():
                    d = alarm_obj.get('Properties').get('Dimensions')
                    if d:
                        df = list(filter(lambda x: x.get('Name') == 'QueueName' and \
                            x.get('Value').get('Fn::GetAtt') == [resource_name, u'QueueName'], d))
                        if df:
                            alarm_match = alarm

                if not alarm_match:
                    message = 'Missing CloudWatch Alarm for {0}'
                    matches.append(
                        RuleMatch(
                            ['Resources', resource_name],
                            message.format('/'.join(map(str, ['Resources', resource_name])))
                        )
                    )

        return matches
