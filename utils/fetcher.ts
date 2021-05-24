export const fetcher: <T>(...args: [input: RequestInfo, init?: RequestInit | undefined]) => Promise<T> = async (...args) => {
  const response = await fetch(...args)
  return await response.json()
}
