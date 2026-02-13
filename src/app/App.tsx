import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Функция для убегания кнопки "Нет" от курсора
  const handleNoHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!noButtonRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();

    // Генерируем случайные координаты для кнопки
    const maxX = containerRect.width - buttonRect.width - 40;
    const maxY = containerRect.height - buttonRect.height - 40;
    
    const newX = Math.random() * maxX - (containerRect.width / 2 - buttonRect.width / 2);
    const newY = Math.random() * maxY - (containerRect.height / 2 - buttonRect.height / 2);

    setNoButtonPosition({ x: newX, y: newY });
  };

  // Для мобильных: убегание при попытке нажатия
  const handleNoTouch = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!noButtonRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width - 40;
    const maxY = containerRect.height - buttonRect.height - 40;
    
    const newX = Math.random() * maxX - (containerRect.width / 2 - buttonRect.width / 2);
    const newY = Math.random() * maxY - (containerRect.height / 2 - buttonRect.height / 2);

    setNoButtonPosition({ x: newX, y: newY });
  };

  // Увеличиваем кнопку "Да" каждый раз, когда "Нет" убегает
  useEffect(() => {
    if (noButtonPosition.x !== 0 || noButtonPosition.y !== 0) {
      setYesButtonScale(prev => Math.min(prev + 0.1, 2));
    }
  }, [noButtonPosition]);

  if (isAccepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-red-400 overflow-hidden relative">
        {/* Фоновые анимированные сердечки */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-6xl"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              rotate: Math.random() * 360,
              opacity: 0
            }}
            animate={{
              y: -100,
              rotate: Math.random() * 360 + 360,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {['❤️', '💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-8xl font-black mb-8"
              style={{
                color: '#ff0',
                textShadow: '4px 4px 0 #f0f, -4px -4px 0 #0ff, 4px -4px 0 #0f0',
                fontFamily: 'Comic Sans MS, cursive'
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [-2, 2, -2]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ДА!!!! 🎉
            </motion.h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mb-8"
            >
              <img 
                src="https://images.unsplash.com/photo-1578588979923-639f39647d71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdW5ueSUyMGN1dGUlMjBjYXQlMjBoZWFydCUyMGxvdmV8ZW58MXx8fHwxNzcwOTk2ODczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy cat"
                className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full border-8 border-yellow-300 shadow-2xl mx-auto"
                style={{
                  boxShadow: '0 0 40px rgba(255, 0, 255, 0.8), 0 0 80px rgba(0, 255, 255, 0.6)'
                }}
              />
            </motion.div>

            <motion.p
              className="text-3xl md:text-5xl font-bold mb-6 px-4"
              style={{
                color: '#fff',
                textShadow: '3px 3px 0 #f00, -3px -3px 0 #00f',
                fontFamily: 'Impact, fantasy'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Я ЗНАЛ(А), ЧТО ТЫ СОГЛАСИШЬСЯ! 💕
            </motion.p>

            <motion.div
              className="flex gap-4 items-center justify-center text-4xl md:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                💖
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                😻
              </motion.span>
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                💝
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8 p-6 bg-white/20 backdrop-blur-sm rounded-3xl border-4 border-pink-300"
              style={{
                boxShadow: '0 0 30px rgba(255, 255, 0, 0.5)'
              }}
            >
              <p className="text-xl md:text-3xl font-bold" style={{
                color: '#fff',
                fontFamily: 'Comic Sans MS, cursive',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}>
                С Днём Святого Валентина! 🌹✨💗
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Дополнительные декоративные элементы */}
        <motion.div
          className="absolute top-10 left-10 text-6xl"
          animate={{ rotate: 360, scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🌟
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-6xl"
          animate={{ rotate: -360, scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute top-1/4 right-20 text-5xl"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💘
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-20 text-5xl"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💝
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-purple-600 overflow-hidden relative"
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
      }}
    >
      {/* Статичные декоративные сердечки на фоне */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-5xl opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Мемные котики по углам */}
      <motion.img
        src="https://images.unsplash.com/photo-1742674537283-e8da422014af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXR0ZW4lMjByb21hbnRpYyUyMHZhbGVudGluZXxlbnwxfHx8fDE3NzA5OTY4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="cat"
        className="absolute top-4 left-4 w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-yellow-300 object-cover shadow-lg"
        animate={{ rotate: [-10, 10, -10] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.img
        src="https://images.unsplash.com/photo-1655210912171-c53b1b2f95ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwbWVtZSUyMGZ1bm55fGVufDF8fHx8MTc3MDk5Njg3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="cat"
        className="absolute top-4 right-4 w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-cyan-300 object-cover shadow-lg"
        animate={{ rotate: [10, -10, 10] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center"
        >
          {/* Главный вопрос */}
          <motion.h1
            className="text-4xl md:text-7xl lg:text-8xl font-black mb-12 px-4"
            style={{
              color: '#ffff00',
              textShadow: '5px 5px 0 #ff00ff, -5px -5px 0 #00ffff, 5px -5px 0 #00ff00, -5px 5px 0 #ff0000',
              fontFamily: 'Comic Sans MS, cursive',
              letterSpacing: '2px',
              transform: 'rotate(-2deg)'
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Ты будешь моей<br />Валентинкой? 💝
          </motion.h1>

          {/* Контейнер для кнопок */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center mt-8">
            {/* Кнопка "Да" */}
            <motion.button
              onClick={() => setIsAccepted(true)}
              className="relative px-12 py-6 text-3xl md:text-5xl font-black rounded-2xl"
              style={{
                background: 'linear-gradient(45deg, #00ff00, #00ff88)',
                color: '#fff',
                textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                fontFamily: 'Impact, fantasy',
                border: '6px solid #ffff00',
                boxShadow: '0 8px 0 #008800, 0 12px 20px rgba(0,0,0,0.4)',
                transform: `scale(${yesButtonScale})`
              }}
              whileHover={{ scale: yesButtonScale * 1.1, rotate: 5 }}
              whileTap={{ scale: yesButtonScale * 0.95 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block mr-2"
              >
                💚
              </motion.span>
              ДА
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block ml-2"
              >
                💚
              </motion.span>
            </motion.button>

            {/* Кнопка "Нет" с убеганием */}
            <motion.button
              ref={noButtonRef}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoTouch}
              className="relative px-8 py-4 text-2xl md:text-4xl font-bold rounded-xl"
              style={{
                background: 'linear-gradient(45deg, #ff0000, #ff0088)',
                color: '#fff',
                textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                fontFamily: 'Comic Sans MS, cursive',
                border: '4px solid #ffff00',
                boxShadow: '0 6px 0 #880000, 0 10px 15px rgba(0,0,0,0.4)',
              }}
              animate={{
                x: noButtonPosition.x,
                y: noButtonPosition.y,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              😢 Нет
            </motion.button>
          </div>

          {/* Подсказка */}
          <motion.p
            className="mt-8 text-xl md:text-2xl font-bold px-4"
            style={{
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontFamily: 'Arial, sans-serif'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            (Попробуй нажать "Нет" 😏)
          </motion.p>
        </motion.div>
      </div>

      {/* Анимированные звёздочки */}
      <motion.div
        className="absolute bottom-10 left-10 text-5xl"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        ⭐
      </motion.div>
      <motion.div
        className="absolute top-20 right-20 text-5xl"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        ✨
      </motion.div>
    </div>
  );
}
