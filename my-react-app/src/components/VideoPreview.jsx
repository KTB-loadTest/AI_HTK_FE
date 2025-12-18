import { useState } from 'react';
import { Video, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';
import YouTube from 'react-youtube';

export function VideoPreview({ state, bookData, onReset }) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // bookData에서 videos 배열 가져오기
  const videos = bookData?.videos || [];

  // YouTube player options
  const opts = {
    height: '500',
    width: '280',
    playerVars: {
      autoplay: 0,
    },
  };

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

  if (videos.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-gray-900">영상이 없습니다</h3>
          <p className="text-gray-500">영상 제작이 완료되지 않았습니다.</p>
        </div>
      </div>
    );
  }

  const selectedVideo = videos[selectedVideoIndex];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900">영상 미리보기</h3>
        <button
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>다시 제작</span>
        </button>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* 왼쪽: 세로형 숏츠 미리보기 (YouTube embed) */}
        <div className="flex-shrink-0">
          <div className="relative w-[280px] h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black">
            <YouTube
              videoId={selectedVideo.id}
              opts={opts}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* 오른쪽: 영상 목록 */}
        <div className="flex-1 flex flex-col min-h-0">
          <h4 className="text-gray-700 mb-4">영상 목록 ({videos.length}개)</h4>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {videos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideoIndex(index)}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedVideoIndex === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-2">{video.title}</h4>
                    <p className="text-gray-500 text-sm mb-2">
                      "{bookData?.title}" - {bookData?.author}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        세로형 (9:16)
                      </span>
                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        YouTube에서 보기
                      </a>
                    </div>
                  </div>

                  {selectedVideoIndex === index && (
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 ml-4" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <a
            href={selectedVideo.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0 text-center"
          >
            YouTube에서 보기
          </a>
        </div>
      </div>
    </div>
  );
}