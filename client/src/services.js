import axios from 'axios'

axios.defaults.headers = {}

export const uploadFiles = async (files) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })

  const { data } = await axios.post(
    `${process.env.VUE_APP_SERVER_API}/upload`,
    formData
  )
  return data
}
