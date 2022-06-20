/* GET APIs */
export const GetEventByID = async (id) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Event/GetEventByID?Id=" + id, {
        method: "GET"
    });

    return ((res.status === 200) ? res.json() : res);
}

export const GetEvents = async (ids) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Event/GetEvents?IDs=" + ids, {
        method: "GET"
    });

    return ((res.status === 200) ? res.json() : res);
}

export const GetAllEvents = async () => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Event/GetAllEvents", {
        method: "GET"
    });

    return ((res.status === 200) ? res.json() : res);
}

export const GetEventsByInterest = async (interestId) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Event/GetEventsByInterest?interestId=" + interestId, {
        method: "GET"
    });

    return ((res.status === 200) ? res.json() : res);
}

export const GetEventsByInterests = async (interestIds) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Event/GetEventsByInterests?ids=" + interestIds, {
        method: "GET"
    });

    return ((res.status === 200) ? res.json() : res);
}

export const GetEventsByLocation = async (latitude, longitude, radius) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Event/GetEventsByLocation?latitude=" + latitude + "&longitude=" + longitude + "&radius=" + radius, {
        method: "GET"
    });

    return ((res.status === 200) ? res.json() : res);
}


/* DELETE APIs */
export const DeleteEvent = async (id) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Event/DeleteEvent?Id=" + id, {
        method: "DELETE"
    });

    return res.status;
}

/* POST APIs */
export const CreateEvent = async (description, interests, members, title, locationBased, latitude, longitude, hostID, maxPeople, minPeople, startEvent) => {
    let res = await
    fetch(process.env.REACT_APP_API_URL + "/Event/CreateEvent", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({description: description, interests: interests, members: members, title: title, locationBased: locationBased, latitude: latitude, longitude: longitude, hostID: hostID, maxPeople: maxPeople, minPeople: minPeople, startEvent: startEvent, hasStarted: false})
    });

    return res;
}
