import React, { useCallback, useEffect, useState } from 'react'
import { ThemeMode, ThemeOptionsName } from '~/constant/app'
import Select from '~/renderer/component/Select'
import { useTheme } from '~/renderer/component/UseTheme'
import { getThemeMode, setThemeMode } from '~/renderer/IPC'
import { container, paramGroup } from './styles'

const ThemeOptionList = Object.values(ThemeOptionsName)

const SettingsGeneral: React.FC = () => {
  const appTheme = useTheme()
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
