import request from '@/utils/request';
import {API_SERVER} from '@/constant/api'

export async function queryIssueDetails(params:{id:number}){
    return request(`${API_SERVER}/problem/${params.id}`)
}