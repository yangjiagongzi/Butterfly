import React, { useCallback, useEffect, useState } from 'react'
import { ThemeMode, ThemeOptionsName } from '~/constant/app'
import Select from '~/renderer/component/Select'
import { getThemeMode, setThemeMode } from '~/renderer/IPC'
import { Theme as AppTheme } from '~/renderer/styles/theme'
import { container, paramGroup } from './styles'

const ThemeOptionList = Object.values(ThemeOptionsName)

type Props = {
  appTheme: AppTheme
}

const SettingsGeneral: React.FC<Props> = ({ appTheme }: Props) => {
  const [choose, setChoose] = useState<string>('')

  useEffect(() => {
    getThemeMode().then(result => {
      setChoose(ThemeOptionsName[result])
    })
  }, [])

  const update = useCallback((value: string) => {
    setChoose(value)
    const mode = Object.keys(ThemeOptionsName).find(
      key => ThemeOptionsName[key as Values<typeof ThemeMode>] === value
    )
    if (mode) {
      setThemeMode(mode as Values<typeof ThemeMode>)
    }
  }, [])

  return (
    <div className={container(appTheme)}>
      <div className={paramGroup(appTheme)}>
        <div className="title">外观:</div>
        <div className="items">
          <Select
            appTheme={appTheme}
            data={ThemeOptionList.map(item => item)}
            value={choose}
            onChange={value => update(value)}
          />
        </div>
      </div>
    </div>
  )
}

export default SettingsGeneral
