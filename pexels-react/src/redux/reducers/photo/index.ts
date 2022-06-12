import { LOCALES } from '../../../i18n/locales';
import { ActionInterface } from '../../../interfaces/ActionInterface';
import { PhotoInterface } from '../../../interfaces/PhotoInterface';
import { ResponseInterface } from '../../../interfaces/responseInterface';
import {
  CHANGE_LOCALE,
  LOAD_BACKGROUND,
  LOAD_BACKGROUND_SUCCESS,
  LOAD_PHOTOS,
  LOAD_PHOTOS_FAILED,
  LOAD_PHOTOS_SUCCESS,
} from './actions';
export interface stateInterface {
  query: string;
  data: ResponseInterface;
  page: number;
  orientation: string;
  size: string;
  color: string;
  isLoading: boolean;
  isError: null | Error;
  backPhoto: PhotoInterface;
  locale: string;
}
const initialState: stateInterface = {
  query: 'soccer',
  data: {
    total_results: 1,
    page: 1,
    per_page: 9,
    photos: [],
    prev_page: '',
    next_page: '',
  },
  page: 1,
  orientation: '',
  size: '',
  color: '',
  isLoading: false,
  isError: null,
  backPhoto: {
    id: 0,
    width: 0,
    height: 0,
    url: '',
    photographer: '',
    photographer_url: '',
    photographer_id: 0,
    avg_color: '',
    src: {
      original: '',
      large2x: '',
      large: '',
      medium: '',
      small: '',
      portrait: '',
      landscape: '',
      tiny: '',
    },
    liked: false,
    alt: '',
  },
  locale: LOCALES.ENGLISH,
};

export const photoReducer = (state = initialState, action: ActionInterface) => {
  const prevData = state;
  switch (action.type) {
    case LOAD_PHOTOS: {
      const newData = action.payload;
      const { query, page, orientation, size, color } = action.payload;
      if (newData.page === prevData.page || newData.page === 1) {
        return {
          ...state,
          isLoading: true,
          query: query,
          page: page,
          orientation: orientation,
          size: size,
          color: color,
          data: {
            photos: [],
          },
        };
      }
      return {
        ...state,
        isLoading: true,
        query: query,
        page: page,
        orientation: orientation,
        size: size,
        color: color,
      };
    }
    case LOAD_PHOTOS_SUCCESS: {
      const newData = action.payload;
      return {
        ...state,
        isLoading: false,
        data: {
          ...action.payload.data,
          photos: [...prevData.data.photos, ...newData.data.photos],
        },
      };
    }
    case LOAD_PHOTOS_FAILED: {
      return {
        ...state,
        data: {
          photos: [],
        },
        isLoading: false,
        isError: action.payload,
      };
    }
    case LOAD_BACKGROUND: {
      return state;
    }
    case LOAD_BACKGROUND_SUCCESS: {
      return {
        ...state,
        backPhoto: action.payload,
      };
    }
    case CHANGE_LOCALE: {
      return {
        ...state,
        locale: action.payload.locale,
      };
    }
    default:
      return state;
  }
};
