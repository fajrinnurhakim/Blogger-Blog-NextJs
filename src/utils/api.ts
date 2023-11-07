export const getPost = async (page: number = 1): Promise<any> => {
    try {
        const response = await fetch(
            `https://gorest.co.in/public/v2/posts?page=${page}`
        );
        if (!response.ok) {
            throw new Error("Bad request.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};
