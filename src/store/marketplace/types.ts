/** Types */

/** Actions' types */

export enum MARKETPLACE_ACTIONS {
  SET = 'MARKETPLACE_ACTIONS.SET',
}

/** Actions */

type Set = {
  type: typeof MARKETPLACE_ACTIONS.SET
}

export type ActionTypes = Set
