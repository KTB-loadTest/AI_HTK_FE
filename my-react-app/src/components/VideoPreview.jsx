import { useState } from 'react';
import { Video, Loader2, CheckCircle2, RotateCcw, Play, Pause } from 'lucide-react';

export function VideoPreview({ state, bookData, onReset }) {
  const [selectedVideo, setSelectedVideo] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoOptions = [
    { id: 1, style: '클래식 스타일', thumbnail: 'bg-gradient-to-br from-purple-400 to-pink-400', duration: '0:45' },
    { id: 2, style: '모던 스타일', thumbnail: 'bg-gradient-to-br from-blue-400 to-cyan-400', duration: '0:52' },
    { id: 3, style: '미니멀 스타일', thumbnail: 'bg-gradient-to-br from-green-400 to-teal-400', duration: '0:48' },
  ];

  if (state === 'idle') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center min-h-[600px]">
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
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center min-h-[600px]">
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

  const selectedVideoData = videoOptions.find(v => v.id === selectedVideo);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col">
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

      <div className="flex gap-6 flex-1 min-h-0">
        {/* 왼쪽: 세로형 숏츠 미리보기 */}
        <div className="flex-shrink-0">
          <div
            className={`relative w-[280px] h-[500px] ${selectedVideoData.thumbnail} rounded-2xl overflow-hidden shadow-lg`}
          >
            {/* 영상 미리보기 컨텐츠 */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-white">
              <div className="text-center mt-12">
                <Video className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <p className="text-sm opacity-90">{selectedVideoData.style}</p>
              </div>

              <div className="text-center mb-12">
                <h4 className="mb-2">"{bookData?.title}"</h4>
                <p className="text-sm opacity-90">{bookData?.author}</p>
              </div>
            </div>

            {/* 재생/일시정지 버튼 */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
            >
              {isPlaying ? (
                <Pause className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              ) : (
                <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
              )}
            </button>

            {/* 재생 시간 표시 */}
            <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 rounded text-sm">
              {selectedVideoData.duration}
            </div>
          </div>
        </div>

        {/* 오른쪽: 영상 목록 */}
        <div className="flex-1 flex flex-col min-h-0">
          <h4 className="text-gray-700 mb-4">스타일을 선택하세요</h4>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {videoOptions.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video.id)}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedVideo === video.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-2">{video.style}</h4>
                    <p className="text-gray-500 text-sm mb-2">
                      "{bookData?.title}" - {bookData?.author}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        세로형 (9:16)
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                  </div>

                  {selectedVideo === video.id && (
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 ml-4" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            disabled={selectedVideo === null}
            className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            선택한 영상 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}