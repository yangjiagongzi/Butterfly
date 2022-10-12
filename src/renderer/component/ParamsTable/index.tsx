import React from 'react'
import { HeaderParamsItem } from '~/type/redux/intruder'
import Icon from '../Icon'
import { useTheme } from '../UseTheme'
import { tableContainer } from './styles'

type Props = {
  params: HeaderParamsItem[]
  onChange: (idx: number, value: HeaderParamsItem) => void
  onDelete: (idx: number) => void
}

const ParamsTable: React.FC<Props> = ({ params, onChange, onDelete }: Props) => {
  const appTheme = useTheme()

  return (
    <div className={tableContainer(appTheme)}>
      <table>
        <thead>
          <tr>
            <th scope="col">key</th>
            <th scope="col">value</th>
            <th scope="col">enable</th>
          </tr>
        </thead>
        <tbody>
          {params.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <input
                    value={item.key}
                    placeholder="key"
                    onChange={e => onChange(idx, { ...item, key: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={item.value}
                    placeholder="value"
                    onChange={e => onChange(idx, { ...item, value: e.target.value })}
                  />
                </td>
                <td>
                  {item.enable ? 1 : 0}
                  {item.key || item.value ? (
                    <div className="del" onClick={() => onDelete(idx)}>
                      <Icon name={'Close'} size={'xs'} color={appTheme.colors.textDark} />
                    </div>
                  ) : null}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ParamsTable
