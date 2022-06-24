import { stateInterface } from '../reducers/photo';
import { createAction } from '@reduxjs/toolkit';
import { StateInterface } from '../../interfaces/StateInterface';
import { PayloadInterface } from '../../interfaces/ActionInterface';
export const LOAD_PHOTOS = 'LOAD_PHOTOS';
export const LOAD_PHOTOS_SUCCESS = 'LOAD_PHOTOS_SUCCESS';
export const LOAD_PHOTOS_FAILED = 'LOAD_PHOTOS_FAILED';
export const LOAD_BACKGROUND = 'LOAD_BACKGROUND';
export const LOAD_BACKGROUND_SUCCESS = 'LOAD_BACKGROUND_SUCCESS';
export const CHANGE_LOCALE = 'CHANGE_LOCALE';
function searchByQuery(data: StateInterface, value: string): { payload: PayloadInterface } {
  return {
    payload: {
      ...data.photo,
      query: value,
      page: 1,
    },
  };
}
export const SearchByQueryAction = createAction(LOAD_PHOTOS, searchByQuery);

function searchByColor(
  data: StateInterface,
  value: string,
  query: string,
  orientation: string,
  size: string
): { payload: PayloadInterface } {
  return {
    payload: {
      ...data.photo,
      query: query,
      page: 1,
      orientation: orientation,
      size: size,
      color: value,
    },
  };
}
export const SearchByColorAction = createAction(LOAD_PHOTOS, searchByColor);
export function searchBySize(
  data: StateInterface,
  value: string,
  query: string,
  orientation: string,
  color: string
): { payload: PayloadInterface } {
  return {
    payload: {
      ...data.photo,
      query: query,
      page: 1,
      orientation: orientation,
      size: value,
      color: color,
    },
  };
}
export const searchBySizeAction = createAction(LOAD_PHOTOS, searchBySize);
export function searchByOrientation(
  data: StateInterface,
  value: string,
  query: string,
  size: string,
  color: string
): { payload: PayloadInterface } {
  return {
    payload: {
      ...data.photo,
      query: query,
      page: 1,
      orientation: value,
      size: size,
      color: color,
    },
  };
}
export const searchByOrientationAction = createAction(LOAD_PHOTOS, searchByOrientation);
export function searchByMainScroll(
  data: StateInterface,
  query: string,
  page: number
): { payload: PayloadInterface } {
  return {
    payload: {
      ...data.photo,
      query: query,
      page: page + 1,
    },
  };
}
export const searchByMainAction = createAction(LOAD_PHOTOS, searchByMainScroll);
export function searchByCategoriesScroll(
  data: StateInterface,
  query: string,
  page: number,
  orientation: string,
  size: string,
  color: string
): { payload: PayloadInterface } {
  return {
    payload: {
      ...data.photo,
      query: query,
      page: page + 1,
      orientation: orientation,
      size: size,
      color: color,
    },
  };
}
export const searchByCategoriesAction = createAction(LOAD_PHOTOS, searchByCategoriesScroll);
export function changeLocale(
  data: stateInterface,
  switchedLanguage: string
): { payload: PayloadInterface } {
  return {
    payload: {
      ...data,
      locale: switchedLanguage,
    },
  };
}
export const ChangeLocaleAction = createAction(CHANGE_LOCALE, changeLocale);
