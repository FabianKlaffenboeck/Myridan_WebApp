import {API_ENDPOINT, genHeader} from "@/api/API.ts";
import type {Tray} from "@/Models/Tray.ts";

export async function getTrays(): Promise<Tray[]> {
    const response = await fetch(API_ENDPOINT + '/trays', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}

export async function getEmptyTrays(): Promise<Tray[]> {
    const response = await fetch(API_ENDPOINT + '/trays/empty', {
        method: 'GET',
        headers: genHeader(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch parts');
    }
    return await response.json();
}

// export async function updateShelf(shelf: Shelf): Promise<Shelf> {
//     const response = await fetch(API_ENDPOINT + '/shelfs', {
//         method: 'POST',
//         headers: genHeader(),
//         body: JSON.stringify(shelf)
//     });
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
// }