import request from '@/utils/request';
import type { ListItemDataType } from './data.d';
import {API_SERVER} from '@/constant/api'
export async function queryFakeList(params: ListItemDataType) {
  console.log(params)
  return request(`${API_SERVER}/solution`, {
    params,
  });
}
