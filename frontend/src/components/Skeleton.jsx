import React from 'react';

const Skeleton = ({ className, variant = 'rect' }) => {
    const baseStyles = "bg-slate-800/40 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";

    const variants = {
        rect: "rounded-xl",
        circle: "rounded-full",
        text: "rounded-md h-4 w-full"
    };

    return (
        <div className={`${baseStyles} ${variants[variant]} ${className}`} />
    );
};

export default Skeleton;
