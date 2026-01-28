import { create } from "zustand";
import { axiosInstance } from "./axios.jsx";



export const useAuthStore = create((set) => ({


    authUser:null,
    isCheckAuth:true,
    userData:null,

    signup: async (data) => {
 

       
        try {
            console.log(data);
            const res = await axiosInstance.post("/auth/signup", data)

            set({ authUser: res.data.authUser });
            set({ userData: res.data });
            alert("Account Created Successfully")

        } catch (error) {
            console.log(error.response.data.message);
          

        } 
    },


    checkAuth: async () => {

        try {
            const res = await axiosInstance.get('/auth/check')

       
            set({ authUser: res.data.authUser });
            set({ userData: res.data });
         

        } catch (error) {
            set({ setUser: null })

            console.log("Error in checkAuth", error);

        } finally {
            set({ isCheckAuth: false })
        }
    },

    logout: async () => {
        try {
            console.log("logiing out");

            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            set({ userType: null });

            alert("Logged out Successfully")
        } catch (error) {
        
        }
    },

    login: async (data) => {

      
        try {
            console.log(data);
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data.authUser });
            set({ userData: res.data });

            alert("Account Logged In Successfully")

        } catch (error) {
            alert(error.response.data.message)

        } 
    },


}))


export const useEventStore = create((set, get) => ({
 
 
   
  

  
    fetchCategories: async () => {
      try {
        set({ loading: true, error: null });
  
        const res = await axiosInstance.get("/categories");
        const data = res.data;
        console.log(data);
        console.log("hello");
        
        
        return data;
      
      }  catch (error) {
        alert(error.response.data.message)

    } 
    },
   
  

  
    addCategory: async (category_name) => {
      try {
        const res = await axiosInstance.post("/categories", {
          category_name
        });
   
      }  catch (error) {
        alert(error.response.data.message)

    } 
    },
  
    updateCategory: async (category_id, category_name) => {
      try {
        const res = await axiosInstance.put(`/categories/${category_id}`, {
          category_name
        });
  
       
      } catch (error) {
        alert(error.response.data.message)

    } 
    },
  
    deleteCategory: async (category_id) => {
      try {
        await axiosInstance.delete(`/categories/${category_id}`);
   
  
        
      }  catch (error) {
        alert(error.response.data.message)

    } 
    },
  

  
    addEvent: async (category_id, data) => {
      try {
        const res = await axiosInstance.post(
          `/categories/${category_id}/events`,
          data
        );
  
        
      }  catch (error) {
        alert(error.response.data.message)

    } 
    },
  
    updateEvent: async (category_id, event_id, data) => {
      try {
        const res = await axiosInstance.put(
          `/categories/${category_id}/events/${event_id}`,
          data
        );
  
        
      }  catch (error) {
        alert(error.response.data.message)

    } 
    },
  
    deleteEvent: async (category_id, event_id) => {
      try {
        const res = await axiosInstance.delete(
          `/categories/${category_id}/events/${event_id}`
        );
  
        
      }  catch (error) {
        alert(error.response.data.message)

    } 
    }
  }));

