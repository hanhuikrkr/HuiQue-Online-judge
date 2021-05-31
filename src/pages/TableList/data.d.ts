/*
 * @Author: your name
 * @Date: 2021-05-13 17:28:24
 * @LastEditTime: 2021-05-27 13:32:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\pages\TableList\data.d.ts
 */
export type TableListItem = {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
};

export type TableListPagination = {
  lastId: number; //(入参)上一页最后一项的id，如果这个参数>0，则pageNumber失效
  pageSize: number; // (入参)每页大小
  pageNumber: number; //(入参)第几页
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};
// todo:修改题目列表读取类型
export type TableListParams = {
  level?: 'EASY' | 'MEDIUM' | 'HARD' | 'all';
  lastId?: number; //(入参)上一页最后一项的id，如果这个参数>0，则pageNumber失效
  pageSize?: number; // (入参)每页大小
  pageNumber?: number; //(入参)第几页
  tags?: Array<Number>;
  searchVal?: string;
};
