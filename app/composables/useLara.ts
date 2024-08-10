type useLazyFetchType = typeof useLazyFetch

export const useLara: useLazyFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()
  options.baseURL = config.public.apiBaseUrl

  // TODO: API error handling

  return useLazyFetch(path, options)
}
