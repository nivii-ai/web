# Nivii Web

## Documentación: Agregar puestos de trabajo

### Ubicación de los archivos

Las traducciones se encuentran en la carpeta `messages/` y están divididas por idioma:

- `en.json` (inglés)
- `es.json` (español)
- `pt.json` (portugués)

### Estructura del JSON

Cada puesto de trabajo tiene una entrada en el archivo de traducciones. La estructura típica es la siguiente:

```json
{
  "careers": {
    "positions": {
      // ...resto del los textos
      "openPosition": [
        {
          "slug": "senior-full-stack-engineer", // URL en la web
          "title": "Sr. Full Stack Engineer",
          "location": "Buenos Aires, Argentina (Hybrid) • Full-time",
          "aboutRole": [
            "We're looking for a Senior Full Stack Engineer to lead the development of our main user-facing systems - both backend services and frontend interfaces. You'll work closely with the co-founder/CTO and the founding engineering team to ship features end-to-end, improve our technical foundations, and shape the evolution of the product.",
            "You'll own major parts of the stack but have freedom to reimagine how things are built. Whether that's refining what exists or proposing a new modern frontend from scratch, we're looking for technical leadership and thoughtful execution."
          ],
          "responsibilities": [
            "Develop and maintain our web backend services and frontend UI",
            "Design and implement full-stack features with attention to performance, clarity, and maintainability",
            "Improve our architecture and tooling as we scale — CI/CD, testing, observability, modularity",
            "Collaborate directly on product decisions and roadmap prioritization",
            "Contribute across the engineering stack, from infra to application logic",
            "Ensure solid integration with our LLM-based systems and data pipelines"
          ],
          "requirements": [
            "5+ years of experience with modern frontend or full-stack frameworks such as Vue, React, Node.js, or similar",
            "3+ years of professional experience with Python, ideally building APIs or backend services",
            "Strong grasp of RESTful API design, web application patterns, and state management",
            "Experience working with Kubernetes in production environments",
            "Comfort with containerized deployment (Docker) and CI/CD pipelines (we use GitHub Actions + AWS)",
            "A self-starter who thrives in fast-moving, ownership-driven teams",
            "Based in Buenos Aires, with availability for in-person collaboration a few days per week",
            "Fluent in English and Spanish"
          ],
          "bonusPoints": [
            "Have worked at an early-stage startup or built products involving real-time or streaming data",
            "Experience with LangGraph, OpenAI APIs, or other LLM-related tooling"
          ],
          "benefits": [
            "Competitive compensation",
            "A high equity stake — we believe in shared ownership",
            "Flexibility in working hours and hybrid model",
            "Opportunity to shape product and architecture from the ground up",
            "A chance to work on something meaningful: making data useful to humans, not just analysts"
          ],
          "quickInfo": {
            "location": "Buenos Aires (Hybrid)",
            "experience": "5+ years",
            "department": "Engineering"
          }
        }
        // ...otro puesto...
      ]
    }
  }
}
```

### Significado de cada campo

- **title**: Nombre del puesto de trabajo. Ejemplo: "Desarrollador Frontend".
- **location**: Ciudad, país o modalidad (remoto) donde se desempeñará el trabajo.
- **aboutRole**: Breve resumen sobre el puesto y su propósito.
- **responsibilities**: Lista de tareas principales que realizará la persona en ese puesto.
- **requirements**: Lista de requisitos o habilidades necesarias para aplicar al puesto.
- **bonusPoints**: Puntos adicionales que se valoran en el proceso de selección.
- **benefits**: Beneficios ofrecidos por la empresa.
- **quickInfo**: Información rápida sobre el puesto (ubicación, experiencia requerida, departamento, etc.).

### Cómo agregar un nuevo puesto

1. Abre el archivo de traducción correspondiente al idioma (`es.json` para español).
2. Dentro del objeto `careers`, agrega un nuevo item con un slug único para el puesto (por ejemplo, `"frontend-dev"`).
3. Completa los campos según la estructura y significado explicados arriba.
4. Repite el proceso en los otros archivos de idioma.
