import React from 'react'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { globalTop, globalBottom } from './styles'
import { Notification, notificationRef } from '../Notification'

type Props = {
  appTheme: AppTheme
}

const Global: React.FC<Props> = ({ appTheme }: Props) => {
  return (
    <>
      <div className={globalTop(appTheme)}></div>
      <div className={globalBottom(appTheme)}>
        <Notification appTheme={appTheme} ref={notificationRef} />
      </div>
    </>
  )
}

export default Global
