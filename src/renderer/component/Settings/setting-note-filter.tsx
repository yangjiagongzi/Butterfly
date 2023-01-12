import React, { useEffect, useState } from 'react'
import { ConfigKeys } from '~/constant/config'
import { NoteFileTypes } from '~/constant/note'
import Radio from '../Radio'
import { useTheme } from '../UseTheme'
import { settingNotePathBox } from './styles'

type Props = {
  configKey: Values<typeof ConfigKeys>
}

const SettingsNoteFilter: React.FC<Props> = ({ configKey }: Props) => {
  const appTheme = useTheme()
  const [noteFilter, setNoteFilter] = useState<string[]>([])

  const get = async () => {
    const config = await window.service.Graphql.GetConfig()
    const noteFilter = config?.config?.NoteFilter
    return noteFilter
  }

  const set = async (noteFilter: string) => {
    await window.service.Graphql.UpdateConfig({ key: configKey, value: noteFilter })
  }

  useEffect(() => {
    get().then(result => {
      if (result) {
        const filters = JSON.parse(result)
        setNoteFilter(filters)
      }
    })
  }, [])

  const onToggleItem = (item: string) => {
    let newFilters = []
    if (noteFilter.includes(item)) {
      newFilters = noteFilter.filter(f => f !== item)
    } else {
      newFilters = [...noteFilter, item]
    }
    setNoteFilter(newFilters)
    set(JSON.stringify(newFilters))
  }

  return (
    <div className={settingNotePathBox(appTheme)}>
      {NoteFileTypes.map(item => (
        <Radio
          key={item}
          title={`.${item}`}
          checked={noteFilter.includes(item)}
          onChange={() => onToggleItem(item)}
        />
      ))}
    </div>
  )
}

export default SettingsNoteFilter
