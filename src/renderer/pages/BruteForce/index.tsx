import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '~/renderer/component/Button'
import Textarea from '~/renderer/component/Textarea'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, tabList, tabItem, content, contentItem, curlStringBox } from './styles'

const BruteForce: React.FC = (props: any) => {
  const appTheme = useTheme()
  const location = useLocation()
  const [chooseTab, setChooseTab] = useState(1)
  const [dictionary, setDictionary] = useState('')
  const [curlStr, setCurlStr] = useState('')

  useEffect(() => {
    const dictionary = location.state as string
    setDictionary(dictionary || '')
  }, [])

  const parseCurl = () => {
    if (!curlStr) {
      return
    }
  }

  return (
    <div className={container(appTheme)}>
      <div className={tabList(appTheme)}>
        <div className={tabItem(appTheme, chooseTab === 1)} onClick={() => setChooseTab(1)}>
          载荷
        </div>
        <div className={tabItem(appTheme, chooseTab === 2)} onClick={() => setChooseTab(2)}>
          请求参数
        </div>
        <div className={tabItem(appTheme, chooseTab === 3)} onClick={() => setChooseTab(3)}>
          暂停
        </div>
      </div>
      <div className={content(appTheme)}>
        {chooseTab === 1 ? (
          <div className={contentItem(appTheme)}>
            <Textarea
              className={'payload'}
              value={dictionary}
              onChange={e => setDictionary(e.target.value)}
            />
          </div>
        ) : null}
        {chooseTab === 2 ? (
          <div className={contentItem(appTheme)}>
            <div className="title">解析curl命令</div>
            <div className={curlStringBox(appTheme, !!curlStr.trim())}>
              <Textarea
                rows={5}
                value={curlStr}
                placeholder={'粘贴curl命令进行解析'}
                onChange={e => setCurlStr(e.target.value)}
              />
              <div className="button-container">
                <Button onClick={parseCurl} title="解析" />
              </div>
            </div>
            <div className="title">手动配置</div>
          </div>
        ) : null}
        {chooseTab === 3 ? <div className={contentItem(appTheme)}></div> : null}
      </div>
    </div>
  )
}

export default BruteForce
