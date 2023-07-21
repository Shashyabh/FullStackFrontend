//Save the Data to local storage

export const doLoginLocalStorage=(data)=>{
    localStorage.setItem("userData",JSON.stringify(data));
}


//Get data from local storage
export const getDataFromLocalStorage=()=>{
    const  data= localStorage.getItem("userData");
    if(data!=null){
        return JSON.parse(data)
    }
}


export const getUserFromLocalStorage=()=>{
    const data= getDataFromLocalStorage()
    if(data!=null){
        return data.user;
    }
    return null;
}


export const getTokenFromLocalStorage=()=>{
    const data= getDataFromLocalStorage()
    if(data!=null){
        return data.jwtToken;
    }
    return null;
}



//Remove or logout data 

export const doLogoutFromLocalStorage=(data)=>{
    localStorage.removeItem("userData")
}

//login 

export const isLoggedIn=()=>{
    if(getTokenFromLocalStorage()){
        return true;
    }
    return false;
}

export const isAdminUser=()=>{
    if(isLoggedIn()){
        const user=getUserFromLocalStorage();
        const roles=user.roles;

        if(roles.find((role)=>role.roleId==='wetrsdfwetwfasfwdf')){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}