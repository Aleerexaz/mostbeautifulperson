import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredWord, setHoveredWord] = useState(null)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Parallax effect for background elements
  const backgroundY = useTransform(cursorYSpring, [0, window.innerHeight], [0, -50])
  const backgroundX = useTransform(cursorXSpring, [0, window.innerWidth], [0, -50])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: i * 0.1
      }
    })
  }

  return (
    <div className="app-container">
      {/* Grid background */}
      <div className="grid-background" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="floating-orb orb-1"
        style={{ x: backgroundX, y: backgroundY }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="floating-orb orb-2"
        style={{ x: backgroundX, y: backgroundY }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
      <motion.div
        className="floating-orb orb-3"
        style={{ x: backgroundX, y: backgroundY }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="floating-particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
        />
      ))}

      {/* Glowing fireflies */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="firefly-modern"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 3
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className="content-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Center glow effect */}
        <motion.div
          className="center-glow"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Main title */}
        <div className="title-wrapper">
          <motion.div
            className="title-line small-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3,
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            THE
          </motion.div>
          
          <motion.div className="title-main">
            <motion.div
              className="title-line main-text"
              initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)'
              }}
              transition={{ 
                delay: 0.6,
                duration: 1.5,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              <motion.span 
                className="text-gradient"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                Most
              </motion.span>
            </motion.div>
            
            <motion.div
              className="title-line main-text"
              initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                filter: 'blur(0px)'
              }}
              transition={{ 
                delay: 0.9,
                duration: 1.5,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
            >
              <motion.span 
                className="text-gradient"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 1
                }}
              >
                Beautiful
              </motion.span>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="title-line small-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.3,
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            PERSON
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="decorative-bar"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        />

        {/* Subtitle */}
        <motion.p
          className="tagline"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 0.7, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Elegance Redefined
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="scroll-line"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Interactive cursor */}
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring
        }}
      >
        <motion.div
          className="cursor-inner"
          animate={{
            scale: hoveredWord ? 2 : 1
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        />
      </motion.div>

      {/* Cursor trail effect */}
      <motion.div
        className="cursor-trail"
        style={{
          x: cursorXSpring,
          y: cursorYSpring
        }}
      />
    </div>
  )
}

export default App
