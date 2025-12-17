import { useState } from 'react';
import { Search, Filter, Book, Calendar, User, Eye } from 'lucide-react';

export function ProjectList({ onProjectClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const allProjects = [
    { id: 1, title: '해리포터와 마법사의 돌', author: 'J.K. 롤링', status: 'complete', date: '2024.12.15', views: '15,234', thumbnail: 'from-purple-400 to-pink-400' },
    { id: 2, title: '1984', author: '조지 오웰', status: 'complete', date: '2024.12.14', views: '12,567', thumbnail: 'from-blue-400 to-cyan-400' },
    { id: 3, title: '어린왕자', author: '생텍쥐페리', status: 'processing', date: '2024.12.13', views: '8,432', thumbnail: 'from-green-400 to-teal-400' },
    { id: 4, title: '노인과 바다', author: '어니스트 헤밍웨이', status: 'complete', date: '2024.12.12', views: '10,876', thumbnail: 'from-orange-400 to-red-400' },
    { id: 5, title: '호밀밭의 파수꾼', author: 'J.D. 샐린저', status: 'complete', date: '2024.12.11', views: '9,234', thumbnail: 'from-indigo-400 to-purple-400' },
    { id: 6, title: '위대한 개츠비', author: 'F. 스콧 피츠제럴드', status: 'complete', date: '2024.12.10', views: '11,456', thumbnail: 'from-yellow-400 to-orange-400' },
    { id: 7, title: '앵무새 죽이기', author: '하퍼 리', status: 'processing', date: '2024.12.09', views: '7,890', thumbnail: 'from-pink-400 to-rose-400' },
    { id: 8, title: '동물농장', author: '조지 오웰', status: 'complete', date: '2024.12.08', views: '10,234', thumbnail: 'from-cyan-400 to-blue-400' },
    { id: 9, title: '파리대왕', author: '윌리엄 골딩', status: 'complete', date: '2024.12.07', views: '8,765', thumbnail: 'from-emerald-400 to-green-400' },
    { id: 10, title: '오만과 편견', author: '제인 오스틴', status: 'complete', date: '2024.12.06', views: '12,890', thumbnail: 'from-violet-400 to-purple-400' },
    { id: 11, title: '데미안', author: '헤르만 헤세', status: 'processing', date: '2024.12.05', views: '6,543', thumbnail: 'from-amber-400 to-orange-400' },
    { id: 12, title: '변신', author: '프란츠 카프카', status: 'complete', date: '2024.12.04', views: '9,876', thumbnail: 'from-teal-400 to-cyan-400' },
  ];

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
        제작 중
      </span>
    );
  };

  const statusCounts = {
    all: allProjects.length,
    complete: allProjects.filter(p => p.status === 'complete').length,
    processing: allProjects.filter(p => p.status === 'processing').length,
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="mb-2">전체 프로젝트</h1>
        <p className="text-gray-500">모든 영상 프로젝트를 관리하세요</p>
      </div>

      {/* 필터 및 검색 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            전체 ({statusCounts.all})
          </button>
          <button
            onClick={() => setFilterStatus('complete')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'complete'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            완료 ({statusCounts.complete})
          </button>
          <button
            onClick={() => setFilterStatus('processing')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'processing'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            제작 중 ({statusCounts.processing})
          </button>
        </div>

        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="프로젝트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 프로젝트 그리드 */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onProjectClick(project.id)}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
            >
              {/* 책 표지 */}
              <div className={`aspect-[3/4] bg-gradient-to-br ${project.thumbnail} flex flex-col items-center justify-center p-6 relative`}>
                <div className="absolute top-3 right-3">
                  {getStatusBadge(project.status)}
                </div>
                
                <div className="text-center text-white mb-auto mt-8">
                  <Book className="w-12 h-12 mx-auto mb-4 opacity-80" />
                </div>
                
                <div className="text-center text-white mt-auto">
                  <h3 className="mb-2 line-clamp-3 px-2">{project.title}</h3>
                  <p className="text-sm opacity-90">{project.author}</p>
                </div>
              </div>

              {/* 정보 */}
              <div className="p-4">
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-blue-600">{project.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}