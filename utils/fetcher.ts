export const fetcher = async (...args: [input: RequestInfo, init?: RequestInit | undefined]) => {
  const response = await fetch(...args)
  const result = await response.json()

  if (response.status !== 200) {
    throw new Error(result.error)
  }

  return result
}
