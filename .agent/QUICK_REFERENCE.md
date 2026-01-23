# 🎨 Quick Reference: Unique Effects

## Import Statement
```jsx
import { 
    HolographicCard, 
    MorphingBlob, 
    ParticleField, 
    CosmicBackground,
    GlitchText,
    NeonBorder,
    LiquidButton,
    Ripple 
} from '../components/UniqueEffects';
```

## Component Usage

### HolographicCard
```jsx
<HolographicCard intensity="medium" className="p-6 rounded-3xl">
  <YourContent />
</HolographicCard>
```
Props: `intensity` (low/medium/high), `className`

### MorphingBlob
```jsx
<MorphingBlob 
  color="purple"          // purple, cyan, pink, amber
  size="large"            // small, medium, large
  position="top-right"    // top-left, top-right, bottom-left, bottom-right, center
/>
```

### ParticleField
```jsx
<ParticleField 
  count={20}              // number of particles
  color="cyan"            // cyan, purple, pink, white
/>
```

### CosmicBackground
```jsx
<CosmicBackground density="medium" />  // low, medium, high
```

### GlitchText
```jsx
<GlitchText className="text-4xl font-bold">
  YOUR TEXT
</GlitchText>
```

### NeonBorder
```jsx
<NeonBorder color="purple" animated={true} className="p-6 rounded-2xl">
  <YourContent />
</NeonBorder>
```
Props: `color` (purple/cyan/pink), `animated` (boolean)

### LiquidButton
```jsx
<LiquidButton 
  onClick={handleClick}
  variant="primary"        // primary, success, danger
  className="px-8 py-4"
>
  Button Text
</LiquidButton>
```

## CSS Classes

### Animations
```css
.animate-glitch-1        /* Glitch effect layer 1 */
.animate-glitch-2        /* Glitch effect layer 2 */
.animate-gradient-shift  /* Moving gradient */
.holographic-shine       /* Rainbow shimmer */
.aurora-wave            /* Flowing wave effect */
.neon-text              /* Pulsing neon glow */
.animate-breathe        /* Breathing animation */
.animate-color-cycle    /* Hue rotation */
.liquid-shape           /* Morphing shape */
.glow-spread           /* Expanding glow */
```

### Effects
```css
.magnetic-hover        /* Lift on hover */
.glass-reflection      /* Glassmorphic shine */
```

## Quick Pattern Examples

### Page Hero Section
```jsx
<div className="relative p-10 holographic-shine">
  <MorphingBlob color="purple" size="medium" position="top-right" />
  <MorphingBlob color="cyan" size="small" position="bottom-left" />
  <ParticleField count={15} color="purple" />
  
  <h1 className="text-6xl font-black">
    <span className="neon-text animate-gradient-shift bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
      YOUR TITLE
    </span>
  </h1>
</div>
```

### Card with Effects
```jsx
<HolographicCard className="p-8 rounded-3xl glass-reflection">
  <div className="relative">
    <CosmicBackground density="low" />
    <YourContent />
  </div>
</HolographicCard>
```

### Section with Atmosphere
```jsx
<section className="relative mb-12">
  <CosmicBackground density="medium" />
  <div className="relative z-10">
    <h2 className="text-3xl font-bold neon-text">Section Title</h2>
    {/* Content */}
  </div>
</section>
```

### Sidebar/Navigation
```jsx
<aside className="relative overflow-hidden">
  <div className="absolute inset-0">
    <div className="aurora-wave absolute top-1/4 left-1/2 w-full h-64 bg-gradient-to-r from-purple-600/10 via-cyan-600/10 to-purple-600/10 blur-3xl" />
  </div>
  {/* Navigation items */}
</aside>
```

## Color Palette

### Primary
- Purple: `#8b5cf6`, `#a78bfa`, `#6d28d9`
- Cyan: `#06b6d4`, `#22d3ee`, `#0891b2`

### Accent
- Pink: `#ec4899`, `#f472b6`
- Amber: `#f59e0b`, `#fbbf24`

### Usage in Effects
```jsx
<MorphingBlob color="purple" />  // Uses purple-600
<ParticleField color="cyan" />   // Uses cyan-400
```

## Performance Tips

1. **Limit particle count** - Keep under 50 per section
2. **Use blobs sparingly** - 2-3 per view maximum
3. **Cosmic background** - Use low density for large areas
4. **Conditional rendering** - Only add effects where visible
5. **Reduced motion** - Effects respect user preferences

## Combination Patterns

### Premium Card
```jsx
<HolographicCard>
  <div className="glass-reflection magnetic-hover">
    <NeonBorder color="cyan" animated>
      <YourContent />
    </NeonBorder>
  </div>
</HolographicCard>
```

### Hero Section
```jsx
<div className="holographic-shine">
  <MorphingBlob color="purple" position="top-right" />
  <ParticleField count={20} color="cyan" />
  <GlitchText>TITLE</GlitchText>
</div>
```

### Cosmic Section
```jsx
<section className="relative">
  <CosmicBackground density="low" />
  <div className="glow-spread">
    <YourContent />
  </div>
</section>
```
