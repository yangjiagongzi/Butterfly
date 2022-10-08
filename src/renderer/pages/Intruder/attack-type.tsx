import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { AttackType } from '~/constant/intruder'
import IntruderReduxAction from '~/renderer/action/intruder'
import Select from '~/renderer/component/Select'
import { useTheme } from '~/renderer/component/UseTheme'
import { State as StateType } from '~/type/redux'
import { content, inputBox, introduce } from './styles'

const Payload1 = ['a', 'b', 'c', 'd']
const Payload2 = ['x', 'y', 'z']

type PropsForRedux = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const AttachType: React.FC<PropsForRedux> = ({
  intruderOptions,
  updateAttackType
}: PropsForRedux) => {
  const appTheme = useTheme()
  return (
    <div className={content(appTheme)}>
      <div className={inputBox(appTheme)}>
        <Select
          title={'攻击类型'}
          data={Object.values(AttackType)}
          value={intruderOptions.attackType}
          onChange={(value: string) => {
            updateAttackType(value as Values<typeof AttackType>)
          }}
        />
      </div>
      <div className={introduce(appTheme)}>
        {intruderOptions.attackType === AttackType.Sniper ? (
          <div>
            <div className="text">
              只能使用一组<span>payload</span>集合, 每次只替换一个<span>payload 标记位置</span>
            </div>
            <div className="example-flag">
              标记位置: <SpanList data={['标记位置1', '标记位置2']} />
            </div>
            <div className="example-payload">
              攻击载荷: <SpanList data={Payload1} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th scope="col">攻击编号</th>
                  <th scope="col">标记位置1</th>
                  <th scope="col">标记位置2</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>不替换</td>
                  <td>不替换</td>
                </tr>
                {new Array(Math.min(Payload1.length * 2)).fill('').map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        {idx < Payload1.length ? (
                          <span>{Payload1[idx % Payload1.length]}</span>
                        ) : (
                          '不替换'
                        )}
                      </td>
                      <td>
                        {idx >= Payload1.length ? (
                          <span>{Payload1[idx % Payload1.length]}</span>
                        ) : (
                          '不替换'
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : null}
        {intruderOptions.attackType === AttackType.BatteringRam ? (
          <div>
            <div className="text">
              只能使用一组<span>payload</span>集合, 每次替换所有的<span>payload 标记位置</span>
            </div>
            <div className="example-flag">
              标记位置: <SpanList data={['标记位置1', '标记位置2']} />
            </div>
            <div className="example-payload">
              攻击载荷: <SpanList data={Payload1} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th scope="col">攻击编号</th>
                  <th scope="col">标记位置1</th>
                  <th scope="col">标记位置2</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>不替换</td>
                  <td>不替换</td>
                </tr>
                {Payload1.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <span>{item}</span>
                      </td>
                      <td>
                        <span>{item}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : null}
        {intruderOptions.attackType === AttackType.Pitchfork ? (
          <div>
            <div className="text">
              需要为每个<span>payload 标记位置</span>配置不同的<span>payload</span>集合,
              每次攻击会取出每个<span>payload 标记位置</span>所对应的<span>payload</span>集合,
              直到某个<span>payload</span>集合遍历完
            </div>
            <div className="example-flag">
              标记位置: <SpanList data={['标记位置1', '标记位置2']} />
            </div>
            <div className="example-payload">
              标记位置1 对应的攻击载荷: <SpanList data={Payload1} />
            </div>
            <div className="example-payload">
              标记位置2 对应的攻击载荷: <SpanList data={Payload2} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th scope="col">攻击编号</th>
                  <th scope="col">标记位置1</th>
                  <th scope="col">标记位置2</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>不替换</td>
                  <td>不替换</td>
                </tr>
                {new Array(Math.min(Payload1.length, Payload2.length)).fill('').map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <span>{Payload1[idx]}</span>
                      </td>
                      <td>
                        <span>{Payload2[idx]}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : null}
        {intruderOptions.attackType === AttackType.ClusterBomb ? (
          <div>
            <div className="text">
              需要为每个<span>payload 标记位置</span>配置不同的<span>payload</span>集合, 攻击会测试
              <span>payload</span>集合的所有排列组合
            </div>
            <div className="example-flag">
              标记位置: <SpanList data={['标记位置1', '标记位置2']} />
            </div>
            <div className="example-payload">
              标记位置1 对应的攻击载荷: <SpanList data={Payload1} />
            </div>
            <div className="example-payload">
              标记位置2 对应的攻击载荷: <SpanList data={Payload2} />
            </div>
            <table>
              <tbody>
                <tr>
                  <th scope="col">攻击编号</th>
                  <th scope="col">标记位置1</th>
                  <th scope="col">标记位置2</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>不替换</td>
                  <td>不替换</td>
                </tr>
                {new Array(Math.min(Payload1.length * Payload2.length))
                  .fill('')
                  .map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <span>{Payload1[idx % Payload1.length]}</span>
                        </td>
                        <td>
                          <span>{Payload2[~~(idx / Payload1.length)]}</span>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        ) : null}
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
      updateAttackType: IntruderReduxAction.updateAttackType
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AttachType)

type SpanListProps = {
  data: string[]
}

const SpanList: React.FC<SpanListProps> = ({ data }: SpanListProps) => {
  return (
    <>
      {new Array(Math.min(data.length * 2 - 1)).fill('').map((item, idx) => {
        const isInterval = idx % 2 > 0
        if (isInterval) {
          return (
            <span key={idx} className="normal">
              ,{' '}
            </span>
          )
        }
        const realIdx = ~~(idx / 2)
        return <span key={idx}>{data[realIdx]}</span>
      })}
    </>
  )
}
