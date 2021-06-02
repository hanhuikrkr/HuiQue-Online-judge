import request from '@/utils/request';
import { API_SERVER } from '@/constant/api';


export async function queryItemsList(params: { favoriteId: number }) {
    return request(`${API_SERVER}/favorite/item`, { method: 'GET', params: params });
  }