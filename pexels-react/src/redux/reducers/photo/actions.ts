import { stateInterface } from '.';

export const LOAD_PHOTOS = 'LOAD_PHOTOS';
export const LOAD_PHOTOS_SUCCESS = 'LOAD_PHOTOS_SUCCESS';
export const LOAD_PHOTOS_FAILED = 'LOAD_PHOTOS_FAILED';
export const LOAD_BACKGROUND = 'LOAD_BACKGROUND';
export const LOAD_BACKGROUND_SUCCESS = 'LOAD_BACKGROUND_SUCCESS';
export const CHANGE_LOCALE = 'CHANGE_LOCALE';

export function searchByQueryAction(value: string) {
  return {
    type: LOAD_PHOTOS,
    payload: {
      query: value,
      page: 1,
    },
  };
}
export function searchByColorAction(
  value: string,
  query: string,
  orientation: string,
  size: string
) {
  return {
    type: LOAD_PHOTOS,
    payload: {
      query: query,
      page: 1,
      orientation: orientation,
      size: size,
      color: value,
    },
  };
}
export function searchBySizeAction(
  value: string,
  query: string,
  orientation: string,
  color: string
) {
  return {
    type: LOAD_PHOTOS,
    payload: {
      query: query,
      page: 1,
      orientation: orientation,
      size: value,
      color: color,
    },
  };
}
export function searchByOrientationAction(
  value: string,
  query: string,
  size: string,
  color: string
) {
  return {
    type: LOAD_PHOTOS,
    payload: {
      query: query,
      page: 1,
      orientation: value,
      size: size,
      color: color,
    },
  };
}

export function searchByMainScroll(query: string, page: number) {
  return {
    type: LOAD_PHOTOS,
    payload: {
      query: query,
      page: page + 1,
    },
  };
}

export function searchByCategoriesScroll(
  query: string,
  page: number,
  orientation: string,
  size: string,
  color: string
) {
  return {
    type: LOAD_PHOTOS,
    payload: {
      query: query,
      page: page + 1,
      orientation: orientation,
      size: size,
      color: color,
    },
  };
}

export function changeLocale(data: stateInterface, switchedLanguage: string) {
  return {
    type: CHANGE_LOCALE,
    payload: {
      ...data,
      locale: switchedLanguage,
    },
  };
}
