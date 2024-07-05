import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeMode, ThemeOptionsName } from '~/constant/app'
import { ConfigKeys } from '~/constant/config'
import Select from '~/renderer/component/Select'

type Props = {
  configKey: Values<typeof ConfigKeys>
}

const SettingsAppearance: React.FC<Props> = ({ configKey }: Props) => {
  const ThemeOptionList = useMemo(() => Object.values(ThemeOptionsName), [])
  const [choose, setChoose] = useState(ThemeOptionList[0])

  const get = async () => {
    const config = await window.Graphql.GetConfig()
    const AppearanceTheme = config?.config?.AppearanceTheme
    return AppearanceTheme
  }

  const set = async (themeMode: Values<typeof ThemeMode>) => {
    await window.Graphql.UpdateConfig({ key: configKey, value: themeMode })
  }

  useEffect(() => {
    get().then(result => {
      if (result) {
        setChoose(ThemeOptionsName[result as Values<typeof ThemeMode>])
      }
    })
  }, [])

  const update = useCallback((value: Values<typeof ThemeOptionsName>) => {
    setChoose(value)
    set(value.id)
  }, [])

  return (
    <Select
      data={ThemeOptionList}
      value={choose}
      onChange={value => update(value as Values<typeof ThemeOptionsName>)}
    />
  )
}

export default SettingsAppearance
