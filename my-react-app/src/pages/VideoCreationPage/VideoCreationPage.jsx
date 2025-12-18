import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import VideoCreationForm from '../../components/VideoCreationForm/VideoCreationForm';
import VideoPreview from '../../components/VideoPreview/VideoPreview';
import styles from './VideoCreationPage.module.css';

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const VideoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m6-12l-4.24 4.24M10.24 13.76L6 18m12 0l-4.24-4.24M10.24 10.24L6 6" />
  </svg>
);

const VideoCameraIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const navigationItems = [
  { path: '/', label: '홈', icon: HomeIcon },
  { path: '/video-creation', label: '영상 제작', icon: VideoIcon },
  { path: '/projects', label: '분석', icon: FolderIcon },
  { path: '/team', label: '팀', icon: UsersIcon },
  { path: '/settings', label: '설정', icon: SettingsIcon },
];

export default function VideoCreationPage() {
  const [videoData, setVideoData] = useState(null);

  const handleVideoCreation = (formData) => {
    setVideoData(formData);
    console.log('Video creation requested:', formData);
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar title="Video Creator" items={navigationItems} />

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>영상 제작 대시보드</h1>
          </header>

          <div className={styles.contentGrid}>
            <div className={styles.formSection}>
              <VideoCreationForm onSubmit={handleVideoCreation} />
            </div>

            <div className={styles.previewSection}>
              <VideoPreview
                icon={VideoCameraIcon}
                title="영상 미리보기"
                description="책 정보를 입력하고 영상 제작 버튼을 클릭하면 이곳에 영상이 생성됩니다"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
