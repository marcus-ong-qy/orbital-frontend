/** Types */

/** Actions' types */

export enum COMMUNITY_ACTIONS {
  SET = 'COMMUNITY_ACTIONS.SET',
}

/** Actions */

type Set = {
  type: typeof COMMUNITY_ACTIONS.SET
}

export type ActionTypes = Set
