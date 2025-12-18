import client from './client';

export const videoService = {
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