import axios from 'axios';
const API = axios.create({ baseURL: 'https://menu-management-g3wr.onrender.com' });

API.interceptors.request.use(req => {
    if (localStorage.getItem('Profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
    }
    return req;
});

export const getCategories =()=>API.get("/categories/get")
export const getSubcategories=(id)=>API.get(`/category/${id}/subcategories`)
export const getallItem=(id)=>API.get(`/subcategory/${id}/items`)
export const deleteCategory=(id)=>API.delete(`/categories/${id}/delete`)
export const updateCategory=(id, update)=>API.put(`/categories/${id}/edit`, update)
export const updatesubCategory=(id, update)=>API.put(`/category/subcategory/${id}/edit`, update)
export const updateItem=(id, update)=>API.put(`/subcategory/item/${id}`, update)
export const search=(name)=>API.get(`/subcategory/item/${name}`)