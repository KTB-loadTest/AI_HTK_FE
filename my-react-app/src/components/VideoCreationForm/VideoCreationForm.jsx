import { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './VideoCreationForm.module.css';

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" />
  </svg>
);

export default function VideoCreationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    author: ''
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = () => {
    if (formData.title && formData.author) {
      onSubmit?.(formData);
    }
  };

  const isFormValid = formData.title.trim() !== '' && formData.author.trim() !== '';

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>책 정보 입력</h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>책 제목</label>
          <Input
            type="text"
            placeholder="책 제목을 입력하세요"
            value={formData.title}
            onChange={handleInputChange('title')}
            icon={BookIcon}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>저자</label>
          <Input
            type="text"
            placeholder="저자명을 입력하세요"
            value={formData.author}
            onChange={handleInputChange('author')}
            icon={UserIcon}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          icon={SparklesIcon}
        >
          영상 제작
        </Button>
      </div>
    </div>
  );
}
