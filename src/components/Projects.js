const projects = [
  {
    title: 'Student Portfolio Management System',
    description: 'A responsive portfolio system designed to highlight academic achievements, technical skills, and project work through a clean and accessible interface.',
    tech: ['React', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Interactive Data Dashboard',
    description: 'A project focused on presenting key metrics and visual insights using charts, filters, and summary cards for clear decision-making.',
    tech: ['Python', 'Tableau', 'MySQL'],
  },
  {
    title: 'Machine Learning Prototype',
    description: 'A supervised learning prototype that analyzes data patterns, trains models, and evaluates results to support predictive analytics.',
    tech: ['Python', 'scikit-learn', 'Pandas'],
  },
];

function Projects() {
  return (
    <section className="projects">
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tech">
              {project.tech.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;