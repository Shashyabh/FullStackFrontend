import { privateAxios } from "./Axios_Service"

export const addCategory=async (category)=>{
    return await privateAxios.post(`/categories`,category).then(response=>response.data);
}

export const getCategory=async(currentPage=0)=>{
    return await privateAxios.get(`/categories?pageNumber=${currentPage}&&pageSize=20`).then(response=>response.data);
}

export const deleteCategory=async(categoryId)=>{
    return await privateAxios.delete(`/categories/${categoryId}`).then(response=>response.data);
}

export const updateCategory=async(category)=>{
    //console.log("In services",category.categoryId)
    return await privateAxios.put(`/categories/${category.categoryId}`,category).then(response=>response.data);
}