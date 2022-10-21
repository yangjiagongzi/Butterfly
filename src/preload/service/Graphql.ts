import { EventParams, RendererInvokeEventName } from '~/constant/event'
import IPC from '../common/IPC'

export default async function graphql(params: EventParams[typeof RendererInvokeEventName.Graphql]) {
  return await IPC.invoke(RendererInvokeEventName.Graphql, params)
}
