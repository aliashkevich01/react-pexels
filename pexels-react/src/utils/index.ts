/* eslint-disable eqeqeq */
import { QueryParamsInterface } from '../interfaces/QueryParamsInterface';
import { queries } from '../constants';
export const randomizeQueries = () => {
  const max = 20;
  const randomized: Array<string> = [];
  while (randomized.length < 7) {
    const random = getRandomInt(max);
    if (!randomized.includes(queries[random])) {
      randomized.push(queries[random]);
    }
  }
  return randomized;
};
export function getRandomInt(max: number) {
  max = Math.floor(max);
  return Math.floor(Math.random() * max);
}

export const createRequestString = (
  query: string,
  page: number,
  orienation: string,
  size: string,
  color: string
) => {
  const queryParams: QueryParamsInterface = {
    query: query,
    page: page,
    orienation: orienation,
    size: size,
    color: color,
  };
  let result = `https://api.pexels.com/v1/search?per_page=12`;
  for (const key in queryParams) {
    if (
      queryParams[key as keyof QueryParamsInterface] &&
      queryParams[key as keyof QueryParamsInterface] !== 'any'
    ) {
      result += `&${key}=${queryParams[key as keyof QueryParamsInterface]}`;
    }
  }
  return result;
};
if (localStorage.getItem('liked_photos') == undefined) {
  localStorage.liked_photos = '';
  localStorage.liked_photos.slice(1);
}
