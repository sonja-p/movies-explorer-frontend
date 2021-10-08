import React from 'react';
import './AboutProject.css';

const AboutProject = React.forwardRef((props, ref) => (
  <section className="about-project" ref={ref}>
    <h2 className="about-project__title">О проекте</h2>
    <div className="about-project__wrapper">
      <div>
        <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div>
        <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
    </div>

    <div className="diagramma">
      <div className="diagramma__left-side">
        <h3 className="diagramma__cell diagramma__cell_side_left">1 неделя</h3>
        <p className="diagramma__caption">Back-end</p>
      </div>
      <div className="diagramma__right-side">
        <h3 className="diagramma__cell">4 недели</h3>
        <p className="diagramma__caption">Front-end</p>
      </div>
    </div>
  </section>
));

export default AboutProject;
