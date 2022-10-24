import React, { useEffect } from 'react'

const HomePage: React.FC = () => {
  useEffect(() => {
    window.service.graphql({ source: '{ app { version } }' }).then(response => {
      console.log(response.data)
    })
  }, [])
  return <div>HomePage</div>
}

export default HomePage
