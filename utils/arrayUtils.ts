export const getRandomItem: <T>(array: Array<T>) => T = array => array[Math.floor(Math.random() * array.length)]
