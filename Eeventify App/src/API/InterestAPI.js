/* GET APIs */
export const GetInterests = async (searchterm, sort) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Interests?search=" + searchterm + "&sort=" + sort ?? false, {
        method: "GET"
    });

    return ((res.status === 200) ? res.json() : res);
}

export const GetInterest = async (interestID) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Interests/" + interestID, {
        method: "GET"
    });

    return ((res.status === 200) ? res.json() : res);
}