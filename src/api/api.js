import * as axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8081/api/1.0/',
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    follow(userId) {
        return instance.post(`users/follow/${userId}`);
    },
    unfollow(userId) {
        return instance.delete(`users/follow/${userId}`)
    },
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`users/profile/${userId}`);
    },
    getUserStatus(userId) {
        return instance.get(`users/profile/status/${userId}`);
    },
    updateUserStatus(userId, status) {
        return instance.put(`users/profile/status/${userId}`, {status});
    },
    savePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put(`users/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfileInfo(profile) {
        console.log(profile)
        // return instance.put(`profile`, profile);
    },
}

export const authAPI = {
    authMe() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/logout`)
    }
}
