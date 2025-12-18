import { useState, useEffect } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { videoService } from '../api/videoService';

export function VideoListPage({ projectId, onVideoClick, onBack }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    const fetchBookVideos = async () => {
      try {
        const response = await videoService.getBookVideos(projectId);
        console.log('책 영상 목록 응답:', response);

        setProject(response);

        // 영상 목록을 받아온 후 Analytics 데이터 가져오기
        if (response && response.videos && response.videos.length > 0) {
          fetchAnalytics(response.videos);
        }
      } catch (error) {
        console.error('책 영상 목록 조회 실패:', error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchBookVideos();
    }
  }, [projectId]);

  const fetchAnalytics = async (videos) => {
    try {
      setAnalyticsLoading(true);
      const videoIds = videos.map(v => v.videoId).join(',');

      const response = await videoService.getYoutubeAnalytics({
        userId: 3,
        videoIds: videoIds,
        startDate: '2025-12-11',
        endDate: '2025-12-18'
      });

      console.log('Analytics 응답:', response);
      setAnalyticsData(response);
    } catch (error) {
      console.error('Analytics 조회 실패:', error);
      setAnalyticsData(null);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500">프로젝트를 찾을 수 없습니다.</p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          프로젝트 목록으로 돌아가기
        </button>
      </div>
    );
  }

  const videos = project.videos || [];

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

        <h2 className="text-gray-900 mb-2">제작된 영상 ({videos.length}개)</h2>
        <p className="text-gray-500">영상을 선택하여 상세 통계를 확인하세요</p>
      </div>

      {/* YouTube Analytics 대시보드 */}
      {videos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-gray-900 mb-4">YouTube Analytics</h2>

          {analyticsLoading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500">통계 데이터를 불러오는 중...</p>
            </div>
          ) : analyticsData && analyticsData.rows ? (
            <div className="space-y-6">
              {/* 조회수 차트 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">조회수 (Views)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.rows}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="videoId" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#3b82f6" name="조회수" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 시청시간 차트 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">시청시간 (분)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.rows}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="videoId" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="estimatedMinutesWatched" fill="#10b981" name="시청시간 (분)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 평균 재생시간 차트 */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">평균 재생시간 (초)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.rows}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="videoId" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="averageViewDurationSeconds" fill="#f59e0b" name="평균 재생시간 (초)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500">통계 데이터를 불러올 수 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {/* 영상 그리드 */}
      {videos.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">아직 제작된 영상이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.videoId}
              onClick={() => onVideoClick(video.videoId)}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
            >
              {/* YouTube 썸네일 */}
              <div className="aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                  alt={video.videoId}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* 정보 */}
              <div className="p-4">
                <h3 className="text-gray-900 mb-2">{video.videoId}</h3>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  YouTube에서 보기
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

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
