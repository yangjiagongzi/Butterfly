import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { IntruderOptionsDelayBetweenReqType } from '~/constant/intruder'
import IntruderReduxAction from '~/renderer/action/intruder'
import Input from '~/renderer/component/Input'
import Select from '~/renderer/component/Select'
import { useTheme } from '~/renderer/component/UseTheme'
import { State as StateType } from '~/type/redux'
import { content, settingParamGroup } from './styles'

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Settings: React.FC<PropsForRedux> = ({ intruderOptions, updateSettings }: PropsForRedux) => {
  const appTheme = useTheme()
  const delayBetweenReqTypeList = useMemo(
    () => Object.values(IntruderOptionsDelayBetweenReqType),
    []
  )
  const settings = useMemo(() => intruderOptions.settings, [intruderOptions])

  return (
    <div className={content(appTheme)}>
      <div className={settingParamGroup(appTheme)}>
        <div className="title">资源池:</div>
        <div className="items">
          <div className="sub-title">最大并发请求:</div>
          <Input
            className="margin-left"
            value={settings.maximumConcurrentReq}
            onChange={e => {
              const num = Number(e.target.value)
              if (!Number.isNaN(num) && num >= 0) {
                updateSettings({ ...settings, maximumConcurrentReq: num })
              }
            }}
          />
        </div>
        <div className="items">
          <div className="sub-title">请求之间延迟:</div>
          <Select
            className="margin-left"
            data={delayBetweenReqTypeList}
            value={{
              id: settings.delayBetweenRes.type,
              name:
                delayBetweenReqTypeList.find(item => item.id === settings.delayBetweenRes.type)
                  ?.name || ''
            }}
            onChange={value => {
              updateSettings({
                ...settings,
                delayBetweenRes: {
                  ...settings.delayBetweenRes,
                  type: value.id as Values<typeof IntruderOptionsDelayBetweenReqType>['id']
                }
              })
            }}
          />
        </div>
        <div className="sub-items">
          {settings.delayBetweenRes.type === IntruderOptionsDelayBetweenReqType.Fixed.id ? (
            <>
              <Input
                className="margin-left margin-right"
                value={settings.delayBetweenRes.fixedValue}
                onChange={e => {
                  const num = Number(e.target.value)
                  if (!Number.isNaN(num) && num >= 0) {
                    updateSettings({
                      ...settings,
                      delayBetweenRes: {
                        ...settings.delayBetweenRes,
                        fixedValue: num
                      }
                    })
                  }
                }}
              />
              毫秒
            </>
          ) : null}
          {settings.delayBetweenRes.type === IntruderOptionsDelayBetweenReqType.Random.id ? (
            <>
              <Input
                className="margin-left margin-right"
                value={settings.delayBetweenRes.randomValue[0]}
                onChange={e => {
                  const num = Number(e.target.value)
                  if (!Number.isNaN(num) && num >= 0) {
                    updateSettings({
                      ...settings,
                      delayBetweenRes: {
                        ...settings.delayBetweenRes,
                        randomValue: [num, settings.delayBetweenRes.randomValue[1]]
                      }
                    })
                  }
                }}
              />
              -
              <Input
                className="margin-left margin-right"
                value={settings.delayBetweenRes.randomValue[1]}
                onChange={e => {
                  const num = Number(e.target.value)
                  if (!Number.isNaN(num) && num >= 0) {
                    updateSettings({
                      ...settings,
                      delayBetweenRes: {
                        ...settings.delayBetweenRes,
                        randomValue: [settings.delayBetweenRes.randomValue[0], num]
                      }
                    })
                  }
                }}
              />
              毫秒
            </>
          ) : null}
          {settings.delayBetweenRes.type === IntruderOptionsDelayBetweenReqType.Increase.id ? (
            <>
              <Input
                className="margin-left margin-right"
                value={settings.delayBetweenRes.increaseValue}
                onChange={e => {
                  const num = Number(e.target.value)
                  if (!Number.isNaN(num) && num >= 0) {
                    updateSettings({
                      ...settings,
                      delayBetweenRes: {
                        ...settings.delayBetweenRes,
                        increaseValue: num
                      }
                    })
                  }
                }}
              />
              毫秒
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state: StateType) {
  return {
    intruderOptions: state.intruderOptions
  }
}
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      updateSettings: IntruderReduxAction.updateSettings
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
