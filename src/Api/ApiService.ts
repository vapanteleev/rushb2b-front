import { IApiService } from "./IApiService";
const backendUrl = "http://localhost:4000"
const ApiService: IApiService = {
    async GetActivities() {
        try {
            const response = await fetch(backendUrl + '/api/activities', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return [];
        }
    }
}
export { ApiService }