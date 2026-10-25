import {
  profile,
  experience,
  education,
  technicalSkills,
  softSkills,
  projectProductSkills,
  certifications,
} from "../data/profile";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";

function SkillGroup({ category, skills }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h3 className="mb-3 text-sm font-semibold text-heading">{category}</h3>
      <div className="flex flex-1 flex-wrap content-start gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-surface-2 px-3 py-1 font-mono text-xs text-muted"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className="container-page pb-20 pt-32 sm:pb-24">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            About me
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-heading sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 font-mono text-sm text-muted">{profile.role}</p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {profile.bio.map((paragraph, i) => (
            <Reveal key={i} delay={i * 60}>
              <p className="max-w-3xl text-lg leading-relaxed text-ink">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <SectionTitle kicker="Experience" title="Work experience" />
          </Reveal>
          <div className="relative ml-3 space-y-10 border-l border-border pl-8">
            {experience.map((item, i) => (
              <Reveal key={`${item.title}-${item.company}`} delay={i * 60}>
                <div className="relative">
                  <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                  <div className="rounded-2xl border border-border bg-bg p-6 shadow-card">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      {item.period}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-heading">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {item.company}
                    </p>
                    {item.bullets?.length > 0 ? (
                      <ul className="mt-4 space-y-2">
                        {item.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm leading-relaxed text-muted"
                          >
                            <span className="mt-0.5 shrink-0 font-mono text-accent">
                              ▹
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <SectionTitle kicker="Education" title="Academic background" />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {education.map((item, i) => (
              <Reveal key={item.school} delay={i * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {item.period}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-heading">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.school}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <SectionTitle kicker="Skills" title="Technical skills" />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {technicalSkills.map((group, i) => (
              <Reveal
                key={group.category}
                delay={(i % 3) * 60}
                className="h-full"
              >
                <SkillGroup category={group.category} skills={group.skills} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <SectionTitle kicker="Skills" title="Soft skills" />
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {softSkills.map((skill, i) => (
              <Reveal as="li" key={skill} delay={(i % 2) * 60}>
                <span className="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-sm font-medium text-ink shadow-card">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {skill}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page py-20 sm:py-24">
          <Reveal>
            <SectionTitle
              kicker="Skills"
              title="Project & Product Management"
              sub="Planning, coordinating and delivering projects while turning ideas into products that solve real problems."
            />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {projectProductSkills.map((group, i) => (
              <Reveal
                key={group.category}
                delay={(i % 2) * 60}
                className="h-full"
              >
                <SkillGroup category={group.category} skills={group.skills} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {certifications.length > 0 && (
        <section>
          <div className="container-page py-20 sm:py-24">
            <Reveal>
              <SectionTitle kicker="Credentials" title="Certifications" />
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, i) => (
                <Reveal key={cert.name} delay={i * 60}>
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
                    <h3 className="text-base font-bold text-heading">
                      {cert.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                    <p className="mt-1 font-mono text-xs text-accent">
                      {cert.year}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
