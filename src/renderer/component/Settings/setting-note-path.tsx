import React, { useEffect, useState } from 'react'
import { ConfigKeys } from '~/constant/config'
import Input from '~/renderer/component/Input'
import Button from '../Button'
import { useTheme } from '../UseTheme'
import { settingNotePathBox } from './styles'
import Notification from '../Notification'

const SettingsNotePath: React.FC = () => {
  const appTheme = useTheme()
  const [notePath, setNotePath] = useState<string>('')
  const [notePathSaved, setNotePathSaved] = useState<string>('')

  const get = async () => {
    const config = await window.service.Graphql.GetConfig()
    const notePath = config?.config?.NotePath
    return notePath
  }

  const set = async (notePath: string) => {
    await window.service.Graphql.UpdateConfig({ key: ConfigKeys.NotePath, value: notePath })
  }

  useEffect(() => {
    get().then(result => {
      if (result) {
        setNotePath(result)
        setNotePathSaved(result)
      }
    })
  }, [])

  const onSave = async () => {
    const { fs } = await window.service.Graphql.IsDir({ dirPath: notePath })
    const { exists, errorMsg } = fs?.isDir || { exists: false }
    if (exists) {
      set(notePath)
      setNotePathSaved(notePath)
      Notification.show({ message: '保存成功!' })
      return
    }
    setNotePath(notePathSaved)
    Notification.show({ message: errorMsg || '保存失败!', error: true })
  }

  return (
    <div className={settingNotePathBox(appTheme)}>
      <div className="input-flex">
        <Input
          value={notePath}
          onChange={e => {
            setNotePath(e.target.value)
          }}
        />
      </div>
      <Button className="save-btn" title="保存" onClick={onSave} />
    </div>
  )
}

export default SettingsNotePath
