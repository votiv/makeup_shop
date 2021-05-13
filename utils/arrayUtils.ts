export const getRandomItem = array => array[Math.floor(Math.random() * array.length)]

export const addOrRemove = (array, setter) => item => {
  let filtered = [...array]
  const index = array.indexOf(item)

  if (index === -1) {
    filtered = [...filtered, item]
  } else {
    filtered = filtered.filter(f => f !== item)
  }

  setter(filtered)
}

export const noDuplicates = array => array.filter((item, index) => array.indexOf(item) === index)
