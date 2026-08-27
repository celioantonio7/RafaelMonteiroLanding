import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getInsights } from '@/utils/markdown';
import { ArrowLeft } from 'lucide-react';

const Insights = () => {
  const posts = useMemo(() => getInsights(), []);
  
  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category));
    return ['Todas', ...Array.from(cats)];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState('Todas');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'Todas') return posts;
    return posts.filter(p => p.category === activeCategory);
  }, [activeCategory, posts]);

  // Page Transition variants
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-[#050505] text-white pt-24 pb-32"
    >
      {/* Glassmorphism Header */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center shadow-2xl">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-6 py-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white font-medium text-sm"
          >
            <ArrowLeft size={16} />
            Voltar ao Site
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl mt-12">
        <div className="mb-16 md:mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6"
          >
            Radar Jurídico
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/60 max-w-2xl mx-auto text-lg"
          >
            Análises, artigos e inteligência estratégica sobre os movimentos mais recentes da legislação brasileira e seus impactos corporativos.
          </motion.p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                activeCategory === cat ? 'text-[#050505]' : 'text-white/70 hover:text-white'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid with Staggered Fade Up */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.1 
                }}
                className="group cursor-pointer"
              >
                <Link to={`/insights/${post.slug}`} className="block h-full">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-white/5 relative border border-white/5">
                    <img 
                      src={`${import.meta.env.BASE_URL}${post.image}`} 
                      alt={post.title}
                      className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-white/40 text-sm font-mono">{post.date}</p>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Insights;
