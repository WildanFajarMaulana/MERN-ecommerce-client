import { publicRequest } from "../requestMethod"
import { loginFailed, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch,user)=>{
    dispatch(loginStart())
    try{
        const response = await publicRequest.post('/login',user);
        dispatch(loginSuccess(response.data))
    }catch(e){
        dispatch(loginFailed())
    }
}
