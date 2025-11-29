import axios from "axios";

const API = 'https://preguntados-api.vercel.app'

const apiClient = axios.create({
    baseURL: API
});

/* GET calls to the API */
export const getDifficulties = () => {
    return apiClient.get('/api/difficulty');
}

export const getQuestions = (difficulty = 'easy') => {
    return apiClient.get('/api/questions', {
        params: { difficulty }
    });
}

/* POST calls to the API */
export const postAnswer = (questionId, option) => {
    return apiClient.post('/api/answer', {
        questionId,
        option
    });
}