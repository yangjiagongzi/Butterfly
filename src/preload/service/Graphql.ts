import { ExecutionResult } from 'graphql'
import { EventParams, RendererInvokeEventName } from '~/constant/event'
import { RootMutationType, RootQueryType } from '~/type/graphql'
import IPC from '../common/IPC'

export default class Graphql {
  public query = async (
    params: EventParams[typeof RendererInvokeEventName.Graphql]
  ): Promise<ExecutionResult<RootQueryType>> => {
    return await IPC.invoke(RendererInvokeEventName.Graphql, params)
  }

  public mutation = async (
    params: EventParams[typeof RendererInvokeEventName.Graphql]
  ): Promise<ExecutionResult<RootMutationType>> => {
    return await IPC.invoke(RendererInvokeEventName.Graphql, params)
  }
}
