const skills = [
  { name: 'C / C++', category: 'Programming' },
  { name: 'Python', category: 'Data Science' },
  { name: 'JavaScript', category: 'Web Development' },
  { name: 'React', category: 'Web Development' },
  { name: 'HTML & CSS', category: 'Web Development' },
  { name: 'MySQL', category: 'Databases' },
  { name: 'Tableau', category: 'Analytics' },
  { name: 'Machine Learning', category: 'AI & Data' },
];

function Skills() {
  return (
    <section className="skills">
      <h2>Skills</h2>
      <div className="skill-grid">
        {skills.map((skill) => (
          <div className="skill-pill" key={skill.name}>
            <strong>{skill.name}</strong>
            <span>{skill.category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;