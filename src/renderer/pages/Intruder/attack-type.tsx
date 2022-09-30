import React from 'react'
import Select from '~/renderer/component/Select'
import { useTheme } from '~/renderer/component/UseTheme'
import { container, inputBox } from './styles'

const AttachType: React.FC = () => {
  const appTheme = useTheme()
  return (
    <div className={container(appTheme)}>
      <div className={inputBox(appTheme)}>
        <Select
          title={'攻击类型攻击类型攻击类型攻击类型'}
          data={['aaa', 'bbb', 'ccc']}
          value={'aaa'}
          onChange={() => {
            console.log(1)
          }}
        />
      </div>
    </div>
  )
}

export default AttachType
