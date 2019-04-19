import AWSXRay from 'aws-xray-sdk'

// var segment = new AWSXRay.Segment(name, [optional root ID], [optional parent ID]);

// const name = process.env.PRODUCT_NAME
// const segment = new AWSXRay.Segment(name)
// AWSXRay.setSegment(segment)

AWSXRay.capturePromise()

const AWS = AWSXRay.captureAWS(require('aws-sdk'))
// const fetch = AWSXRay.captureHTTPs(require('node-fetch'))
const _http = AWSXRay.captureHTTPs(require('http'))
const _https = AWSXRay.captureHTTPs(require('https'))

const http = {
  get: url => {
    return new Promise((resolve, reject) => {
      // select http or https module, depending on reqested url
      const lib = url.startsWith('https') ? _https : _http
      const request = lib.get(url, response => {
        // handle http errors
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(
            new Error(
              'Failed to load page, status code: ' + response.statusCode
            )
          )
        }
        // temporary data holder
        const body = []
        // on every content chunk, push it to the data array
        response.on('data', chunk => body.push(chunk))
        // we are done, resolve promise with those joined chunks
        response.on('end', () => resolve(body.join('')))
      })
      // handle connection errors of the request
      request.on('error', err => reject(err))
    })
  }
}

export { AWSXRay, AWS, http }

export default AWS
