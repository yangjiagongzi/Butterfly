module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: 'Butterfly',
        overwrite: true
      }
    }
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './config/webpack.config.main',
        renderer: {
          config: './config/webpack.config.renderer',
          nodeIntegration: true,
          entryPoints: [
            {
              html: './src/renderer/index.html',
              js: './src/renderer/index.tsx',
              name: 'main_window'
            }
          ]
        }
      }
    ]
  ]
}