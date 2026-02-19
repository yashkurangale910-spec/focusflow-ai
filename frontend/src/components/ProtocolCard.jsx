import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProtocolCard = ({ title, subtitle, tag, delay = 0, onClick, gradient }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="group relative h-[320px] rounded-2xl overflow-hidden cursor-pointer surface-raised inner-glow transition-all duration-500 hover:-translate-y-1"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Layer */}
            <div
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                style={{
                    background: gradient || '#000000'
                }}
            />

            {/* Overlay Gradient for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 z-10" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-slate-300">
                        {tag}
                    </span>
                    <motion.div
                        animate={{
                            backgroundColor: isHovered ? 'rgba(99, 102, 241, 1)' : 'rgba(255, 255, 255, 0.05)',
                            color: isHovered ? '#ffffff' : '#94a3b8'
                        }}
                        className="w-10 h-10 rounded-xl border border-white/5 flex items-center justify-center transition-all shadow-xl shadow-black/20"
                    >
                        <ArrowUpRight size={18} />
                    </motion.div>
                </div>

                <div>
                    <h3 className="text-2xl font-display font-bold mb-3 tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-all line-clamp-2 leading-relaxed font-medium">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Subtle Interactive Border */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-indigo-500/20 transition-colors duration-500 rounded-2xl z-30" />
        </motion.div>
    );
};

export default ProtocolCard;
