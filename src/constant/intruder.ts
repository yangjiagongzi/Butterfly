import { IntruderOptions } from '~/type/redux/intruder'

export const AttackType = {
  Sniper: '狙击',
  BatteringRam: '横推',
  Pitchfork: '多路并进',
  ClusterBomb: '饱和攻击'
} as const

export const RequestMeth = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
  head: 'HEAD',
  options: 'OPTIONS'
} as const

export const IntruderOptionsDefaultValue: IntruderOptions = {
  attackType: AttackType.Sniper,
  method: RequestMeth.get,
  headers: [{ id: 'default-empty', key: '', value: '', enable: true }],
  params: [{ id: 'default-empty', key: '', value: '', enable: true }]
}
