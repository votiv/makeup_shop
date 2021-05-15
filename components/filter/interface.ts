export type SearchStateType = string

export enum SearchActionKind {
  Search = 'SEARCH'
}

export interface SearchActionType {
  type: SearchActionKind
  payload: string
}
