import  request from "@/utils/request"
import {API_SERVER} from "@/constant/api"
export type submitDocParamsType = {
    content: string, 
    pid: number, 
    tags:Array<number>
    title:string,
    summary:string
}
export async function submitDoc(params:submitDocParamsType):Promise<any>{
    return request(`${API_SERVER}/solution`,{
        method:"PUT",
        data:params,
    })
}