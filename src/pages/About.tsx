import "./About.css"

export default function About() {
  return (
       <div className="app-container about-container">
        <h1>À propos</h1>
        <h2>Du projet</h2>
        <p>
          Ce projet a été réalisé dans le but de mettre en valeur mes compétences techniques en développement web,
          cloud et automatisation. Il me permet de démontrer ma capacité à concevoir et livrer une application moderne,
          tout en partageant ma passion pour l'innovation et l'amélioration continue.
        </p>
        <h2>Du développeur</h2>
        <p>
          Océan est un développeur full-stack avec 5 ans d'expérience en .NET et Azure, spécialisé dans la modernisation
          d'applications financières et l'automatisation de processus métier. Reconnu pour ma rigueur et mon
          autonomie dans la livraison de solutions complètes, de la conception jusqu'au déploiement en production
          grâce à des pipelines CI/CD.
        </p>
        <hr />
        <div className="about-contact">
          <strong>Océan Barras</strong><br />
          Développeur Full-stack (.NET / Azure / React)<br />
          Québec, QC | <a href="mailto:ocean.barras@hotmail.com">ocean.barras@hotmail.com</a> |{" "}
          <a href="https://linkedin.com/in/ocean-barras" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/ocean-barras
          </a>
        </div>
    </div>
  )
}
