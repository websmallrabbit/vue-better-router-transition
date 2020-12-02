import { fetchApi } from '../utils/fetchApi'
export const testTimeOut = params => fetchApi('/api/TimeOut', params, 'GET', 'N', 'Y', '', 'timeOut')
