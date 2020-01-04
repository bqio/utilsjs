function fetchImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onerror = () => reject('Некорректное изображение.')
    image.onload = () => resolve(image)
    image.src = src
  })
}

function fetchText(src) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onprogress = (e) => handleProgress(e)
    xhr.onerror = () => reject('Ошибка соединения.')
    xhr.open('GET', src, true)
    xhr.send(null)
  })
}

function fetchJson(src) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      try {
        resolve(JSON.parse(xhr.responseText))
      } catch (e) {
        reject('Некорректный JSON.')
      }
    }
    xhr.onprogress = (e) => handleProgress(e)
    xhr.onerror = () => reject('Ошибка соединения.')
    xhr.open('GET', src, true)
    xhr.send(null)
  })
}

function b2Kb(b) {
  return b / 1000
}

function handleProgress(e) {
  if (e.lengthComputable) {
    console.log(`Загрузка... (${src}) ${b2Kb(e.loaded).toFixed(1)} KB / ${b2Kb(e.total).toFixed(1)} KB`)
  } else {
    console.log(`Загрузка... (${src}) ${b2Kb(e.loaded).toFixed(1)} KB`)
  }
}