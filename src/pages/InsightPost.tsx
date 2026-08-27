import { useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { getInsightBySlug } from '@/utils/markdown';
import { ArrowLeft } from 'lucide-react';

const InsightPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = useMemo(() => {
    if (!slug) return null;
    return getInsightBySlug(slug);
  }, [slug]);

  useEffect(() => {
    if (!post && slug) {
      navigate('/insights');
    }
    window.scrollTo(0, 0);
  }, [post, slug, navigate]);

  if (!post) return null;

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-[#050505] text-white pb-32"
    >
      {/* Glassmorphism Header */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center shadow-2xl">
          <Link 
            to="/insights" 
            className="flex items-center gap-2 px-6 py-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white font-medium text-sm"
          >
            <ArrowLeft size={16} />
            Voltar ao Radar
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[70vh] relative">
        <img 
          src={`${import.meta.env.BASE_URL}${post.image}`} 
          alt={post.title}
          className="w-full h-full object-cover mix-blend-luminosity opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24 pb-0">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            >
              {post.category}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6"
            >
              {post.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white/50 font-mono text-sm"
            >
              Publicado em {post.date}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 mt-16 md:mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-3xl mx-auto prose prose-invert prose-lg md:prose-xl prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-black prose-p:text-white/70 prose-p:font-light prose-p:leading-relaxed prose-a:text-white prose-a:underline-offset-4 hover:prose-a:text-white/70 prose-strong:text-white prose-ul:text-white/70"
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InsightPost;
