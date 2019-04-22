import AWS from 'aws-sdk'
import { sleep } from './util'

export const startThenWait = async (stateMachineArn, input) => {
  // busy-wait for the execution to finish running
  // This isn't really a good idea; you're better off add additional steps to
  // the state machine that do things like update DB entries etc

  const sf = new AWS.StepFunctions({
    region: process.env.REGION
  })

  const params = {
    stateMachineArn,
    input: JSON.stringify(input)
  }

  const { executionArn } = await sf.startExecution(params).promise()

  while (true) {
    const { status, output, ...other } = await sf
      .describeExecution({ executionArn })
      .promise()
    if (status === 'RUNNING') {
      await sleep(5)
    } else {
      if (status === 'SUCCEEDED') {
        console.log({ status, output, other })
        return JSON.parse(output).message
      } else {
        throw new Error(`State Machine status ${status}`)
      }
    }
  }
}
