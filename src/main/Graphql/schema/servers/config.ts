import { getAllConfig } from '~/main/Database/models/config'
import { formatConfigWithDefaultValue } from '~/utils/Config'

export const getConfig = async () => {
  const allConfig = await getAllConfig()
  return formatConfigWithDefaultValue(allConfig)
}
