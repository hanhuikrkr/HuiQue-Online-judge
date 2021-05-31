import request from '@/utils/request'
import {API_SERVER} from '@/constant/api'

export async function putCodeRecord(params:{pid:Number,Code:String,languageType: "JAVA"|"CPP"|"PYTHON"}){
    
    return request(`${API_SERVER}/record`,{
        method:"PUT",
        params:params,
      
    })

}

export async function getRecordStateByID(params){
    return request(`${API_SERVER}/record/state`,{
        method:"GET",
        params:{
            id:params
        }
    })
}