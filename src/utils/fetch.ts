export const getPosts = async (page: number = 1): Promise<any> => {
    try {
        const response = await fetch(
            `https://gorest.co.in/public/v2/posts?page=${page}&per_page=6`
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

export const getComment = async (postId: number) => {
    try {
        const response = await fetch(
            `https://gorest.co.in/public/v2/comments?post_id=${postId}`
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

export const getUsers = async (page: number = 1): Promise<any> => {
    try {
        const response = await fetch(
            `https://gorest.co.in/public/v2/users?page=${page}&per_page=6`
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
