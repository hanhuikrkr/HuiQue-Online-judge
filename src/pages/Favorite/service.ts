import request from '@/utils/request';
import { API_SERVER } from '@/constant/api';

// old func name :queryFakeList
// 获取用户的收藏夹列表
export async function queryDicList() {
  return request(`${API_SERVER}/favorite`);
}

export async function addFavoriteDic(params: { name: string }) {
  return request(`${API_SERVER}/favorite`, { method: 'PUT', params: params });
}

// get list of items in one fold
export async function queryItemsList(params: { favoriteId: number }) {
  return request(`${API_SERVER}/favorite/item`, { method: 'GET', params: params });
}
// change favorite fold name修改收藏夹名称
export async function changeDicName(params: { favoriteId: number; name: string }) {
  return request(`${API_SERVER}/favorite`, {
    method: 'POST',
    params: params,
  });
}
// add one item to one favorite fold
// ATTENTION:favritesId ? favoriteId?
export async function addFavoriteItem(params: {
  favoriteId: number;
  itemId: number;
  type: 'PROBLEM' | 'SOLUTION';
}) {
  return request(`${API_SERVER}/favorite/item`, {
    method: 'PUT',
    params: params,
  });
}
// 删除收藏夹中的某一项
export async function removeFavoriteItem(params: { favoriteItemId: number }) {
  return request(`${API_SERVER}/favorite/item`, { method: 'DELETE', params: params });
}
