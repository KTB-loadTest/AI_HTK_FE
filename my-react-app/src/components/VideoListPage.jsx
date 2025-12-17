import { ArrowLeft, Play, Clock, Eye, Calendar } from 'lucide-react';

export function VideoListPage({ projectId, onVideoClick, onBack }) {
  // 프로젝트별 영상 데이터
  const projectVideos = {
    1: {
      title: '해리포터와 마법사의 돌',
      author: 'J.K. 롤링',
      videos: [
        { id: 101, title: '티저 영상 - 30초', duration: '0:30', views: '8,234', date: '2024.12.15', thumbnail: 'from-purple-400 to-pink-400' },
        { id: 102, title: '메인 트레일러 - 2분', duration: '2:00', views: '12,456', date: '2024.12.14', thumbnail: 'from-purple-500 to-pink-500' },
        { id: 103, title: '인트로 영상 - 1분', duration: '1:00', views: '6,789', date: '2024.12.13', thumbnail: 'from-purple-300 to-pink-300' },
        { id: 104, title: '캐릭터 소개 - 3분', duration: '3:00', views: '9,567', date: '2024.12.12', thumbnail: 'from-indigo-400 to-purple-400' },
      ]
    },
    2: {
      title: '1984',
      author: '조지 오웰',
      videos: [
        { id: 201, title: '티저 영상 - 30초', duration: '0:30', views: '6,543', date: '2024.12.14', thumbnail: 'from-blue-400 to-cyan-400' },
        { id: 202, title: '메인 트레일러 - 2분', duration: '2:00', views: '10,234', date: '2024.12.13', thumbnail: 'from-blue-500 to-cyan-500' },
        { id: 203, title: '스토리 소개 - 1분 30초', duration: '1:30', views: '7,890', date: '2024.12.12', thumbnail: 'from-blue-300 to-cyan-300' },
      ]
    },
    3: {
      title: '어린왕자',
      author: '생텍쥐페리',
      videos: [
        { id: 301, title: '티저 영상 - 30초', duration: '0:30', views: '5,432', date: '2024.12.13', thumbnail: 'from-green-400 to-teal-400' },
        { id: 302, title: '메인 트레일러 - 2분', duration: '2:00', views: '8,765', date: '2024.12.12', thumbnail: 'from-green-500 to-teal-500' },
        { id: 303, title: '감성 영상 - 1분', duration: '1:00', views: '6,234', date: '2024.12.11', thumbnail: 'from-green-300 to-teal-300' },
        { id: 304, title: '명장면 모음 - 2분 30초', duration: '2:30', views: '9,123', date: '2024.12.10', thumbnail: 'from-emerald-400 to-green-400' },
      ]
    },
    4: {
      title: '노인과 바다',
      author: '어니스트 헤밍웨이',
      videos: [
        { id: 401, title: '티저 영상 - 30초', duration: '0:30', views: '7,234', date: '2024.12.12', thumbnail: 'from-orange-400 to-red-400' },
        { id: 402, title: '메인 트레일러 - 2분', duration: '2:00', views: '11,567', date: '2024.12.11', thumbnail: 'from-orange-500 to-red-500' },
        { id: 403, title: '하이라이트 - 1분 30초', duration: '1:30', views: '8,432', date: '2024.12.10', thumbnail: 'from-orange-300 to-red-300' },
      ]
    },
  };

  const project = projectVideos[projectId] || projectVideos[1];

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>프로젝트 목록으로</span>
        </button>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="mb-1">{project.title}</h1>
              <p className="text-gray-500">{project.author}</p>
            </div>
          </div>
        </div>

        <h2 className="text-gray-900 mb-2">제작된 영상 ({project.videos.length}개)</h2>
        <p className="text-gray-500">영상을 선택하여 상세 통계를 확인하세요</p>
      </div>

      {/* 영상 그리드 */}
      <div className="grid grid-cols-3 gap-6">
        {project.videos.map((video) => (
          <div
            key={video.id}
            onClick={() => onVideoClick(video.id)}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
          >
            {/* 썸네일 */}
            <div className={`aspect-video bg-gradient-to-br ${video.thumbnail} flex items-center justify-center relative`}>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
            </div>

            {/* 정보 */}
            <div className="p-4">
              <h3 className="text-gray-900 mb-3">{video.title}</h3>
              
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{video.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-blue-600">{video.views}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 새 영상 제작 버튼 */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-2">새로운 영상 제작</h3>
            <p className="text-blue-100">
              "{project.title}"의 새로운 스타일 영상을 제작해보세요
            </p>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            영상 제작하기
          </button>
        </div>
      </div>
    </div>
  );
}
