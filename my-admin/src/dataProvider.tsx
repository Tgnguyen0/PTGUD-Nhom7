import { DataProvider, fetchUtils } from "react-admin";
const API_URL = "http://localhost:3000";
export const dataProvider: DataProvider = {
    getList: async (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const url = `${API_URL}/${resource}/all-movies?_page=${page}&_limit=${perPage}&_sort=${field}&_order=${order}`;
        const response = await fetchUtils.fetchJson(url);

        // Giả sử dữ liệu được trả về trong response.json.result và header có x-total-count
        const data = response.json.result;

        return {
            data: data.map((item: any) => ({
                id: item._id, // Chuyển đổi _id thành id
                ...item,
            })),
            total: parseInt(response.headers.get("x-total-count") || `${data.length}`, 10),
        };
    },

    getOne: async (resource: string, params: any) => {
        try {
            const url = `${API_URL}/${resource}/by-id/${params.id}`; // Sử dụng params.id (đảm bảo id tồn tại)
            console.log("getOne URL:", url); // Debug URL để kiểm tra giá trị

            // Lấy response từ fetchUtils.fetchJson
            const response = await fetchUtils.fetchJson(url);

            // Trả về dữ liệu đúng định dạng
            return {
                data: {
                    id: response.json._id, // Map _id thành id
                    ...response.json,      // Sao chép các thuộc tính khác
                },
            };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error message:", error.message); // Truy cập thuộc tính `message`
            } else {
                console.error("Unknown error:", error); // Xử lý các kiểu lỗi khác
            }
            throw error;
        }
    },

    getMany: async (resource: string, params: any) => {
        try {
            console.log("Resource:", resource); // Debugging resource value
            const url = `${API_URL}/${resource}/many?ids=${params.ids.join(",")}`;
            console.log("getMany URL:", url); // Debug URL

            // Fetch data
            const response = await fetchUtils.fetchJson(url);

            // Parse JSON response
            const data = await response.json();

            return {
                data: data.map((item: any) => ({
                    id: item._id, // Convert _id to id
                    ...item,      // Copy other properties
                })),
            };
        } catch (error) {
            console.error("Error in getMany:", error); // Log error for debugging
            throw error; // Throw error for React-Admin to handle
        }
    }

    ,
    getManyReference: async (resource: string, params: any) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const url = `${API_URL}/${resource}?_page=${page}&_limit=${perPage}&_sort=${field}&_order=${order}&${params.target}=${params.id}`;
        const response = await fetchUtils.fetchJson(url);
        const data = await response.json;

        return {
            data: data,
            total: parseInt(response.headers.get("x-total-count") || `${data.length}`, 10),
        };
    },
    create: async (resource, params) => {
        const url = `${API_URL}/${resource}/create-movie`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params.data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Server error: ${error.message}`);
        }

        const data = await response.json();
        return { data };
    }

    ,
    update: async (resource: string, params: any) => {
        const url = `${API_URL}/${resource}/update-movie/${params.id}`;
        const response = await fetchUtils.fetchJson(url, {
            method: "PUT",
            body: JSON.stringify(params.data),
        });

        // The backend already returns { data: { id: "...", ... } }, so return it directly
        return response.json;
    },
    updateMany: async (resource: string, params: any) => {
        const url = `${API_URL}/${resource}`;
        const responses = await Promise.all(
            params.ids.map((id: any) =>
                fetchUtils.fetchJson(`${url}/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(params.data),
                })
            )
        );
        return { data: responses.map((res) => res.json) };
    },
    delete: async (resource: string, params: any) => {
        const url = `${API_URL}/${resource}/delete-movie/${params.id}`;
        const response = await fetchUtils.fetchJson(url, {
            method: "DELETE",
        });
        return { data: response.json };
    },
    deleteMany: async (resource: string, params: any) => {
        const url = `${API_URL}/${resource}`;
        const responses = await Promise.all(
            params.ids.map((id: any) =>
                fetchUtils.fetchJson(`${url}/${id}`, {
                    method: "DELETE",
                })
            )
        );
        return { data: responses.map((res) => res.json) };
    },
};