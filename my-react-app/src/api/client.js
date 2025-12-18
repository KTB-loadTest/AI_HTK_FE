import axios from 'axios';

// baseURL 정규화: 프로토콜이 없거나 슬래시가 중복될 때를 대비
const rawBase = import.meta.env.VITE_API_URL?.trim();
const baseURL = rawBase.replace(/\/$/, '');
console.log('Normalized VITE_API_URL:', baseURL);

// 1. 공통 인스턴스 생성
const client = axios.create({
    baseURL,
    timeout: 30000, // AI 영상 생성은 시간이 걸릴 수 있으므로 30초로 넉넉히 설정
});

// 2. 응답 데이터 정제 (컴포넌트에서 .data.data 로 접근하지 않게 함)
client.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default client;
