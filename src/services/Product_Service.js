import { privateAxios } from "./Axios_Service"


export const createProductWithoutCategory=async (product)=>{
    return await privateAxios.post(`/products`,product).then(response=>response.data);
}

export const createProductWithCategory=async (product,categoryId)=>{
    return await privateAxios.post(`/categories/${categoryId}/products`,product).then(response=>response.data);
}

export const addProductImage=async (file,productId)=>{

    const formData=new FormData();
    formData.append("productImage",file)

    return await privateAxios.post(`/products/image/${productId}`,formData).then(response=>response.data);
}

export const getAllProducts=async (pageNumber=0,pageSize=10,sortBy='addedDate',sortDir="asc")=>{
    return await privateAxios.get(
        `/products?pageNumber=${pageNumber}&pageSize=${pageSize}& sortBy=${sortBy} & sortDir=${sortDir}`
        ).then(response=>response.data);
}


//Delete product
export const deleteProduct= async (productId)=>{
    return await privateAxios.delete(`/products/${productId}`).then(response=>response.data);
}


//Update product

export const updateProduct= async(product,productId)=>{
    return await privateAxios.put(`/products/${productId}`,product).then(response=>response.data);
}

//search products

export const searchProduct= async (query)=>{
    return await privateAxios.get(`/products/search/${query}`).then(response=>response.data);
}

//get all live products

export const getAllLiveProducts=async (pageNumber=0,pageSize=10,sortBy='addedDate',sortDir="asc")=>{
    return await privateAxios.get(
        `/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}& sortBy=${sortBy} & sortDir=${sortDir}`
        ).then(response=>response.data);
}

export const getSingleProduct=async (productId)=>{
    const data= await privateAxios.get(`/products/${productId}`);
    return data;
}

//Get product of categories

export const getProductOfCategories=async (categoryId,pageNumber=0,pageSize=10,sortBy='addedDate',sortDir="asc")=>{
    const data= await privateAxios.get(`/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}& sortBy=${sortBy} & sortDir=${sortDir}`);
    return data;
}