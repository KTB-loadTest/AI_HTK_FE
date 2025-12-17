import { Video, Clock, CheckCircle2, TrendingUp, Plus, Play } from 'lucide-react';

export function Dashboard({ onNavigate, onProjectClick }) {
  const stats = [
    { icon: Video, label: '총 영상', value: '24', color: 'bg-blue-100 text-blue-600' },
    { icon: Clock, label: '제작 중', value: '3', color: 'bg-yellow-100 text-yellow-600' },
    { icon: CheckCircle2, label: '완료', value: '21', color: 'bg-green-100 text-green-600' },
    { icon: TrendingUp, label: '이번 달', value: '+12', color: 'bg-purple-100 text-purple-600' },
  ];

  const recentProjects = [
    { id: 1, title: '해리포터와 마법사의 돌', author: 'J.K. 롤링', status: 'complete', date: '2024.12.15', videoCount: 4 },
    { id: 2, title: '1984', author: '조지 오웰', status: 'complete', date: '2024.12.14', videoCount: 3 },
    { id: 3, title: '어린왕자', author: '생텍쥐페리', status: 'processing', date: '2024.12.13', videoCount: 4 },
    { id: 4, title: '노인과 바다', author: '어니스트 헤밍웨이', status: 'complete', date: '2024.12.12', videoCount: 3 },
  ];

  const getStatusBadge = (status) => {
    if (status === 'complete') {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          완료
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
        제 중
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">홈</h1>
          <p className="text-gray-500">영상 제작 현황을 한눈에 확인하세요</p>
        </div>
        <button
          onClick={() => onNavigate('video')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>새 영상 제작</span>
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-gray-500 mb-1">{stat.label}</p>
              <p className="text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* 최근 프로젝트 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">최근 프로젝트</h2>
          <button
            onClick={() => onNavigate('projects')}
            className="text-blue-600 hover:text-blue-700"
          >
            전체 보기
          </button>
        </div>

        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onProjectClick(project.id)}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer hover:bg-gray-50"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <Play className="w-8 h-8 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 mb-1">{project.title}</h3>
                <p className="text-gray-500">{project.author} · 영상 {project.videoCount}개</p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="mb-2">
                  {getStatusBadge(project.status)}
                </div>
                <p className="text-gray-500 text-sm">{project.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 빠른 시작 가이드 */}
      <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
        <h3 className="mb-2">빠른 시작 가이드</h3>
        <p className="mb-4 text-blue-100">
          책 정보만 입력하면 자동으로 멋진 홍보 영상이 제작됩니다.
        </p>
        <button
          onClick={() => onNavigate('video')}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          지금 시작하기
        </button>
      </div>
    </div>
  );
}