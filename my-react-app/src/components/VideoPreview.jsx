import { useState } from 'react';
import { Video, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';

export function VideoPreview({ state, bookData, onReset }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoOptions = [
    { id: 1, style: '클래식 스타일', thumbnail: 'bg-gradient-to-br from-purple-400 to-pink-400' },
    { id: 2, style: '모던 스타일', thumbnail: 'bg-gradient-to-br from-blue-400 to-cyan-400' },
    { id: 3, style: '미니멀 스타일', thumbnail: 'bg-gradient-to-br from-green-400 to-teal-400' },
  ];

  if (state === 'idle') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-gray-900">영상 미리보기</h3>
          <p className="text-gray-500">
            책 정보를 입력하고 영상 제작 버튼을 클릭하면<br />
            이곳에 영상이 생성됩니다
          </p>
        </div>
      </div>
    );
  }

  if (state === 'processing') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h3 className="mb-2 text-gray-900">영상 제작 중</h3>
          <p className="text-gray-500 mb-4">
            "{bookData?.title}"의 영상을 제작하고 있습니다...<br />
            잠시만 기다려주세요
          </p>
          <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900">영상 스타일 선택</h3>
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>다시 제작</span>
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {videoOptions.map((video) => (
          <div
            key={video.id}
            onClick={() => setSelectedVideo(video.id)}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedVideo === video.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-32 h-20 ${video.thumbnail} rounded-lg flex items-center justify-center`}>
                <Video className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">{video.style}</h4>
                <p className="text-gray-500">
                  "{bookData?.title}" - {bookData?.author}
                </p>
              </div>

              {selectedVideo === video.id && (
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={selectedVideo === null}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        선택한 영상 다운로드
      </button>
    </div>
  );
}
