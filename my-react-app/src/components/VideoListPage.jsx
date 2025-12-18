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

export function VideoListPage({ projectId, onVideoClick, onBack }) {
  // YouTube Analytics 목업 데이터
  const mockProject = {
    title: 'AI Story Lab 채널',
    author: '유튜브 분석 샘플',
    videos: [
      {
        videoId: 'AI-DeepDive-01',
        youtubeUrl: 'https://youtu.be/mock-1',
        views: 12890,
        watchTimeMinutes: 3250,
        avgViewDurationSeconds: 152,
        ctr: 5.1,
      },
      {
        videoId: 'AI-DeepDive-02',
        youtubeUrl: 'https://youtu.be/mock-2',
        views: 11230,
        watchTimeMinutes: 3020,
        avgViewDurationSeconds: 162,
        ctr: 5.6,
      },
      {
        videoId: 'AI-Shorts-03',
        youtubeUrl: 'https://youtu.be/mock-3',
        views: 14210,
        watchTimeMinutes: 2880,
        avgViewDurationSeconds: 122,
        ctr: 6.3,
      },
      {
        videoId: 'AI-Interview-04',
        youtubeUrl: 'https://youtu.be/mock-4',
        views: 8920,
        watchTimeMinutes: 2410,
        avgViewDurationSeconds: 162,
        ctr: 4.7,
      },
    ],
  };

  const mockAnalytics = {
    summary: {
      views: 48230,
      watchTimeMinutes: 152430,
      avgViewDurationSeconds: 198,
      impressions: 621000,
      ctr: 5.2,
      likes: 3120,
      comments: 428,
      subscribersGained: 420,
      subscribersLost: 38,
    },
    timeline: [
      { time: '07:00', views: 2100, watchTimeMinutes: 6120, avgViewDurationSeconds: 175, impressions: 41000, ctr: 4.8 },
      { time: '07:30', views: 2680, watchTimeMinutes: 7420, avgViewDurationSeconds: 182, impressions: 45200, ctr: 5.0 },
      { time: '08:00', views: 3210, watchTimeMinutes: 8150, avgViewDurationSeconds: 195, impressions: 49800, ctr: 5.4 },
      { time: '08:30', views: 2980, watchTimeMinutes: 7820, avgViewDurationSeconds: 201, impressions: 51200, ctr: 5.6 },
      { time: '09:00', views: 3560, watchTimeMinutes: 9240, avgViewDurationSeconds: 208, impressions: 55600, ctr: 5.5 },
      { time: '09:30', views: 3380, watchTimeMinutes: 8810, avgViewDurationSeconds: 202, impressions: 54400, ctr: 5.3 },
      { time: '10:00', views: 3720, watchTimeMinutes: 9480, avgViewDurationSeconds: 199, impressions: 57200, ctr: 5.1 },
      { time: '10:30', views: 4010, watchTimeMinutes: 10120, avgViewDurationSeconds: 206, impressions: 59000, ctr: 5.4 },
      { time: '11:00', views: 3890, watchTimeMinutes: 9920, avgViewDurationSeconds: 204, impressions: 58400, ctr: 5.2 },
    ],
    trafficSources: [
      { source: '검색', search: 3200, suggested: 0, browse: 0, external: 0 },
      { source: '추천 영상', search: 0, suggested: 2800, browse: 0, external: 0 },
      { source: '홈/탐색', search: 0, suggested: 0, browse: 2400, external: 0 },
      { source: '외부', search: 0, suggested: 0, browse: 0, external: 1700 },
    ],
  };

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    // API 호출 없이 바로 목업 데이터를 세팅
    setAnalyticsLoading(true);
    setProject(mockProject);
    setAnalyticsData({
      ...mockAnalytics,
      perVideo: mockProject.videos.map((video) => ({
        videoId: video.videoId,
        views: video.views,
        watchTimeMinutes: video.watchTimeMinutes,
        avgViewDurationSeconds: video.avgViewDurationSeconds,
        ctr: video.ctr,
      })),
    });
    setLoading(false);
    setAnalyticsLoading(false);
  }, [projectId]);

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center text-slate-100">
        <p className="text-slate-400">로딩 중...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center text-slate-100">
        <p className="text-slate-400">프로젝트를 찾을 수 없습니다.</p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-400 hover:text-blue-300"
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
      color: 'text-sky-300',
      key: 'views',
    },
    {
      label: '시청시간 (분)',
      value: analyticsData?.summary?.watchTimeMinutes
        ? analyticsData.summary.watchTimeMinutes.toLocaleString()
        : '-',
      delta: '+6.1% vs 지난주',
      color: 'text-emerald-300',
      key: 'watchTimeMinutes',
    },
    {
      label: '평균 재생시간',
      value: analyticsData?.summary?.avgViewDurationSeconds
        ? `${analyticsData.summary.avgViewDurationSeconds}s`
        : '-',
      delta: '지속률 안정',
      color: 'text-amber-300',
      key: 'avgViewDurationSeconds',
    },
    {
      label: 'CTR',
      value: analyticsData?.summary?.ctr ? `${analyticsData.summary.ctr}%` : '-',
      delta: '상위 10% 구간',
      color: 'text-fuchsia-300',
      key: 'ctr',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 -m-6 p-6">
      {/* 헤더 */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-100 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>프로젝트 목록으로</span>
        </button>

        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-800 p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 bg-gradient-to-br from-sky-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="mb-1 text-2xl font-semibold">{project.title}</h1>
              <p className="text-slate-400">{project.author}</p>
            </div>
          </div>
          <div className="mt-4 text-slate-400">
            제작된 영상 {videos.length}개 · 영상을 선택하여 상세 통계를 확인하세요
          </div>
        </div>
      </div>

      {/* YouTube Analytics 대시보드 */}
      {videos.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-100">YouTube Analytics</h2>
            <span className="text-slate-500 text-sm">목데이터 · 최근 4개 영상 기준</span>
          </div>

          {analyticsLoading ? (
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center">
              <p className="text-slate-400">통계 데이터를 불러오는 중...</p>
            </div>
          ) : analyticsData ? (
            <div className="space-y-6">
              {/* 상단 요약 */}
              <div className="grid grid-cols-4 gap-4">
                {summaryCards.map((card) => (
                  <div
                    key={card.label}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-inner"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400">{card.label}</p>
                      <span className={`text-xs ${card.color}`}>{card.delta}</span>
                    </div>
                    <div className="text-2xl font-semibold mt-1">{card.value}</div>
                    <div className="mt-3 h-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.timeline}>
                          <defs>
                            <linearGradient id={`grad-${card.key}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey={card.key}
                            stroke="#38bdf8"
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
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-100">조회수 & 시청시간 추이</h3>
                    <span className="text-xs text-slate-500">30분 단위</span>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.timeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="time" stroke="#94a3b8" />
                      <YAxis yAxisId="left" stroke="#94a3b8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1f2937' }}
                        labelStyle={{ color: '#e2e8f0' }}
                      />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="views" stroke="#38bdf8" name="조회수" />
                      <Line yAxisId="right" type="monotone" dataKey="watchTimeMinutes" stroke="#22c55e" name="시청시간(분)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-100">노출 대비 CTR</h3>
                    <span className="text-xs text-slate-500">노출 & 클릭률</span>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={analyticsData.timeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="time" stroke="#94a3b8" />
                      <YAxis yAxisId="left" stroke="#94a3b8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1f2937' }}
                        labelStyle={{ color: '#e2e8f0' }}
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
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-100">영상별 조회/시청시간</h3>
                    <span className="text-xs text-slate-500">목데이터</span>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.perVideo}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="videoId" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1f2937' }}
                        labelStyle={{ color: '#e2e8f0' }}
                      />
                      <Legend />
                      <Bar dataKey="views" fill="#38bdf8" name="조회수" />
                      <Bar dataKey="watchTimeMinutes" fill="#22c55e" name="시청시간(분)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-100">트래픽 소스</h3>
                    <span className="text-xs text-slate-500">검색/추천/홈/외부</span>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.trafficSources}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                      <XAxis dataKey="source" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        formatter={(value) => `${value.toLocaleString()}회`}
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1f2937' }}
                        labelStyle={{ color: '#e2e8f0' }}
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
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center">
              <p className="text-slate-400">통계 데이터를 불러올 수 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {/* 영상 그리드 */}
      {videos.length === 0 ? (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-12 text-center">
          <p className="text-slate-400">아직 제작된 영상이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {videos.map((video) => (
            <div
              key={video.videoId}
              onClick={() => onVideoClick(video.videoId)}
              className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-sky-500/20 transition-all group"
            >
              {/* YouTube 썸네일 */}
              <div className="aspect-video bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                  alt={video.videoId}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <Play className="w-14 h-14 text-white opacity-80 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* 정보 */}
              <div className="p-4 space-y-2">
                <h3 className="text-slate-100 text-lg">{video.videoId}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                  <span>조회수</span>
                  <span className="text-right text-slate-100">{video.views.toLocaleString()}</span>
                  <span>시청시간(분)</span>
                  <span className="text-right text-slate-100">{video.watchTimeMinutes.toLocaleString()}</span>
                  <span>평균 재생</span>
                  <span className="text-right text-slate-100">{video.avgViewDurationSeconds}s</span>
                  <span>CTR</span>
                  <span className="text-right text-slate-100">{video.ctr}%</span>
                </div>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 text-sm inline-flex items-center gap-1"
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
