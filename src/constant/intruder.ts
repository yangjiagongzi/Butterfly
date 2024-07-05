import { IntruderOptions } from '~/type/redux/intruder'

export const AttackType = {
  Sniper: { id: 'Sniper', name: '狙击' },
  BatteringRam: { id: 'BatteringRam', name: '横推' },
  Pitchfork: { id: 'Pitchfork', name: '多路并进' },
  ClusterBomb: { id: 'ClusterBomb', name: '饱和攻击' }
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
  attackType: AttackType.Sniper.id,
  method: RequestMeth.get,
  headers: [{ id: 'default-empty', key: '', value: '', enable: true }],
  params: [{ id: 'default-empty', key: '', value: '', enable: true }]
}
