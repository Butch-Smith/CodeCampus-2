import { useState } from 'react';
import '../styles/CourseCard.css';
import '../styles/CourseDetail.css';
import { IoStar, IoStarOutline } from "react-icons/io5";


const CourseCard = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false)

  if (!course) {
    return (
      <article className='course-card empty'>
        Geen cursus informatie beschikbaar
      </article>
    );
  }

  const setFavorite = () => {
    setIsFavorited(!isFavorited)
  }


  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <article className='course-card'>
        <figure className='course-image'>
          <img src={course.imageUrl} alt={course.title} />
        </figure>
        <div className='course-content'>
          <h3>{course.title}</h3>
          <p className='course-description'>{course.description}</p>
          <dl className='course-details'>
            <div>
              <dt className='visually-hidden'>Niveau</dt>
              <dd className='level'>Niveau: {course.level}</dd>
            </div>
            <div>
              <dt className='visually-hidden'>Duur</dt>
              <dd className='duration'>Duur: {course.duration}</dd>
            </div>
          </dl>
          <footer className='course-stats'>
            <span className='members'>{course.members} leden</span>
            <span className='views'>{course.views} weergaven</span>
            <span className='rating'>⭐ {course.rating}</span>
          </footer>
          <div className='course-actions'>
            <button className='course-button' onClick={handleOpenModal}>
              Meer informatie
            </button>
          </div>
        </div>
      </article>

      {showModal && (
        <div className='modalContainer' onClick={handleCloseModal}>
          <div onClick={(e) => e.stopPropagation()} className='modal'>
            <div className='modal-video' dangerouslySetInnerHTML={{ __html: course.embedUrl }} />
            <div className='modal-info'>
              <div className='modal-header'>
                <h2>
                  {course.title}
                </h2>
                <p className='favoriteButton' onClick={() => setFavorite()}>
                  {isFavorited ? (
                    <IoStar style={{ color: 'gold', fontSize: 30 }} />
                  ) : (
                    <IoStarOutline style={{ color: 'black', fontSize: 30 }} />
                  )}
                </p>
              </div>
              <p className='modal-description'>
                {course.description}
              </p>
              <dl className='modal-details'>
                <div>
                  <dt className='visually-hidden'>Niveau</dt>
                  <dd className='level'>Niveau: {course.level}</dd>
                </div>
                <div>
                  <dt className='visually-hidden'>Duur</dt>
                  <dd className='duration'>Duur: {course.duration}</dd>
                </div>
                <div>
                  <dt className='visually-hidden'>Instructeur</dt>
                  <dd className='duration'>Instructeur: {course.instructor}</dd>
                </div>
              </dl>
              <div className='modal-categories'>
                <dt className='modal-description'>Categorieën: </dt>
                {
                  course.categories.map((item) => (
                    <dd className='modal-category'>{item}</dd>
                  ))
                }
              </div>
              <footer className='modal-footer'>
                <div className='footer-info'>
                  <span className='members'>{course.members} leden</span>
                  <span className='views'>{course.views} weergaven</span>
                  <span className='rating'>⭐ {course.rating}</span>
                </div>
                <a target='_blank' href={course.videoUrl}>
                  <button className='course-button'>
                    Go to video
                  </button>
                </a>
              </footer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;