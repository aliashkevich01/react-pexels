import { LOCALES } from "../../../i18n/locales";
import { ActionInterface } from "../../../interfaces/ActionInterface";
import { PhotoInterface } from "../../../interfaces/PhotoInterface";
import { ResponseInterface } from "../../../interfaces/responseInterface";
import { CHANGE_LOCALE, LOAD_BACKGROUND, LOAD_BACKGROUND_SUCCESS, LOAD_PHOTOS, LOAD_PHOTOS_FAILED, LOAD_PHOTOS_SUCCESS } from "./actions";
export interface stateInterface {
    query: string;
    data: ResponseInterface;
    page: number;
    orientation: string;
    size: string;
    color: string;
    isLoading: boolean,
    isError: null | Error,
    backPhoto : PhotoInterface;
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
  url: "",
  photographer: "",
  photographer_url: "",
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
}

export const photoReducer = (state = initialState, action: ActionInterface) => {
    switch(action.type){
        case LOAD_PHOTOS: {
            const { query, page, orientation, size } = action.payload;
            return {
                ...state,
                isLoading: true,
                query: query,
                page: page,
                orientation: orientation,
                size: size,
            }
        }
        case LOAD_PHOTOS_SUCCESS: {
           const prevData = state;
           const newData = action.payload;
           if(newData.query === prevData.query 
              && newData.orientation === prevData.orientation 
              && newData.size === prevData.size 
              && newData.color === prevData.color){
                return {
                ...state,
                isLoading: false,
                data: {
                   ...action.payload.data,
                    photos: [
                        ...prevData.data.photos,
                        ...newData.data.photos,
                    ]
               }
            }          
           }
            return {
                ...state,
                query: newData.query,
                orientation: newData.orientation,
                size: newData.size,
                color: newData.color,
                page: 1,
                isLoading: false,
                data: {
                    ...newData.data,
                    photos: newData.data.photos
                },
            }
        }
        case LOAD_PHOTOS_FAILED: {
            return {
                ...state,
                data: {
                    photos: [],
                },
                isLoading: false,
                error: action.payload,
            }
        } 
        case LOAD_BACKGROUND: {
            return state;
        }
        case LOAD_BACKGROUND_SUCCESS: {
            return {
                ...state,
                backPhotos: action.payload.backPhoto,
            }
        }
        case CHANGE_LOCALE: {
            return {
                ...state,
                locale: action.payload.locale,
            }
        }
        default: return state;
    }
}