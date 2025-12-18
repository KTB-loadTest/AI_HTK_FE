import { useState, useEffect } from 'react';
import { Search, Book } from 'lucide-react';
import { videoService } from '../api/videoService';

// 썸네일 색상 배열 (순환 사용)
const THUMBNAIL_COLORS = [
  'from-purple-400 to-pink-400',
  'from-blue-400 to-cyan-400',
  'from-green-400 to-teal-400',
  'from-orange-400 to-red-400',
  'from-indigo-400 to-purple-400',
  'from-yellow-400 to-orange-400',
  'from-pink-400 to-rose-400',
  'from-cyan-400 to-blue-400',
  'from-emerald-400 to-green-400',
  'from-violet-400 to-purple-400',
  'from-amber-400 to-orange-400',
  'from-teal-400 to-cyan-400',
];

export function ProjectList({ onProjectClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await videoService.getAllBooks(3);
        console.log('전체 책 목록 응답:', response);

        // 응답 데이터를 가공하여 썸네일 색상 추가
        const books = (response || []).map((book, index) => ({
          ...book,
          thumbnail: THUMBNAIL_COLORS[index % THUMBNAIL_COLORS.length],
        }));

        setAllProjects(books);
      } catch (error) {
        console.error('전체 책 목록 조회 실패:', error);
        setAllProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="mb-2">전체 프로젝트</h1>
        <p className="text-gray-500">모든 영상 프로젝트를 관리하세요</p>
      </div>

      {/* 검색 */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-600">
          총 {allProjects.length}개의 프로젝트
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
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">
            {allProjects.length === 0 ? '프로젝트가 없습니다.' : '검색 결과가 없습니다.'}
          </p>
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
                <div className="text-center text-white mb-auto mt-8">
                  <Book className="w-12 h-12 mx-auto mb-4 opacity-80" />
                </div>

                <div className="text-center text-white mt-auto">
                  <h3 className="mb-2 line-clamp-3 px-2">{project.title}</h3>
                  <p className="text-sm opacity-90">{project.author}</p>
                </div>
              </div>

              {/* 정보 */}
              <div className="p-4 text-center">
                <p className="text-gray-600 text-sm">ID: {project.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}