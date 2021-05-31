import request from '@/utils/request';
import {API_SERVER} from '@/constant/api'

export async function queryIssueDetails(params:{id:number}){
    return request(`${API_SERVER}/problem/${params.id}`)
}

export async function queryIssueHistory(params){
    console.log(params)
    return request(`${API_SERVER}/record`,{
        method:"GET",
        params:params
    })
}