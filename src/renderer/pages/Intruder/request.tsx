import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { RequestMeth } from '~/constant/intruder'
import IntruderReduxAction from '~/renderer/action/intruder'
import Button from '~/renderer/component/Button'
import Input from '~/renderer/component/Input'
import Select from '~/renderer/component/Select'
import { useTheme } from '~/renderer/component/UseTheme'
import { State as StateType } from '~/type/redux'
import { content, inputBox } from './styles'

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Request: React.FC<PropsForRedux> = ({ intruderOptions, updateMethod }: PropsForRedux) => {
  const appTheme = useTheme()
  return (
    <div className={content(appTheme)}>
      <div className={inputBox(appTheme)}>
        <Select
          className="method-select"
          title={'Method'}
          data={Object.values(RequestMeth)}
          value={intruderOptions.method}
          onChange={(value: string) => {
            updateMethod(value as Values<typeof RequestMeth>)
          }}
        />
        <Input className="url-input" title="URL*" placeholder='E.g. "https://example.com/foobar"' />
        <Button className="curl-parse-btn" title="解析curl命令" />
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
      updateMethod: IntruderReduxAction.updateMethod
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)
