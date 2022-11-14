export const getAppInfo = () => {
  return {
    source: `#graphql
      query App {
        app {
          version
          themeMode
          isDarkMode
        }
      }`
  }
}
