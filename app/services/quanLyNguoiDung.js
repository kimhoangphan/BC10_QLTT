function QuanLyNguoiDungServices(){
    this.getListUsersApi = function(){
        return axios({
            url: `https://60c45c352df2cb00178ac570.mockapi.io/api/v1/QLNguoiDung/`,
            method: "GET"
        })
    }


    this.addUserApi = function(user) {
        return axios({
            url: "https://60c45c352df2cb00178ac570.mockapi.io/api/v1/QLNguoiDung",
            method: "POST",
            data: user
        }) 
    }

    this.delUserApi = function (id){
        return axios({
            url: `https://60c45c352df2cb00178ac570.mockapi.io/api/v1/QLNguoiDung/${id}`,
            method: "DELETE"
        })
    }


    // edit User....
    // 1. get User info by ID
    this.getUserByIDApi = function(id){
        return axios({
            url: `https://60c45c352df2cb00178ac570.mockapi.io/api/v1/QLNguoiDung/${id}`,
            method: "GET"
        })
    }

    this.updateUserByIDApi = function(user){
        return axios({
            url: `https://60c45c352df2cb00178ac570.mockapi.io/api/v1/QLNguoiDung/${user.id}`,
            method: "PUT",
            data: user
        })
    }
}