type useLazyFetchType = typeof useLazyFetch

export const useLara: useLazyFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()
  options.baseURL = config.public.apiBaseUrl

  // TODO: API error handling

  return useLazyFetch(path, options)
}

export const fetchLara = async <T>(path: string, options = {}): Promise<T> => {
  const config = useRuntimeConfig()

  return $fetch(path, {
    ...options,
    baseURL: config.public.apiBaseUrl,
  })
}
