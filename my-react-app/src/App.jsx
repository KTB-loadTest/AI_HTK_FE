import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { BookForm } from './components/BookForm';
import { Dashboard } from './components/Dashboard';
import { ProjectDetail } from './components/ProjectDetail';
import { ProjectList } from './components/ProjectList';
import { VideoListPage } from './components/VideoListPage';
import { VideoPreview } from './components/VideoPreview';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videoState, setVideoState] = useState('idle');
  const [bookData, setBookData] = useState(null);
  const sidebarPage =
    currentPage === 'video-list' || currentPage === 'project-detail'
      ? 'projects'
      : currentPage;

  const handleCreateVideo = (data) => {
    setBookData(data);
    setVideoState('processing');

    // 영상 제작 시뮬레이션 (3초 후 완료)
    setTimeout(() => {
      setVideoState('complete');
    }, 3000);
  };

  const handleReset = () => {
    setVideoState('idle');
    setBookData(null);
  };

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    setCurrentPage('video-list');
  };

  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);
    setCurrentPage('project-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedProjectId(null);
    setSelectedVideoId(null);
    setCurrentPage('dashboard');
  };

  const handleBackToVideoList = () => {
    setSelectedVideoId(null);
    setCurrentPage('video-list');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={sidebarPage} onPageChange={setCurrentPage} />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {currentPage === 'dashboard' && (
            <Dashboard onNavigate={setCurrentPage} onProjectClick={handleProjectClick} />
          )}

          {currentPage === 'projects' && (
            <ProjectList onProjectClick={handleProjectClick} />
          )}

          {currentPage === 'video-list' && (
            <VideoListPage
              projectId={selectedProjectId}
              onVideoClick={handleVideoClick}
              onBack={handleBackToDashboard}
            />
          )}

          {currentPage === 'project-detail' && (
            <ProjectDetail
              videoId={selectedVideoId}
              onBack={handleBackToVideoList}
            />
          )}

          {currentPage === 'video' && (
            <>
              <h1 className="mb-8">영상 제작 대시보드</h1>

              <div className="grid grid-cols-2 gap-6">
                <BookForm onSubmit={handleCreateVideo} disabled={videoState === 'processing'} />
                <VideoPreview
                  state={videoState}
                  bookData={bookData}
                  onReset={handleReset}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
