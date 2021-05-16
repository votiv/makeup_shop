import { Dispatch } from 'react'

export type SearchStateType = string

export enum SearchActionKind {
  Search = 'SEARCH'
}

export interface SearchActionType {
  type: SearchActionKind
  payload: string
}

export interface FBType {
  isOpen: boolean
}

export interface FilterButtonType extends FBType {
  onClick: () => void
}

export interface SearchType {
  doSearch: Dispatch<SearchActionType>
}
