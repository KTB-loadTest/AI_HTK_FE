import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Video, Sparkles, Zap, CheckCircle } from 'lucide-react';

export function LandingPage() {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const loginUrl = import.meta.env.VITE_BACKEND_LOGIN_URL || '/login';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollPosition / (windowHeight * 0.8));
      setActiveSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    // 백엔드가 /login에서 Google OAuth 리다이렉트를 처리하도록 위임
    window.location.href = loginUrl;
  };

  const features = [
    {
      icon: BookOpen,
      title: '책 한 권, 클릭 한 번',
      description: '좋아하는 책 정보만 입력하세요. 나머지는 AI가 알아서 처리합니다.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Video,
      title: '자동 영상 제작',
      description: '몇 초 만에 전문가 수준의 책 홍보 영상이 완성됩니다.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Sparkles,
      title: 'AI 기반 콘텐츠',
      description: '책의 핵심을 파악하여 가장 매력적인 장면을 자동으로 선정합니다.',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const benefits = [
    '시간 절약: 수동 편집 없이 즉시 제작',
    '전문성: 퀄리티 높은 결과물',
    '간편함: 복잡한 설정 불필요',
    '무제한: 원하는 만큼 영상 생성',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center relative px-6"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-block"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-3xl">
              <BookOpen className="w-16 h-16" />
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            책, 영상으로 만나다
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            AI가 당신의 책을 매력적인 홍보 영상으로 변환합니다
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 mt-12"
          >
            <p className="mb-2">아래로 스크롤하여 더 알아보기</p>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 opacity-20"
        >
          <Video className="w-24 h-24 text-blue-400" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-10 opacity-20"
        >
          <Sparkles className="w-32 h-32 text-purple-400" />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16"
          >
            간단한 세 단계로 완성
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 h-full hover:border-gray-600 transition-all">
                  <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-2xl -z-10`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-5xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16"
          >
            왜 선택해야 할까요?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
              >
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                <p className="text-xl">{benefit}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-8 mt-16 text-center"
          >
            {[
              { value: '10,000+', label: '제작된 영상' },
              { value: '99%', label: '고객 만족도' },
              { value: '3초', label: '평균 제작 시간' },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8 inline-block"
          >
            <Zap className="w-20 h-20 text-yellow-400" />
          </motion.div>

          <h2 className="text-5xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>

          <p className="text-xl text-gray-300 mb-12">
            구글 계정으로 간편하게 로그인하고, 첫 영상을 무료로 제작해보세요
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleLoginClick}
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span>Google로 계속하기</span>
            </button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 mt-6"
          >
            신용카드 필요 없음 · 언제든지 취소 가능
          </motion.p>
        </motion.div>
      </section>

      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
