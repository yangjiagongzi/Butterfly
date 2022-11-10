import React, { useEffect } from 'react'

const HomePage: React.FC = () => {
  useEffect(() => {
    window.service
      .graphql({
        source:
          '{ config { AppearanceTheme MaxmumConcurrentRequests DelayBetweenRequests } dictType { id typeName files { id fileName list } }}'
      })
      .then(response => {
        console.log(response)
      })
    window.service
      .graphql({
        source: `
          mutation UpdateConfig($arg: Episode!) {
            config {
              updateConfig(arg: $arg) {
                status
                message
              }
            }
          }
          `
      })
      .then(response => {
        console.log(response)
      })
  }, [])
  return <div>HomePage</div>
}

export default HomePage
