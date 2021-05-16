export const fetcher = async (...args: [input: RequestInfo, init?: RequestInit | undefined]) => {
  const response = await fetch(...args)
  return await response.json()
}
