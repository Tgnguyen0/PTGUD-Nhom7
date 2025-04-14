import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    // login: ({ username, password }: { username: string; password: string }) => {
    //     if (username === "admin" && password === "password") {
    //         localStorage.setItem("auth", JSON.stringify({ username }));
    //         return Promise.resolve();
    //     }
    //     return Promise.reject(new Error("Invalid credentials"));
    // },
    login: async ({ username, password }: { username: string; password: string }) => {
        const request = new Request("http://localhost:3000/author/sigin", {
            method: "POST",
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ "Content-Type": "application/json" }),
        });

        const response = await fetch(request);

        if (response.ok) {
            const { token, user } = await response.json();
            // Lưu thông tin xác thực và người dùng vào localStorage
            localStorage.setItem("auth", JSON.stringify({ token, user }));
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("Invalid credentials"));
        }
    },
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
};
