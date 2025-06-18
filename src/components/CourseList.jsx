import CourseCard from './CourseCard';

const CourseList = ({ courses, thing }) => {
  if (!courses || courses.length === 0) {
    return <p className='empty-list'>Geen cursussen gevonden.</p>;
  }

  return (
    <section className='course-list'>
      {courses.map((course) => (
        <CourseCard key={course.id} functionality={thing}  course={course} />
      ))}
    </section>
  );
};

export default CourseList;
