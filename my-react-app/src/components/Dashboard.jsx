import { useState, useEffect } from 'react';
import { Video, Clock, CheckCircle2, TrendingUp, Plus, Play } from 'lucide-react';
import { videoService } from '../api/videoService';

export function Dashboard({ onNavigate, onProjectClick }) {
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { icon: Video, label: '총 영상', value: '24', color: 'bg-blue-100 text-blue-600' },
    { icon: Clock, label: '제작 중', value: '3', color: 'bg-yellow-100 text-yellow-600' },
    { icon: CheckCircle2, label: '완료', value: '21', color: 'bg-green-100 text-green-600' },
    { icon: TrendingUp, label: '이번 달', value: '+12', color: 'bg-purple-100 text-purple-600' },
  ];

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await videoService.getRecentBooks(3);
        setRecentProjects(response.data);
      } catch (error) {
        console.error('최근 책 목록 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBooks();
  }, []);

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

        {loading ? (
          <div className="text-center py-8 text-gray-500">
            로딩 중...
          </div>
        ) : recentProjects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            최근 프로젝트가 없습니다.
          </div>
        ) : (
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
                  <p className="text-gray-500">{project.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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