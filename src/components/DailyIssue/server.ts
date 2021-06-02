import request from '@/utils/request'
import {API_SERVER} from '@/constant/api'

export async function queryDailyProblemNowMonth(){
    return request(`${API_SERVER}/problem/daily/month`)
}