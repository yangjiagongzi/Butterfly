/**
 * the param should be like 24 or ["00000000", "11111111", "11110001", "00001000"] or [255, 255, 255, 248]
 */
export const resolveSubnetMask = (
  mask: number | [string, string, string, string] | [number, number, number, number]
) => {
  const maskCIDR =
    typeof mask === 'number'
      ? mask
      : mask
          .map(item =>
            typeof item === 'string' ? item.padStart(8, '0') : item.toString(2).padStart(8, '0')
          )
          .join('')
          .replace(/0.*$/g, '').length
  const list = [
    new Array(8).fill('').map((item, idx) => (idx < maskCIDR ? '1' : '0')),
    new Array(8).fill('').map((item, idx) => (idx + 8 < maskCIDR ? '1' : '0')),
    new Array(8).fill('').map((item, idx) => (idx + 16 < maskCIDR ? '1' : '0')),
    new Array(8).fill('').map((item, idx) => (idx + 24 < maskCIDR ? '1' : '0'))
  ]
  return {
    cidr: maskCIDR,
    binary: list.map(item => item.join('')),
    dec: list.map(item => parseInt(item.join(''), 2)),
    hex: list.map(item => parseInt(item.join(''), 2).toString(16)),
    canUse: parseInt(new Array(32 - maskCIDR).fill('1').join(''), 2) - 1 || 0,
    canUseAll: parseInt(new Array(32 - maskCIDR).fill('1').join(''), 2) + 1 || 0
  }
}
