import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProtocolCard = ({ title, subtitle, tag, image, delay = 0, onClick, gradient }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="group relative h-[300px] rounded-3xl overflow-hidden glass-card glass-card-hover cursor-pointer"
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
            />
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500 z-10">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(0,209,255,0.2), transparent)' }} />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] pb-1" style={{ color: 'rgba(0,209,255,0.8)', borderBottom: '1px solid rgba(0,209,255,0.2)' }}>
                        {tag}
                    </span>
                    <div
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300"
                        style={isHovered ? { backgroundColor: '#00d1ff', color: 'black' } : {}}
                    >
                        <ArrowUpRight size={16} />
                    </div>
                </div>

                <div>
                    <h3
                        className="text-2xl font-bold mb-2 leading-tight transition-colors"
                        style={{ color: isHovered ? '#00d1ff' : 'white' }}
                    >
                        {title}
                    </h3>
                    <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-2">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: 'linear-gradient(to right, transparent, rgba(0,209,255,0.5), transparent)' }} />
        </motion.div>
    );
};

export default ProtocolCard;
