/* GET APIs */
export const Login = async (email, password) => {
        let res = await
        fetch(process.env.REACT_APP_API_URL + "/Login?email=" + email + "&password=" + password, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });

        return ((res.status === 200) ? res.text() : res);
}

export const GetUserDetails = async (userID) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/User/Details/" + userID, {
        method: "GET"
    });

    return ((res.status === 200) ? res.json() : res);
}

export const GetTokenDetails = async (token) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/User/Details", {
        method: "GET",
        headers: { 
            "Authorization": "Bearer " + token 
        }
    });

    return ((res.status === 200) ? res.json() : res);
}


/* POST APIs */
export const Register = async (username, email, password, imgString) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Login/Register", {
        method: "POST",
        body: JSON.stringify({username: username, email: email, password: password, imgString: imgString ?? ""})
    });

    return res.status
}

export const AttendEvent = async (token, eventID) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/User/AttendEvent/" + eventID, {
        method: "POST",
        headers: { 
            "Authorization": "Bearer " + token 
        }
    });

    return res.status
}

export const AddUserInterest = async (token, interestID) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/User/AddInterest/" + interestID, {
        method: "POST",
        headers: { 
            "Authorization": "Bearer " + token 
        }
    });

    return res.status
}

/* DELETE APIs */
export const UnattendEvent = async (token, eventID) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/User/UnattendEvent/" + eventID, {
        method: "DELETE",
        headers: { 
            "Authorization": "Bearer " + token 
        }
    });

    return res.status
}

export const RemoveUserInterest = async (token, interestID) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/User/RemoveInterest/" + interestID, {
        method: "DELETE",
        headers: { 
            "Authorization": "Bearer " + token 
        }
    });

    return res.status
}