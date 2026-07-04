'use client';

import { useState, useEffect, useRef } from 'react';
import FadeUp from '../feedback/FadeUp';

interface StateImpact {
  name: string;
  causes: string[];
  meals: string;
  volunteers: number;
  description: string;
}

const STATE_DATA: Record<string, StateImpact> = {
  ct: {
    name: 'Chhattisgarh (InAmigos HQ)',
    causes: ['Project Bachpanshala', 'Project Seva', 'Project Prakriti', 'Project Udaan', 'Project Vikas'],
    meals: '15,000+ Distributed',
    volunteers: 120,
    description: 'The national HQs. Home to our core operations, multiple digital classrooms, large plantation drives, and local Seva hubs.'
  },
  mh: {
    name: 'Maharashtra',
    causes: ['Project Bachpanshala', 'Project Seva', 'Project Jeev', 'Project Vikas'],
    meals: '12,000+ Distributed',
    volunteers: 85,
    description: 'Active digital learning centers in Mumbai and Pune. Active animal welfare shelter operations (Project Jeev) and local daily meals distribution.'
  },
  dl: {
    name: 'Delhi NCR',
    causes: ['Project Seva', 'Project Udaan', 'Project Vikas'],
    meals: '8,000+ Distributed',
    volunteers: 60,
    description: 'Focuses on daily meal distribution programs for street children and women skills empowerment initiatives under Project Udaan.'
  },
  mp: {
    name: 'Madhya Pradesh',
    causes: ['Project Prakriti', 'Project Bachpanshala', 'Project Seva'],
    meals: '6,000+ Distributed',
    volunteers: 40,
    description: 'Extensive tree-planting drives under Project Prakriti and basic digital classrooms operating in rural Indore.'
  },
  ka: {
    name: 'Karnataka',
    causes: ['Project Bachpanshala', 'Project Vikas', 'Project Seva'],
    meals: '4,000+ Distributed',
    volunteers: 35,
    description: 'Digital education and vocational skill development workshops. Weekend volunteer-driven food distribution programs.'
  },
  wb: {
    name: 'West Bengal',
    causes: ['Project Bachpanshala', 'Project Seva'],
    meals: '5,000+ Distributed',
    volunteers: 30,
    description: 'Educational support kits and basic literacy training for underprivileged children in suburban Kolkata.'
  },
  or: {
    name: 'Odisha',
    causes: ['Project Seva', 'Project Prakriti'],
    meals: '3,000+ Distributed',
    volunteers: 25,
    description: 'Coastal eco-preservation campaigns and local clothing distribution drives in tribal areas.'
  },
  up: {
    name: 'Uttar Pradesh',
    causes: ['Project Bachpanshala', 'Project Seva', 'Project Udaan'],
    meals: '7,000+ Distributed',
    volunteers: 50,
    description: 'Women self-help sewing groups in rural regions and school stationery distribution drives.'
  },
  gj: {
    name: 'Gujarat',
    causes: ['Project Seva', 'Project Vikas'],
    meals: '4,500+ Distributed',
    volunteers: 30,
    description: 'Vocational training internships and local community support programs.'
  },
  rj: {
    name: 'Rajasthan',
    causes: ['Project Prakriti', 'Project Seva'],
    meals: '3,000+ Distributed',
    volunteers: 20,
    description: 'Water conservation campaigns and eco-friendly farming training workshops.'
  }
};

const getGenericStateData = (id: string, name: string): StateImpact => ({
  name,
  causes: ['Project Seva', 'Project Vikas'],
  meals: '1,200+ Distributed',
  volunteers: 15,
  description: `Providing active remote training and vocational skills internships under Project Vikas and local community aid distributions.`
});

// List of all active state codes to highlight
const ACTIVE_STATE_CODES = [
  'ap', 'ar', 'as', 'br', 'ct', 'dl', 'ga', 'gj', 'hr', 'hp', 'jk', 'jh', 'ka', 'kl',
  'mp', 'mh', 'mn', 'ml', 'mz', 'nl', 'or', 'pb', 'rj', 'sk', 'tn', 'tg', 'tr', 'up', 'ut', 'wb'
];

export default function InteractiveMap() {
  const [svgContent, setSvgContent] = useState<string>('');
  const [hoveredState, setHoveredState] = useState<{ id: string; name: string } | null>(null);
  const [selectedState, setSelectedState] = useState<{ id: string; name: string }>({ id: 'ct', name: 'Chhattisgarh' });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/india-map.svg')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load map');
        return res.text();
      })
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'image/svg+xml');
        const paths = doc.querySelectorAll('path');
        paths.forEach((path) => {
          const id = path.getAttribute('id')?.toLowerCase();
          if (id) {
            path.classList.add('india-state-path');
            if (ACTIVE_STATE_CODES.includes(id)) {
              path.classList.add('state-active');
            }
          }
        });
        const svgString = new XMLSerializer().serializeToString(doc.documentElement);
        setSvgContent(svgString);
      })
      .catch((err) => console.error('Error loading India map SVG:', err));
  }, []);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGPathElement;
    if (target.tagName === 'path') {
      const id = target.getAttribute('id')?.toLowerCase();
      const name = target.getAttribute('name');
      if (id && name && ACTIVE_STATE_CODES.includes(id)) {
        setHoveredState({ id, name });
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGPathElement;
    if (target.tagName === 'path') {
      const id = target.getAttribute('id')?.toLowerCase();
      const name = target.getAttribute('name');
      if (id && name && ACTIVE_STATE_CODES.includes(id)) {
        setSelectedState({ id, name });
        
        // Remove active-selected class from all paths
        if (mapContainerRef.current) {
          const paths = mapContainerRef.current.querySelectorAll('path');
          paths.forEach(p => p.classList.remove('state-selected'));
        }
        
        // Add active-selected class to current path
        target.classList.add('state-selected');
      }
    }
  };

  // Add selected class to default state path once SVG content is loaded
  useEffect(() => {
    if (svgContent && mapContainerRef.current) {
      const defaultPath = mapContainerRef.current.querySelector(`#${selectedState.id}`);
      if (defaultPath) {
        defaultPath.classList.add('state-selected');
      }
    }
  }, [svgContent, selectedState.id]);

  const activeId = hoveredState ? hoveredState.id : selectedState.id;
  const activeName = hoveredState ? hoveredState.name : selectedState.name;
  const currentImpact = STATE_DATA[activeId] || getGenericStateData(activeId, activeName);

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--color-surface-linen)] relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-accent-terracotta)] text-label-caps tracking-widest font-bold mb-2 block">
            Nationwide Presence
          </span>
          <h2 className="text-section-header text-[var(--color-primary)] mb-4">Our Footprint</h2>
          <p className="text-body-lg text-[var(--color-on-surface-variant)]">
            Operating across 28 states, InAmigos Foundation is dedicated to driving grass-root level positive change. Hover or click on the map to see where we make a difference.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div 
              ref={mapContainerRef}
              className="india-map-container w-full max-w-[480px] aspect-[612/696] relative drop-shadow-[0_8px_30px_rgba(0,40,25,0.06)]"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          </div>

          {/* Right Column: Dynamic Profile Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl border border-[var(--color-alabaster)] p-8 md:p-10 shadow-lg relative min-h-[420px] flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--color-alabaster)] pb-6 mb-6">
                  <div>
                    <span className="text-[var(--color-primary-fixed-dim)] text-[12px] font-bold uppercase tracking-wider block mb-1">
                      Active Chapter
                    </span>
                    <h3 className="text-section-header-mobile text-[var(--color-primary)] font-bold">
                      {currentImpact.name}
                    </h3>
                  </div>
                  <div className="bg-[var(--color-surface-linen)] px-4 py-2 rounded-full border border-[var(--color-alabaster)] text-center flex flex-col">
                    <span className="text-[var(--color-primary)] text-body-md font-bold">
                      {currentImpact.volunteers}+
                    </span>
                    <span className="text-[var(--color-stone)] text-[10px] font-bold uppercase tracking-widest">
                      Volunteers
                    </span>
                  </div>
                </div>

                <p className="text-body-md text-[var(--color-on-surface-variant)] mb-8 leading-relaxed">
                  {currentImpact.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-[var(--color-stone)] text-label-caps font-bold mb-3">
                    Active Projects & Causes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentImpact.causes.map((cause) => (
                      <span 
                        key={cause}
                        className="bg-[var(--color-surface-linen)] text-[var(--color-primary)] border border-[var(--color-alabaster)] px-3 py-1.5 rounded-[4px] text-[13px] font-semibold flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-terracotta)]" />
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--color-alabaster)] pt-6 mt-8 flex items-center justify-between">
                <div>
                  <span className="text-[var(--color-stone)] text-[11px] font-bold uppercase tracking-wider block">
                    SEVA Impact
                  </span>
                  <span className="text-[var(--color-primary)] text-body-lg font-bold">
                    {currentImpact.meals}
                  </span>
                </div>
                
                <a 
                  href="https://forms.gle/AB4c1hLaDDmtrKGU7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-[4px] text-label-caps font-bold transition-all hover:bg-[var(--color-accent-terracotta)] shadow-sm flex items-center gap-2"
                >
                  Join as Volunteer
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Styles for Map Hover and Custom Transitions */}
      <style jsx global>{`
        .india-map-container svg {
          width: 100%;
          height: auto;
        }
        .india-map-container svg path {
          fill: #e7efe9; /* Surface container */
          stroke: #ffffff;
          stroke-width: 0.8;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        /* States where InAmigos operates */
        .india-map-container svg path.state-active {
          fill: #cbebd8; /* Active light green */
        }
        .india-map-container svg path.state-active:hover {
          fill: #00cc83 !important; /* Hotspot accent terracota */
          stroke: #ffffff;
          stroke-width: 1.5;
          filter: drop-shadow(0 4px 12px rgba(0, 204, 131, 0.2));
        }
        /* Active selected state styling */
        .india-map-container svg path.state-selected {
          fill: #004d2f !important; /* Primary forest green */
          stroke: #ffffff;
          stroke-width: 1.5;
          filter: drop-shadow(0 4px 12px rgba(0, 77, 47, 0.3));
        }
      `}</style>
    </section>
  );
}
