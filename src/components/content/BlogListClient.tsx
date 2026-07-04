'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/feedback/Modal';
import FadeUp from '@/components/feedback/FadeUp';
import { BlogArticle } from '@/types/content';
import { siteConfig } from '@/content/navigation';

interface BlogListClientProps {
  articles: BlogArticle[];
}

// Full text data for articles to make them fully readable and professional
const ARTICLE_BODIES: Record<string, { content: string[]; quote: string; subheadings: string[] }> = {
  '/single/Project-Vikas-Transforming-Careers-One-Internship-at-a-Time': {
    subheadings: [
      'Bridging the Classroom-to-Career Gap',
      'Structured Learning & Mentorship',
      'The Impact: Over 30,000 Lives Transformed'
    ],
    quote: "Project Vikas taught me more in three months than a year of textbooks. It gave me real responsibility and the confidence to enter the corporate world.",
    content: [
      "In India's current academic landscape, a significant gap remains between theoretical knowledge taught in universities and the hands-on skills required in the corporate world. Project Vikas was launched by the InAmigos Foundation specifically to address this discrepancy, providing students and fresh graduates with a supportive environment to kickstart their professional careers.",
      "Over the past four years, the initiative has structured thousands of virtual and physical internships across multiple domains, including Human Resources, Web Development, Graphic Design, Content Writing, and Social Media Marketing. Every intern is paired with experienced industry mentors who guide them through real-world milestones.",
      "We are proud to share that Project Vikas has successfully trained over 30,000+ interns across the nation. Many of our alumni have transitioned into high-paying roles at top-tier companies, citing their time at InAmigos as the defining turning point of their professional journeys."
    ]
  },
  '/single/mission-life-sustainable-future-inamigos-foundation': {
    subheadings: [
      'Understanding Lifestyle for Environment (LIFE)',
      'Ground-level Awareness Drives',
      'Our Commitment to the Future'
    ],
    quote: "Environmental conservation is not a government program; it is a collective duty of every individual sharing this earth.",
    content: [
      "Mission LIFE (Lifestyle For Environment) is a global democratic movement launched to encourage individuals to adopt sustainable habits. It focuses on making eco-friendly practices an integral part of our daily routines rather than an occasional activity.",
      "InAmigos Foundation has taken this initiative to the ground level across Chhattisgarh and other states. Our volunteers lead plastic-free campaigns, teach families how to segregate waste, and advocate for energy conservation in urban and rural households alike.",
      "By encouraging micro-habits—like turning off running taps, utilizing public transport, and composting organic waste—we believe we can collectively mitigate the worst effects of climate change and create a cleaner, greener earth for future generations."
    ]
  },
  '/single/save-water-save-life': {
    subheadings: [
      'The Looming Global Water Crisis',
      'Community Action & Rainwater Harvesting',
      'Spreading the Message of Conservation'
    ],
    quote: "Water is the driving force of all nature. Saving water today is securing our survival tomorrow.",
    content: [
      "Water is the most critical resource on our planet, yet less than 1% of the earth's water is clean, accessible, and safe for human consumption. Rapid urbanization, industrial pollution, and climate change are depleting our natural freshwater aquifers at an alarming rate.",
      "Through our conservation drives, InAmigos Foundation works with local communities to install rainwater harvesting systems and clean local water bodies. We believe that securing water is a shared responsibility that starts with fixing leaks at home and shifts to larger municipal conservation projects.",
      "Our volunteers conduct educational workshops in schools and rural community centers, demonstrating the simple practices of water conservation and reuse. Our goal is to make water stewardship a baseline habit for every citizen."
    ]
  },
  '/single/adopt-healthy-lifestyle-holistic-well-being': {
    subheadings: [
      'Nurturing the Body and Mind',
      'The Role of Nutrition & Activity',
      'Cultivating Mental Resilience'
    ],
    quote: "A healthy exterior starts from the inside. Holistic well-being is the alignment of physical vitality and mental peace.",
    content: [
      "In a fast-paced modern world, health is frequently reduced to the absence of disease. However, true wellness is holistic, incorporating physical vitality, nutritional balance, and mental and spiritual tranquility.",
      "This guide explores simple, actionable steps to transition towards a healthier lifestyle. We focus on integrating wholesome, unprocessed foods into our diets, engaging in daily movement, and prioritizing sleep hygiene to restore bodily systems.",
      "Equally critical is mental health. InAmigos Foundation organizes community yoga and mindfulness workshops, encouraging participants to practice stress management and build psychological resilience against modern lifestyle disorders."
    ]
  },
  '/single/udaan-women-rise-dreams-soar-change-begins': {
    subheadings: [
      'Breaking Barriers in Rural Areas',
      'Financial Independence & Sewing Kits',
      'Menstrual Hygiene Awareness'
    ],
    quote: "When you empower a woman, you empower an entire family and uplift the whole community.",
    content: [
      "Project Udaan is the women empowerment wing of InAmigos Foundation. In rural parts of India, social taboos and lack of financial resources restrict women from achieving self-reliance.",
      "We collaborate directly with rural Self-Help Groups (SHGs) to run vocational training sessions. By equipping women with commercial sewing machines, fabric, and business fundamentals, we enable them to establish small-scale tailoring businesses from their homes.",
      "Additionally, Project Udaan leads vital workshops on menstrual hygiene and reproductive health, breaking age-old taboos and distributing biodegradable sanitary napkins to young girls in rural government schools."
    ]
  },
  '/single/project-jeev-in-this-life-save-a-life': {
    subheadings: [
      'Compassion Beyond Humanity',
      'Daily Feeding & Care Initiatives',
      'First Aid & Rehabilitation'
    ],
    quote: "The greatness of a nation and its moral progress can be judged by the way its animals are treated.",
    content: [
      "Every day, thousands of stray animals face starvation, disease, and vehicle accidents on our streets. Project Jeev is InAmigos Foundation's response to this silent crisis, expressing compassion beyond human boundaries.",
      "Our volunteers feed over 50+ stray dogs and cattle daily in local neighborhoods. We set up drinking water bowls during the scorching summer months and coordinate with veterinarians to provide emergency first aid for injured street animals.",
      "Through community workshops, we also raise awareness about animal rights, humane population control, and the benefits of adopting local mixed-breed street dogs instead of purchasing imported breeds."
    ]
  },
  '/single/embracing-life-sustainable-living-with-inamigos-foundation': {
    subheadings: [
      'The Power of Individual Action',
      'Waste Reduction & Composting',
      'Eco-Friendly Farming Support'
    ],
    quote: "We do not inherit the earth from our ancestors; we borrow it from our children.",
    content: [
      "Embracing sustainable living is no longer a luxury; it is an ecological necessity. Lifestyle for Environment (LIFE) practices provide a structured roadmap to minimize our carbon footprints through everyday choices.",
      "InAmigos Foundation supports local waste reduction initiatives by distributing reusable cloth bags and demonstrating household organic waste composting methods in urban neighborhoods.",
      "In rural areas, we support eco-friendly agriculture by educating farmers on natural composting, organic pesticides, and soil health conservation, ensuring food production remains sustainable."
    ]
  },
  '/single/inamigos-foundation-transforming-lives': {
    subheadings: [
      'Our Founding Vision',
      'Five Core Pillars of Impact',
      'A Look into the Future'
    ],
    quote: "Our mission is simple: to serve humanity with transparency, compassion, and collective action.",
    content: [
      "Established on September 23, 2020, InAmigos Foundation began as a small group of friends determined to help families affected by pandemic lockdowns. Today, it has grown into a government-licensed Section 8 NGO operating across India.",
      "Our work is structured around five core pillars: primary education for kids (BachpanShala), animal care (Jeev), feeding drives (Seva), women empowerment (Udaan), and environmental stewardship (Prakriti).",
      "Backed by CSR-1 registration, 80G tax exemptions, and an ISO 9001:2015 certification, we look forward to expanding our volunteer network to all 28 states, creating a unified force for social change."
    ]
  },
  '/single/bachpanshala-shaping-dreams-with-inamigos': {
    subheadings: [
      'Every Child Deserves an Education',
      'Building Digital Literacy',
      'Community Learning Centers'
    ],
    quote: "Education is the most powerful weapon which you can use to change the world.",
    content: [
      "Education is the most powerful tool for breaking cycles of generational poverty, yet thousands of children in underserved communities still drop out of school due to lack of academic support.",
      "Project BachpanShala establishes community learning centers where kids receive supplementary teaching in math, science, and languages, alongside foundational digital literacy skills.",
      "We supply students with books, notebooks, bags, and writing materials. By creating a playful and positive learning atmosphere, we keep kids engaged in schooling and prevent dropouts."
    ]
  },
  '/single/Protect-Wildlife-Protect-Ourselves-A-Harmonious-Future-': {
    subheadings: [
      'The Interconnected Web of Life',
      'Threats to Biodiversity',
      'Actionable Conservation Practices'
    ],
    quote: "Biodiversity is the ultimate safety net of our biosphere. Protecting wildlife is protecting ourselves.",
    content: [
      "All living creatures are interconnected. When a species goes extinct, it disrupts the balance of the food web, leading to soil degradation, pest outbreaks, and water system collapses.",
      "InAmigos Foundation leads wildlife preservation campaigns, emphasizing the protection of local avian species, urban bird feeders, and maintaining green corridors in expanding cities.",
      "Through public outreach, we emphasize how individuals can prevent wildlife destruction by avoiding products derived from animal exploitation and supporting reforestation programs."
    ]
  }
};

export default function BlogListClient({ articles }: BlogListClientProps) {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const handleOpenArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setSelectedArticle(null);
  };

  // Get full content or fallback
  const detailedContent = selectedArticle 
    ? ARTICLE_BODIES[selectedArticle.link] || {
        subheadings: ['Overview', 'Key Details'],
        quote: "Making a difference is about taking continuous, everyday action.",
        content: [selectedArticle.excerpt, "No additional content was provided for this post, but InAmigos Foundation continues to work extensively on the ground to fulfill our developmental commitments across India."]
      }
    : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <FadeUp key={index} delay={(index % 3) * 120} className="h-full">
            <article className="flex flex-col h-full bg-white rounded-[4px] border border-[var(--color-alabaster)] overflow-hidden hover:border-[var(--color-primary-fixed)] transition-colors ambient-shadow group">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover img-hover-scale"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-label-caps text-[var(--color-stone)] mb-4">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">calendar_today</span>
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">visibility</span>
                    {article.views}
                  </span>
                </div>
                <h3 className="text-body-lg font-bold text-[var(--color-primary)] mb-3 line-clamp-2 group-hover:text-[var(--color-accent-terracotta)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-body-sm text-[var(--color-on-surface-variant)] mb-6 line-clamp-3 flex-grow">
                  {article.excerpt}
                </p>
                <div className="mt-auto">
                  <button 
                    onClick={() => handleOpenArticle(article)}
                    className="inline-flex items-center gap-2 text-[var(--color-primary)] font-bold text-label-caps underline-reveal cursor-pointer"
                  >
                    Read More
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>

      {/* Blog Article Reader Modal */}
      <Modal
        isOpen={selectedArticle !== null}
        onClose={handleClose}
        title="Article Reader"
      >
        {selectedArticle && detailedContent && (
          <article className="flex flex-col gap-6 font-serif">
            {/* Header Image */}
            <div className="relative w-full h-48 md:h-72 rounded-[4px] overflow-hidden">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
                sizes="700px"
                priority
              />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-label-caps text-[var(--color-stone)] font-sans border-b border-[var(--color-alabaster)] pb-4">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                Published: {selectedArticle.date}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                Views: {selectedArticle.views}
              </span>
              <span className="flex items-center gap-1 text-[var(--color-accent-terracotta)]">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                3 min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-section-header text-[var(--color-primary)] font-sans font-bold leading-tight">
              {selectedArticle.title}
            </h1>

            {/* Intro Content */}
            <p className="text-body-lg text-[var(--color-ink)] leading-relaxed italic border-l-4 border-[var(--color-primary-fixed)] pl-4 py-1">
              {selectedArticle.excerpt}
            </p>

            {/* Paragraph 1 */}
            <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
              {detailedContent.content[0]}
            </p>

            {/* Subheading 1 */}
            <h3 className="text-body-lg font-sans font-bold text-[var(--color-primary)] mt-2">
              {detailedContent.subheadings[0]}
            </h3>

            {/* Paragraph 2 */}
            <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
              {detailedContent.content[1]}
            </p>

            {/* Quote Block */}
            <div className="bg-[var(--color-surface-linen)] p-6 rounded-[4px] border border-[var(--color-alabaster)] my-2 text-center">
              <span className="material-symbols-outlined text-[var(--color-accent-terracotta)] text-[32px] opacity-40 block mb-1">
                format_quote
              </span>
              <p className="text-body-md font-bold text-[var(--color-primary)] italic">
                &ldquo;{detailedContent.quote}&rdquo;
              </p>
            </div>

            {/* Subheading 2 */}
            <h3 className="text-body-lg font-sans font-bold text-[var(--color-primary)] mt-2">
              {detailedContent.subheadings[1]}
            </h3>

            {/* Paragraph 3 */}
            <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
              {detailedContent.content[2]}
            </p>

            {/* Subheading 3 */}
            <h3 className="text-body-lg font-sans font-bold text-[var(--color-primary)] mt-2">
              {detailedContent.subheadings[2]}
            </h3>

            <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">
              InAmigos Foundation remains dedicated to scaling this impact. We invite volunteers, corporate partners, and donors to participate in expanding this work to and beyond Chhattisgarh.
            </p>

            {/* Footer buttons */}
            <div className="flex flex-wrap justify-between items-center gap-4 mt-6 pt-6 border-t border-[var(--color-alabaster)] font-sans">
              <button
                onClick={handleClose}
                className="bg-white border border-[var(--color-outline)] text-[var(--color-stone)] px-6 py-3 rounded-[4px] text-label-caps font-bold hover:bg-gray-50 transition-colors"
              >
                Back to Blog
              </button>
              <a
                href={siteConfig.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-accent-terracotta)] text-white px-6 py-3 rounded-[4px] text-label-caps font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                Support Our Causes
                <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              </a>
            </div>
          </article>
        )}
      </Modal>
    </>
  );
}
