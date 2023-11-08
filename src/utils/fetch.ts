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

export const deleteUser = async (userId: number): Promise<any> => {
    try {
        const response = await fetch(
            `https://gorest.co.in/public/v2/users/${userId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer 8ae35952545413abeba0a28f31eb643d0f646dc50b1033a1b1aaea8f533eaa08`,
                },
            }
        );
        if (!response.ok) {
            throw new Error("Bad request.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting user:", error);
        return [];
    }
};

export const createUser = async (user: any): Promise<any> => {
    try {
        const response = await fetch(`https://gorest.co.in/public/v2/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer 8ae35952545413abeba0a28f31eb643d0f646dc50b1033a1b1aaea8f533eaa08`,
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Bad request.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating user:", error);
        return [];
    }
};

export const updateUser = async (userId: number, user: any): Promise<any> => {
    try {
        const response = await fetch(
            `https://gorest.co.in/public/v2/users/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 8ae35952545413abeba0a28f31eb643d0f646dc50b1033a1b1aaea8f533eaa08`,
                },
                body: JSON.stringify(user),
            }
        );
        if (!response.ok) {
            throw new Error("Bad request.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating user:", error);
        return [];
    }
};
