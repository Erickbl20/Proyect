'use strict'

const ApiError = require('./api-error')

exports.send = (res, data, message) => {
  message = message || undefined
  data = data || undefined
  res.json({ message, data })
}

exports.error = (res, e) => {
  const error = 1
  let message = 'No se pudo completar su solicitud'

  if (e instanceof ApiError) message = e.message
  else if (typeof e === 'string') message = e
  else console.error(e)

  res.json({ error, message })
}

exports.clearText = (text, uppercase) => {
  if (typeof text === 'string') {
    text = text.replace(/ +/g, function(t, i, w) {
      if (i === 0 || t.length + i === w.length) return ''
      return ' '
    })
    if (uppercase) return text.toUpperCase()
  }
  return text
}
