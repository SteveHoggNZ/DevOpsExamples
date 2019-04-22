import AWS, { captureAsyncFunc, http } from './util'

const getVersion = () => http.get(`${process.env.VERSION_API}/version`)

const getPhotos = () => http.get('https://jsonplaceholder.typicode.com/photos')

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomIntWithFailure = async () => {
  const int = getRandomInt(1, 3000)

  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(), int)
  })
  if (int > 2000) {
    throw new Error('Random Integer Failure')
  }

  return int
}

export const list = async () => {
  const { version } = JSON.parse(await getVersion())

  // const randomInt = await getRandomIntWithFailure()
  const randomInt = await captureAsyncFunc(
    'getRandomInt',
    segment => getRandomIntWithFailure()
  )

  const photos = JSON.parse(await getPhotos())
  const photoCount = photos.length

  const s3 = new AWS.S3()
  const params = {
    Bucket: process.env.IMAGES_BUCKET
  }
  const { Contents: images } = await s3.listObjects(params).promise()
  const imageCount = images.length

  return { photoCount, imageCount, randomInt, version }
}
