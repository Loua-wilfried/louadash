function api() {
    const getUsers = async () => {
      const res = await fetch("https://iwadeli.herokuapp.com/api/getUsers", {
            type: "GET",
        });
        return await res.json();
    };
  
    return {
      getUsers,
    };
  }
  
  export default api();
  