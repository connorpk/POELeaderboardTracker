import {Account} from './account.interface'
export interface Response{
    total?: number;
    cachedSince?: string;
    entries?: Account[];
}