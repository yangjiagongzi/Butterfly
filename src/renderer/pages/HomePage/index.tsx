import React, { useEffect } from 'react'

const HomePage: React.FC = () => {
  useEffect(() => {
    window.service
      .graphql({
        source: '{ config { AppearanceTheme MaxmumConcurrentRequests DelayBetweenRequests } }'
      })
      .then(response => {
        console.log(response)
      })
  }, [])
  return <div>HomePage</div>
}

export default HomePage
