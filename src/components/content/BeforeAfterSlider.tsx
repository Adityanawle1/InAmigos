'use client';

import { useState } from 'react';
import Image from 'next/image';
import FadeUp from '../feedback/FadeUp';

interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
}

const SLIDER_ITEMS: SliderItem[] = [
  {
    id: 'education',
    title: 'Project Bachpanshala',
    subtitle: 'Nurturing Young Minds',
    icon: 'school',
    beforeImage: '/classroom_before.png',
    afterImage: '/classroom_after.png',
    beforeLabel: 'Traditional/Dilapidated',
    afterLabel: 'Modern Digital Classroom',
    description: 'We transform old, neglected classroom spaces into bright, colorful, digital-equipped learning environments that inspire rural children to study and grow.'
  },
  {
    id: 'environment',
    title: 'Project Prakriti',
    subtitle: 'Plant for a Better Tomorrow',
    icon: 'park',
    beforeImage: '/landscape_before.png',
    afterImage: '/landscape_after.png',
    beforeLabel: 'Barren Soil',
    afterLabel: 'Lush Forest Saplings',
    description: 'We reclaim dry, degraded fields by implementing massive community plantation drives, planting thousands of saplings to nurture ecological health.'
  }
];

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>('education');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const currentItem = SLIDER_ITEMS.find((item) => item.id === activeTab) || SLIDER_ITEMS[0];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white relative">
      <div className="max-w-screen-2xl mx-auto">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-accent-terracotta)] text-label-caps tracking-widest font-bold mb-2 block">
            Visual Evidence
          </span>
          <h2 className="text-section-header text-[var(--color-primary)] mb-4">See Our Impact in Action</h2>
          <p className="text-body-lg text-[var(--color-on-surface-variant)]">
            Explore the tangible transformations made possible on the ground through the InAmigos Foundation. Drag the slider to compare.
          </p>
        </FadeUp>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {SLIDER_ITEMS.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSliderPosition(50); // Reset position
                }}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full border transition-all ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] font-bold shadow-md'
                    : 'border-[var(--color-outline-variant)] text-[var(--color-primary)] hover:border-[var(--color-primary)] bg-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="text-[14px] uppercase tracking-wider font-semibold">{item.title}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Draggable Slider */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden ambient-shadow border border-[var(--color-alabaster)] select-none">
              
              {/* Before Image (Base) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={currentItem.beforeImage}
                  alt={currentItem.beforeLabel}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover pointer-events-none"
                  priority
                />
                <span className="absolute bottom-4 left-4 z-20 bg-black/70 text-white text-[12px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-[4px] backdrop-blur-sm">
                  {currentItem.beforeLabel}
                </span>
              </div>

              {/* After Image (Overlay with Clip Path) */}
              <div 
                className="absolute inset-0 w-full h-full z-10"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={currentItem.afterImage}
                  alt={currentItem.afterLabel}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover pointer-events-none"
                  priority
                />
                <span className="absolute bottom-4 right-4 z-20 bg-[var(--color-primary)]/90 text-white text-[12px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-[4px] backdrop-blur-sm">
                  {currentItem.afterLabel}
                </span>
              </div>

              {/* Slider Line Indicator */}
              <div 
                className="absolute top-0 bottom-0 z-20 w-[3px] bg-white cursor-ew-resize pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--color-primary)] text-white border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-[20px] select-none">unfold_more_double</span>
                </div>
              </div>

              {/* Range Input (Transparent Overlay for Draggability) */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full z-30 opacity-0 cursor-ew-resize"
                aria-label="Drag slider to compare before and after"
              />
            </div>
          </div>

          {/* Right: Description Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[var(--color-accent-terracotta)] text-label-caps font-bold tracking-wider mb-2 block">
              {currentItem.subtitle}
            </span>
            <h3 className="text-section-header-mobile text-[var(--color-primary)] font-bold mb-4">
              {currentItem.title}
            </h3>
            <p className="text-body-lg text-[var(--color-on-surface-variant)] mb-8 leading-relaxed">
              {currentItem.description}
            </p>
            
            <div className="flex gap-4">
              <a
                href="/programs/"
                className="bg-[var(--color-primary)] text-white px-6 py-3.5 rounded-[4px] text-label-caps font-bold transition-all hover:bg-[var(--color-accent-terracotta)] shadow-sm text-center"
              >
                Read Project Details
              </a>
              <a
                href="https://rzp.io/l/kWQ87HP"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-3.5 rounded-[4px] text-label-caps font-bold transition-all hover:bg-[var(--color-primary)] hover:text-white text-center"
              >
                Support This Cause
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Style adjustments for custom icon rotation */
        .absolute span {
          transform: rotate(90deg);
        }
      `}</style>
    </section>
  );
}
