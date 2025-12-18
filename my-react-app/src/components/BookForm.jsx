import { useState, useRef } from 'react';
import { Book, User, Sparkles } from 'lucide-react';
import { videoService } from '../api/videoService.js';

const POLLING_INTERVAL = 3000; // 3초 간격

export function BookForm({ onSubmit, onProcessingStart, onError, disabled }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  const pollingRef = useRef(null);

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    setIsPolling(false);
  };

  const startPolling = (jobId, bookTitle, bookAuthor) => {
    setIsPolling(true);

    pollingRef.current = setInterval(async () => {
      try {
        console.log(`폴링 중... jobId: ${jobId}`);
        const jobData = await videoService.getJobStatus(jobId);
        console.log('Job 상태:', jobData);

        if (jobData.status === 'SUCCESS') {
          stopPolling();
          // 성공 시 videos 배열 형태로 변환하여 전달
          const videoResult = {
            id: jobData.videoId,
            youtubeUrl: jobData.youtubeUrl,
            title: jobData.title || bookTitle
          };

          if (onSubmit) {
            onSubmit({
              title: bookTitle,
              author: bookAuthor,
              response: [videoResult] // videos 배열 형태로 전달
            });
          }
          // 폼 초기화
          setTitle('');
          setAuthor('');
        } else if (jobData.status === 'FAILED') {
          stopPolling();
          const errorMessage = jobData.message || '영상 생성에 실패했습니다.';
          console.error('영상 생성 실패:', errorMessage);
          if (onError) {
            onError(errorMessage);
          } else {
            alert(errorMessage);
          }
        }
        // PENDING, PROCESSING이면 계속 폴링
      } catch (error) {
        console.error('폴링 중 오류:', error);
        stopPolling();
        if (onError) {
          onError('상태 확인 중 오류가 발생했습니다.');
        } else {
          alert('상태 확인 중 오류가 발생했습니다.');
        }
      }
    }, POLLING_INTERVAL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && author.trim() && !isPolling) {
      try {
        console.log('영상 생성 요청 중...');
        const bookTitle = title.trim();
        const bookAuthor = author.trim();

        // 1. POST /videos 호출 → jobId 반환
        const response = await videoService.createVideo({
          userId: 3,
          title: bookTitle,
          authorName: bookAuthor
        });
        console.log('영상 생성 작업 시작:', response);

        const { jobId } = response;

        if (!jobId) {
          throw new Error('jobId를 받지 못했습니다.');
        }

        // 2. processing 상태 알림
        if (onProcessingStart) {
          onProcessingStart({ title: bookTitle, author: bookAuthor, jobId });
        }

        // 3. 폴링 시작
        startPolling(jobId, bookTitle, bookAuthor);

      } catch (error) {
        console.error('영상 생성 요청 실패:', error);
        if (onError) {
          onError('영상 생성 요청에 실패했습니다.');
        } else {
          alert('영상 생성 요청에 실패했습니다.');
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="mb-6 text-gray-900">책 정보 입력</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2 text-gray-700">
            책 제목
          </label>
          <div className="relative">
            <Book className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="책 제목을 입력하세요"
              disabled={disabled || isPolling}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="author" className="block mb-2 text-gray-700">
            저자
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="저자명을 입력하세요"
              disabled={disabled || isPolling}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={disabled || isPolling || !title.trim() || !author.trim()}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>{isPolling ? '영상 제작 중...' : '영상 제작'}</span>
        </button>
      </form>
    </div>
  );
}
