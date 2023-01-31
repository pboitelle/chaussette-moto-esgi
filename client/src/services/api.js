import axios from "axios";

function createRequest() {
    return axios.create({
        baseURL: "http://localhost:9000"
    });
}

export async function getUsers() {
    const request = createRequest();

    const response = await request.get("/api/users");

    return response.data;
}

export async function getUser(id) {
    const request = createRequest();

    const response = await request.get(`/api/users/${id}`);

    return response.data.rows;
}

function createRequestSse() {
    return axios.create({
        baseURL: "http://localhost:9001",
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache"
        }
    });
}

//get notifications
export async function getNotifications() {
    const request = createRequestSse();

    const response = await request.get("/api/notifications");

    return response.data.rows;
}

//post notifications
export async function postNotifications(message) {
    const request = createRequestSse();
    console.log("message",message)
    const response = await request.post("/api/notifications", {message: message});

    return response.data.rows;
}
