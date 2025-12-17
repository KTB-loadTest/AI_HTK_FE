import { ArrowLeft, Eye, ThumbsUp, Share2, Download, TrendingUp, Clock, Calendar, BarChart3 } from 'lucide-react';

export function ProjectDetail({ videoId, onBack }) {
  // 영상별 상세 데이터
  const videos = {
    101: { 
      id: 101,
      bookTitle: '해리포터와 마법사의 돌',
      author: 'J.K. 롤링',
      title: '티저 영상 - 30초',
      status: 'complete', 
      date: '2024.12.15',
      views: '8,234',
      likes: '1,234',
      shares: '234',
      downloads: '56',
      duration: '0:30',
      style: '클래식 스타일'
    },
    102: { 
      id: 102,
      bookTitle: '해리포터와 마법사의 돌',
      author: 'J.K. 롤링',
      title: '메인 트레일러 - 2분',
      status: 'complete', 
      date: '2024.12.14',
      views: '12,456',
      likes: '1,890',
      shares: '345',
      downloads: '78',
      duration: '2:00',
      style: '모던 스타일'
    },
    103: { 
      id: 103,
      bookTitle: '해리포터와 마법사의 돌',
      author: 'J.K. 롤링',
      title: '인트로 영상 - 1분',
      status: 'complete', 
      date: '2024.12.13',
      views: '6,789',
      likes: '890',
      shares: '123',
      downloads: '34',
      duration: '1:00',
      style: '미니멀 스타일'
    },
    201: { 
      id: 201,
      bookTitle: '1984',
      author: '조지 오웰',
      title: '티저 영상 - 30초',
      status: 'complete', 
      date: '2024.12.14',
      views: '6,543',
      likes: '987',
      shares: '178',
      downloads: '45',
      duration: '0:30',
      style: '클래식 스타일'
    },
    202: { 
      id: 202,
      bookTitle: '1984',
      author: '조지 오웰',
      title: '메인 트레일러 - 2분',
      status: 'complete', 
      date: '2024.12.13',
      views: '10,234',
      likes: '1,456',
      shares: '267',
      downloads: '67',
      duration: '2:00',
      style: '모던 스타일'
    },
  };

  const video = videos[videoId] || videos[101];

  const stats = [
    { icon: Eye, label: '조회수', value: video.views, color: 'bg-blue-100 text-blue-600', trend: '+12%' },
    { icon: ThumbsUp, label: '좋아요', value: video.likes, color: 'bg-green-100 text-green-600', trend: '+8%' },
    { icon: Share2, label: '공유', value: video.shares, color: 'bg-purple-100 text-purple-600', trend: '+15%' },
    { icon: Download, label: '다운로드', value: video.downloads, color: 'bg-orange-100 text-orange-600', trend: '+5%' },
  ];

  const dailyViews = [
    { date: '12.10', views: 234 },
    { date: '12.11', views: 567 },
    { date: '12.12', views: 789 },
    { date: '12.13', views: 1234 },
    { date: '12.14', views: 1567 },
    { date: '12.15', views: 1890 },
    { date: '12.16', views: 2145 },
  ];

  const maxViews = Math.max(...dailyViews.map(d => d.views));

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>영상 목록으로</span>
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 mb-1">{video.bookTitle} - {video.author}</p>
            <h1 className="mb-2">{video.title}</h1>
            <div className="flex items-center gap-4 text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {video.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {video.duration}
              </span>
            </div>
          </div>
          
          <span className={`px-4 py-2 rounded-full ${
            video.status === 'complete' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {video.status === 'complete' ? '완료' : '제작 중'}
          </span>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {stat.trend}
                </span>
              </div>
              <p className="text-gray-500 mb-1">{stat.label}</p>
              <p className="text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 영상 미리보기 */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">영상 미리보기</h2>
          <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
              <p>영상 재생</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
              다운로드
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              공유하기
            </button>
          </div>
        </div>

        {/* 프로젝트 정보 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">프로젝트 정보</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-1">영상 스타일</p>
              <p className="text-gray-900">{video.style}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">재생 시간</p>
              <p className="text-gray-900">{video.duration}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">제작일</p>
              <p className="text-gray-900">{video.date}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">상태</p>
              <p className="text-gray-900">{video.status === 'complete' ? '완료됨' : '제작 중'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 일별 조회수 그래프 */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-gray-700" />
          <h2 className="text-gray-900">일별 조회수</h2>
        </div>
        
        <div className="flex items-end gap-4 h-64">
          {dailyViews.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end items-center" style={{ height: '200px' }}>
                <div className="text-sm text-gray-600 mb-2">{day.views}</div>
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                  style={{ height: `${(day.views / maxViews) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm">{day.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}