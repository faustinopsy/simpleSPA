class FetchData {
    constructor(url) {
        this.url = url;
    }

    async getJson() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Could not get data:', error);
        }
    }
}

export default FetchData;