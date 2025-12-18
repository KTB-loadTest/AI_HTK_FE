import { useState, useEffect } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  ComposedChart,
} from 'recharts';
import { videoService } from '../api/videoService';

export function VideoListPage({ projectId, onVideoClick, onBack }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const toDateStr = (date) => date.toISOString().split('T')[0];

  const buildAnalytics = (videos, analyticsResponse) => {
    const rows = analyticsResponse?.rows || [];
    const trafficSources = analyticsResponse?.trafficSources || [];
    const timeline =
      Array.isArray(analyticsResponse?.timeline) && analyticsResponse.timeline.length > 0
        ? analyticsResponse.timeline
        : [];

    // perVideo: 우선 API rows 사용, 없으면 영상 목록 기반 기본 값
    const perVideo = rows.length
      ? rows.map((row, index) => ({
          videoId: row.videoId || videos[index]?.videoId || `video-${index + 1}`,
          views: row.views ?? 0,
          watchTimeMinutes: row.estimatedMinutesWatched ?? 0,
          avgViewDurationSeconds: row.averageViewDurationSeconds ?? 0,
          ctr: row.ctr ?? null,
          impressions: row.impressions ?? null,
        }))
      : (videos || []).map((video, index) => ({
          videoId: video.videoId || `video-${index + 1}`,
          views: video.views ?? 0,
          watchTimeMinutes: video.watchTimeMinutes ?? 0,
          avgViewDurationSeconds: video.avgViewDurationSeconds ?? 0,
          ctr: video.ctr ?? null,
          impressions: video.impressions ?? null,
        }));

    const totalViews = perVideo.reduce((sum, v) => sum + (v.views || 0), 0);
    const totalWatch = perVideo.reduce((sum, v) => sum + (v.watchTimeMinutes || 0), 0);
    const totalImpressions = perVideo.reduce((sum, v) => sum + (v.impressions || 0), 0);
    const weightedAvgViewDuration =
      totalViews > 0
        ? Math.round(
            perVideo.reduce(
              (sum, v) => sum + (v.avgViewDurationSeconds || 0) * (v.views || 0),
              0
            ) / totalViews
          )
        : 0;
    const avgCtr =
      perVideo.length > 0
        ? (
            perVideo.reduce((sum, v) => sum + (v.ctr || 0), 0) / perVideo.length
          ).toFixed(1)
        : 0;

    const summary = {
      views: totalViews,
      watchTimeMinutes: totalWatch,
      avgViewDurationSeconds: weightedAvgViewDuration,
      impressions: totalImpressions,
      ctr: Number(avgCtr),
    };

    // 타임라인 데이터가 없으면 perVideo를 대체 축으로 사용
    const timelineData =
      timeline.length > 0
        ? timeline
        : perVideo.map((v, idx) => ({
            time: v.videoId || `video-${idx + 1}`,
            views: v.views,
            watchTimeMinutes: v.watchTimeMinutes,
            impressions: v.impressions,
            ctr: v.ctr,
          }));

    return {
      summary,
      timeline: timelineData,
      trafficSources,
      perVideo,
    };
  };

  useEffect(() => {
    let isMounted = true;

    const fetchBookVideos = async () => {
      try {
        setLoading(true);
        setAnalyticsLoading(true);
        const response = await videoService.getBookVideos(projectId);
        if (!isMounted) return;

        setProject(response);
        const videos = response?.videos || [];

        // 실제 Analytics 호출
        let analyticsResponse = null;
        if (videos.length > 0) {
          const endDate = new Date();
          const startDate = new Date();
          startDate.setDate(endDate.getDate() - 7);

          analyticsResponse = await videoService.getYoutubeAnalytics({
            userId: response?.userId || 3,
            videoIds: videos.map((v) => v.videoId).join(','),
            startDate: toDateStr(startDate),
            endDate: toDateStr(endDate),
          });
        }

        setAnalyticsData(buildAnalytics(videos, analyticsResponse));
      } catch (error) {
        console.error('책 영상 목록 조회 실패:', error);
        if (!isMounted) return;
        setProject(null);
        setAnalyticsData(null);
      } finally {
        if (!isMounted) return;
        setLoading(false);
        setAnalyticsLoading(false);
      }
    };

    if (projectId) {
      fetchBookVideos();
    } else {
      setLoading(false);
      setAnalyticsData(null);
      setProject(null);
    }

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-900 shadow-sm">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-900 shadow-sm">
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
  const summaryCards = [
    {
      label: '조회수',
      value: analyticsData?.summary?.views
        ? analyticsData.summary.views.toLocaleString()
        : '-',
      delta: '+8.4% vs 지난주',
      color: 'text-blue-600',
      key: 'views',
    },
    {
      label: '시청시간 (분)',
      value: analyticsData?.summary?.watchTimeMinutes
        ? analyticsData.summary.watchTimeMinutes.toLocaleString()
        : '-',
      delta: '+6.1% vs 지난주',
      color: 'text-emerald-600',
      key: 'watchTimeMinutes',
    },
    {
      label: '평균 재생시간',
      value: analyticsData?.summary?.avgViewDurationSeconds
        ? `${analyticsData.summary.avgViewDurationSeconds}s`
        : '-',
      delta: '지속률 안정',
      color: 'text-amber-600',
      key: 'avgViewDurationSeconds',
    },
    {
      label: 'CTR',
      value: analyticsData?.summary?.ctr ? `${analyticsData.summary.ctr}%` : '-',
      delta: '상위 10% 구간',
      color: 'text-purple-600',
      key: 'ctr',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* 헤더 */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>프로젝트 목록으로</span>
        </button>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Play className="w-8 h-8 text-white drop-shadow" />
            </div>
            <div>
              <h1 className="mb-1 text-2xl font-semibold">{project.title}</h1>
              <p className="text-gray-500">{project.author}</p>
            </div>
          </div>
          <div className="mt-4 text-gray-500">
            제작된 영상 {videos.length}개 · 영상을 선택하여 상세 통계를 확인하세요
          </div>
        </div>
      </div>

      {/* YouTube Analytics 대시보드 */}
      {videos.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">YouTube Analytics</h2>
            <span className="text-gray-500 text-sm">목데이터 · 최근 4개 영상 기준</span>
          </div>

          {analyticsLoading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500">통계 데이터를 불러오는 중...</p>
            </div>
          ) : analyticsData ? (
            <div className="space-y-6">
              {/* 상단 요약 */}
              <div className="grid grid-cols-4 gap-4">
                {summaryCards.map((card) => (
                  <div
                    key={card.label}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">{card.label}</p>
                      <span className={`text-xs ${card.color}`}>{card.delta}</span>
                    </div>
                    <div className="text-2xl font-semibold mt-1">{card.value}</div>
                    <div className="mt-3 h-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.timeline}>
                          <defs>
                            <linearGradient id={`grad-${card.key}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} />
                              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey={card.key}
                            stroke="#0ea5e9"
                            fillOpacity={1}
                            fill={`url(#grad-${card.key})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>

              {/* 트래픽 및 참여도 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">조회수 & 시청시간 추이</h3>
                    <span className="text-xs text-gray-500">30분 단위</span>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.timeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" />
                      <YAxis yAxisId="left" stroke="#6b7280" />
                      <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
                        labelStyle={{ color: '#111827' }}
                      />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="views" stroke="#0ea5e9" name="조회수" />
                      <Line yAxisId="right" type="monotone" dataKey="watchTimeMinutes" stroke="#22c55e" name="시청시간(분)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">노출 대비 CTR</h3>
                    <span className="text-xs text-gray-500">노출 & 클릭률</span>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={analyticsData.timeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" />
                      <YAxis yAxisId="left" stroke="#6b7280" />
                      <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
                        labelStyle={{ color: '#111827' }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="impressions" name="노출수" fill="#f97316" />
                      <Line yAxisId="right" type="monotone" dataKey="ctr" stroke="#a855f7" name="CTR (%)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 영상별 상세 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">영상별 조회/시청시간</h3>
                    <span className="text-xs text-gray-500">목데이터</span>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.perVideo}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="videoId" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
                        labelStyle={{ color: '#111827' }}
                      />
                      <Legend />
                      <Bar dataKey="views" fill="#0ea5e9" name="조회수" />
                      <Bar dataKey="watchTimeMinutes" fill="#22c55e" name="시청시간(분)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">트래픽 소스</h3>
                    <span className="text-xs text-gray-500">검색/추천/홈/외부</span>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.trafficSources}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="source" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        formatter={(value) => `${value.toLocaleString()}회`}
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
                        labelStyle={{ color: '#111827' }}
                      />
                      <Legend />
                      <Bar dataKey="search" stackId="traffic" fill="#22d3ee" name="검색" />
                      <Bar dataKey="suggested" stackId="traffic" fill="#f97316" name="추천 영상" />
                      <Bar dataKey="browse" stackId="traffic" fill="#22c55e" name="홈/탐색" />
                      <Bar dataKey="external" stackId="traffic" fill="#a855f7" name="외부" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
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
