import { useState, useEffect } from 'react';
import { ArrowLeft, Eye, ThumbsUp, Share2, MessageCircle, Clock, Calendar, BarChart3, X, Copy, Check, Download } from 'lucide-react';
import YouTube from 'react-youtube';
import { videoService } from '../api/videoService';

export function ProjectDetail({ videoId, onBack }) {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // YouTube player options for 9:16 vertical (Shorts)
  const youtubeOpts = {
    height: '500',
    width: '280',
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    const fetchVideoStats = async () => {
      if (!videoId) return;

      try {
        setLoading(true);
        setError(null);
        const response = await videoService.getVideoStats({
          userId: 3,
          videoId: videoId,
        });
        console.log('Video stats response:', response);
        setVideoData(response);
      } catch (err) {
        console.error('영상 통계 조회 실패:', err);
        setError('영상 통계를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoStats();
  }, [videoId]);

  // 재생시간 포맷 (초 -> m:ss)
  const formatDuration = (seconds) => {
    if (!seconds) return '-';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 날짜 포맷
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, '');
  };

  // YouTube URL 생성
  const getYoutubeUrl = () => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  // 공유 URL 복사
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(getYoutubeUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('URL 복사 실패:', err);
    }
  };

  // 영상 다운로드
  const handleDownload = async () => {
    // 백엔드에서 downloadUrl이 제공되면 사용
    const downloadUrl = videoData?.downloadUrl || videoData?.videoUrl;

    if (downloadUrl) {
      try {
        const response = await fetch(downloadUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${videoData?.title || videoId}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error('다운로드 실패:', err);
        alert('다운로드에 실패했습니다.');
      }
    } else {
      alert('다운로드 가능한 영상 URL이 없습니다.');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500">{error}</p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          영상 목록으로 돌아가기
        </button>
      </div>
    );
  }

  const stats = [
    {
      icon: Eye,
      label: '조회수',
      value: videoData?.viewCount?.toLocaleString() || '0',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: ThumbsUp,
      label: '좋아요',
      value: videoData?.likeCount?.toLocaleString() || '0',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Share2,
      label: '공유',
      value: videoData?.summaryAnalytics?.shares?.toLocaleString() || '0',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: MessageCircle,
      label: '댓글수',
      value: videoData?.commentCount?.toLocaleString() || '0',
      color: 'bg-orange-100 text-orange-600'
    },
  ];

  const dailyViews = videoData?.dailyMetrics || [];
  const maxViews = dailyViews.length > 0
    ? Math.max(...dailyViews.map(d => d.views || 0))
    : 1;

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
            <h1 className="mb-2">{videoData?.title || videoId}</h1>
            <div className="flex items-center gap-4 text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(videoData?.createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDuration(videoData?.durationSeconds)}
              </span>
            </div>
          </div>

          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
            완료
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
              </div>
              <p className="text-gray-500 mb-1">{stat.label}</p>
              <p className="text-gray-900 text-2xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 영상 미리보기 (9:16 세로형) */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">영상 미리보기</h2>
          <div className="flex justify-center mb-4">
            <div className="relative w-[280px] h-[500px] rounded-2xl overflow-hidden shadow-lg bg-black">
              <YouTube
                videoId={videoId}
                opts={youtubeOpts}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              다운로드
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              공유하기
            </button>
          </div>
        </div>

        {/* 프로젝트 정보 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">프로젝트 정보</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 mb-1">영상 ID</p>
              <p className="text-gray-900">{videoId}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">재생 시간</p>
              <p className="text-gray-900">{formatDuration(videoData?.durationSeconds)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">제작일</p>
              <p className="text-gray-900">{formatDate(videoData?.createdAt)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">상태</p>
              <p className="text-gray-900">완료됨</p>
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

        {dailyViews.length > 0 ? (
          <div className="flex items-end gap-4 h-64">
            {dailyViews.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end items-center" style={{ height: '200px' }}>
                  <div className="text-sm text-gray-600 mb-2">{day.views?.toLocaleString() || 0}</div>
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                    style={{ height: `${((day.views || 0) / maxViews) * 100}%`, minHeight: '4px' }}
                  ></div>
                </div>
                <p className="text-gray-500 text-sm">{day.date || formatDate(day.day)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p>일별 조회수 데이터가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 공유 모달 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">영상 공유하기</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-500 mb-4">아래 URL을 복사하여 공유하세요.</p>

            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={getYoutubeUrl()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
              <button
                onClick={handleCopyUrl}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>복사</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
