import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { AttackType } from '~/constant/intruder'
import IntruderReduxAction from '~/renderer/action/intruder'
import Select from '~/renderer/component/Select'
import { useTheme } from '~/renderer/component/UseTheme'
import { State as StateType } from '~/type/redux'
import { content, inputBox, introduce } from './styles'

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
              标记位置: <span>标记位置1</span>, <span>标记位置2</span>
            </div>
            <div className="example-payload">
              攻击载荷: <span>a</span>, <span>b</span>, <span>c</span>
            </div>
            <table>
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
              <tr>
                <td>1</td>
                <td>
                  <span>a</span>
                </td>
                <td>不替换</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <span>b</span>
                </td>
                <td>不替换</td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <span>c</span>
                </td>
                <td>不替换</td>
              </tr>
              <tr>
                <td>4</td>
                <td>不替换</td>
                <td>
                  <span>a</span>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>不替换</td>
                <td>
                  <span>b</span>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>不替换</td>
                <td>
                  <span>c</span>
                </td>
              </tr>
            </table>
          </div>
        ) : null}
        {intruderOptions.attackType === AttackType.BatteringRam ? (
          <div>
            <div className="text">
              只能使用一组<span>payload</span>集合, 每次替换所有的<span>payload 标记位置</span>
            </div>
            <div className="example-flag">
              标记位置: <span>标记位置1</span>, <span>标记位置2</span>
            </div>
            <div className="example-payload">
              攻击载荷: <span>a</span>, <span>b</span>, <span>c</span>
            </div>
            <table>
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
              <tr>
                <td>1</td>
                <td>
                  <span>a</span>
                </td>
                <td>
                  <span>a</span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <span>b</span>
                </td>
                <td>
                  <span>b</span>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <span>c</span>
                </td>
                <td>
                  <span>c</span>
                </td>
              </tr>
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
              标记位置: <span>标记位置1</span>, <span>标记位置2</span>
            </div>
            <div className="example-payload">
              标记位置1 对应的攻击载荷: <span>a</span>, <span>b</span>, <span>c</span>,{' '}
              <span>d</span>
            </div>
            <div className="example-payload">
              标记位置2 对应的攻击载荷: <span>x</span>, <span>y</span>, <span>z</span>
            </div>
            <table>
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
              {new Array(Math.min(['a', 'b', 'c', 'd'].length, ['x', 'y', 'z'].length))
                .fill('')
                .map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <span>{['a', 'b', 'c', 'd'][idx]}</span>
                      </td>
                      <td>
                        <span>{['x', 'y', 'z'][idx]}</span>
                      </td>
                    </tr>
                  )
                })}
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
              标记位置: <span>标记位置1</span>, <span>标记位置2</span>
            </div>
            <div className="example-payload">
              标记位置1 对应的攻击载荷: <span>a</span>, <span>b</span>, <span>c</span>,{' '}
              <span>d</span>
            </div>
            <div className="example-payload">
              标记位置2 对应的攻击载荷: <span>x</span>, <span>y</span>, <span>z</span>
            </div>
            <table>
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
              {['x', 'y', 'z'].map((payload1, idx1) => {
                return (
                  <>
                    {['a', 'b', 'c', 'd'].map((payload2, idx2) => (
                      <tr key={`${payload1}-${payload2}`}>
                        <td>{idx1 * 4 + (idx2 + 1)}</td>
                        <td>
                          <span>{payload2}</span>
                        </td>
                        <td>
                          <span>{payload1}</span>
                        </td>
                      </tr>
                    ))}
                  </>
                )
              })}
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
