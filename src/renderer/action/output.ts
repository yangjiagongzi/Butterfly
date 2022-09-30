import { Dispatch, GetState } from '~/type/redux'
import { OutputResult, OUTPUT_RESULT_UPDATE } from '~/type/redux/output'

export const OUTPUT_RESULT_UPDATE_KEY = 'OUTPUTRESULT/UPDATE'

function outputResultUpdate(result: OutputResult): OUTPUT_RESULT_UPDATE {
  return {
    type: OUTPUT_RESULT_UPDATE_KEY,
    result: result
  }
}

class OutputReduxAction {
  outputResultUpdate = (result: OutputResult) => {
    return (dispatch: Dispatch, getState: GetState) => {
      dispatch(outputResultUpdate(result))
    }
  }
}

export default new OutputReduxAction()
