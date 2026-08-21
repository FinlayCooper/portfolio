'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TerminalHeading from '@/components/ui/TerminalHeading';

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location: string;
  gpa?: string;
  courses: string[];
  involvement?: string[];
  image: string;
}

const educationData: EducationItem[] = [
  {
    school: "Western University",
    degree: "Bachelor of Engineering, Software Engineering",
    period: "Sept 2022 - June 2026",
    location: "London, ON",
    gpa: "Dean's Honour List",
    courses: [
      "Algorithms & Data Structures",
      "Operating Systems",
      "DBMS",
      "Networking",
      "Web Technologies",
      "Information Security",
      "Machine Learning",
      "Cloud Computing",
      "Software Testing & Maintenance"
    ],
    involvement: [
      "Western Engineering Auto Pilot (WEAP) — C++/ROS2 contributions to the autonomous vehicle path planning pipeline"
    ],
    image: "/images/engineering-building.jpg"
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TerminalHeading
          command="cat education.md"
          title="Education"
          subtitle="Academic qualifications and achievements."
        />

        <div className="grid grid-cols-1 gap-8">
          {educationData.map((education, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="border border-term-dim bg-term-panel/80 backdrop-blur-sm overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div>
                      <h3 className="font-mono text-lg md:text-xl font-bold text-finlayGreen">{education.school}</h3>
                      <p className="text-base text-term-fg mt-1">{education.degree}</p>
                      {education.gpa && (
                        <p className="font-mono text-xs text-term-amber mt-1">{education.gpa}</p>
                      )}
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="font-mono text-sm text-term-muted">{education.period}</p>
                      <p className="font-mono text-sm text-term-muted">{education.location}</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="font-mono text-xs font-semibold text-finlayGreen uppercase tracking-widest mb-3">Relevant Courses</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {education.courses.map((course, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 font-mono text-xs text-finlayGreen border border-term-dim"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {education.involvement && education.involvement.length > 0 && (
                      <div>
                        <h4 className="font-mono text-xs font-semibold text-finlayGreen uppercase tracking-widest mb-3">Extracurricular Activities</h4>
                        <ul className="space-y-1">
                          {education.involvement.map((item, i) => (
                            <li key={i} className="text-xs text-term-fg leading-relaxed">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative h-72 md:h-full">
                  <Image
                    src={education.image}
                    alt={`${education.school} building`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 
