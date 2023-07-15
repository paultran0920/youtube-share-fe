import { AccountDto } from './account-model';

export type JSONDto = { [key: string]: any };

export interface BaseDto {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export interface User extends AccountDto {}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class BaseCriteria {
  /**
   * Search criteria
   */
  searchCriteria: string = '';
  /**
   * Which page will be returned.
   * Default is all pages (if not specified)
   */
  page: number = 1;
  /**
   * Number of items per page.
   * Default is 10
   */
  pageSize: number = 10;
  /**
   * Sorting order.
   * Default is ASC
   */
  sort: SortOrder = SortOrder.DESC;
  /**
   * Sort column
   */
  sortColumn: string[] = ['createdAt', 'modifiedAt'];

  constructor(
    searchCriteria: string = '',
    page: number = 1,
    pageSize: number = 10,
    sort: SortOrder = SortOrder.DESC,
    sortColumn: string[] = ['createdAt', 'modifiedAt']
  ) {
    this.searchCriteria = searchCriteria;
    this.page = page;
    this.pageSize = pageSize;
    this.sort = sort;
    this.sortColumn = Array.from(
      new Set<string>([...sortColumn, 'createdAt', 'modifiedAt'])
    );
  }

  rewriteUrlParams() {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', `${this.page}`);
    newSearchParams.set('filter', `${this.searchCriteria}`);

    return newSearchParams;
  }
}

export interface ListResult<T> {
  totalPage: number;
  items: T[];
}
