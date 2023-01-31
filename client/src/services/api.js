import axios from "axios";

function createRequest() {
    return axios.create({
        baseURL: "http://localhost:9000"
    });
}

export async function getUsers() {
    const request = createRequest();

    const response = await request.get("/api/users");

    return response.data.rows;
}

export async function getConseillers() {
    const request = createRequest();

    const response = await request.get("/api/conseillers");

    return response.data.rows;
}

export async function getDemandes() {
    const request = createRequest();

    const response = await request.get("/api/demandes");

    return response.data.rows;
}

export async function getSalons() {
    const request = createRequest();

    const response = await request.get("/api/salons");

    return response.data.rows;
}

export async function checkDemande() {
    const request = createRequest();

    const response = await request.get("/api/demande/check");

    if (response.data.success) {
        return response.data.rows[0];
    } else {
        return false;
    }
}