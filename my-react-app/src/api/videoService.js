import client from './client';

export const videoService = {
    /**
     * 영상 생성 요청
     * @param {Object} data - { userId: number, title: string, authorName: string }
     */
    createVideo: (data) => client.post('/videos', data),

    /**
     * 최근 생성된 책 목록 가져오기
     * @param {number} userId - 사용자 ID
     */
    getRecentBooks: (userId) => client.get(`/books/recent?userId=${userId}`),

    /**
     * 모든 책 목록 가져오기
     * @param {number} userId - 사용자 ID
     */
    getAllBooks: (userId) => client.get(`/books?userId=${userId}`),

    /**
     * 특정 책의 영상 목록 가져오기
     * @param {number} bookId - 책 ID
     */
    getBookVideos: (bookId) => client.get(`/books/${bookId}/youtube-urls`),

    /**
     * 소설 원고 제출 및 영상 생성 요청
     * @param {Object} data - { title: string, content: string }
     */
    generateTrailer: (data) => client.post('/videos/generate', data),

    /**
     * 생성 중인 영상 상태 확인 (Polling용)
     * @param {string} videoId
     */
    getVideoStatus: (videoId) => client.get(`/videos/status/${videoId}`),

    /**
     * 완성된 예고편 목록 가져오기
     */
    getVideoList: () => client.get('/videos'),

    /**
     * 특정 영상 삭제
     */
    deleteVideo: (videoId) => client.delete(`/videos/${videoId}`),
};