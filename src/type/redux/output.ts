import { OUTPUT_RESULT_UPDATE_KEY } from '~/renderer/action/output'

export type OutputResultItem = {
  request: {
    header: string
    params: string
    body: string
  }
  response: {
    data: string
  }
}
export type OutputResult = OutputResultItem[]

export interface OUTPUT_RESULT_UPDATE {
  type: typeof OUTPUT_RESULT_UPDATE_KEY
  result: OutputResult
}

export type OutputAction = OUTPUT_RESULT_UPDATE
