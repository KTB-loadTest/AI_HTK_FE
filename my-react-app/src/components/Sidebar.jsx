import { Video, Home, Settings, FileText, Users, LogOut } from 'lucide-react';

export function Sidebar({ currentPage, onPageChange, onLogout }) {
  const menuItems = [
    { icon: Home, label: '홈', active: currentPage === 'dashboard', page: 'dashboard' },
    { icon: Video, label: '영상 제작', active: currentPage === 'video', page: 'video' },
    { icon: FileText, label: '프로젝트', active: currentPage === 'projects', page: 'projects' },
    { icon: Users, label: '팀', active: currentPage === 'team', page: 'team' },
    { icon: Settings, label: '설정', active: currentPage === 'settings', page: 'settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h2 className="text-gray-900">Video Creator</h2>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => onPageChange(item.page)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {onLogout && (
        <div className="mt-6">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </aside>
  );
}
