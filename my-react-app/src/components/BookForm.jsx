import { useState } from 'react';
import { Book, User, Sparkles } from 'lucide-react';
import { videoService } from '../api/videoService.js';

export function BookForm({ onSubmit, disabled }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      try {
        console.log('영상 생성 요청 중...');
        const response = await videoService.createVideo({
          userId: 3,
          title: title.trim(),
          authorName: author.trim()
        });
        console.log('영상 생성 요청 성공:', response);

        if (onSubmit) {
          onSubmit({ title, author, response });
        }
      } catch (error) {
        console.error('영상 생성 요청 실패:', error);
        alert('영상 생성 요청에 실패했습니다.');
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
              disabled={disabled}
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
              disabled={disabled}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={disabled || !title.trim() || !author.trim()}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>영상 제작</span>
        </button>
      </form>
    </div>
  );
}
