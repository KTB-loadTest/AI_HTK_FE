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
     * YouTube Analytics 데이터 가져오기
     * @param {Object} params - { userId, videoIds, startDate, endDate }
     */
    getYoutubeAnalytics: (params) => {
        const { userId, videoIds, startDate, endDate } = params;
        return client.get(`/youtube/analytics?userId=${userId}&videoIds=${videoIds}&startDate=${startDate}&endDate=${endDate}`);
    },

    /**
     * 소설 원고 제출 및 영상 생성 요청
     * @param {Object} data - { title: string, content: string }
     */
    generateTrailer: (data) => client.post('/videos/generate', data),

    /**
     * Job 상태 조회 (Polling용)
     * @param {number} jobId
     * @returns {{ jobId, status, videoId, youtubeUrl, title, authorName, message }}
     */
    getJobStatus: (jobId) => client.get(`/videos/jobs/${jobId}`),

    /**
     * 완성된 예고편 목록 가져오기
     */
    getVideoList: () => client.get('/videos'),

    /**
     * 특정 영상 삭제
     */
    deleteVideo: (videoId) => client.delete(`/videos/${videoId}`),

    /**
     * YouTube 영상 통계 조회
     * @param {Object} params - { userId: number, videoId: string }
     * @returns {{ videoId, viewCount, likeCount, commentCount, durationSeconds, dailyMetrics, summaryAnalytics }}
     */
    getVideoStats: (params) => {
        const { userId, videoId } = params;
        return client.get(`/youtube/stats?userId=${userId}&videoId=${videoId}`);
    },
};