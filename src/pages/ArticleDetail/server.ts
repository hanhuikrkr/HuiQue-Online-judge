import {request} from ' @/utils/request'
import {API_SERVER} from '@/constant/api'

export async function querySolutionId(params:number){
    return request(`${API_SERVER}/solution/${params}`)
}

