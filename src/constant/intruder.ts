import { IntruderOptions } from '~/type/redux/intruder'

export const AttackType = {
  Sniper: '狙击',
  BatteringRam: '横推',
  Pitchfork: '多路并进',
  ClusterBomb: '饱和攻击'
} as const

export const IntruderOptionsDefaultValue: IntruderOptions = {
  attackType: AttackType.Sniper
}
