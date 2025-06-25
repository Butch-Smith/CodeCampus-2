import QuestionCard from './QuestionCard';
import '../styles/Dashboard.css';

const QuestionList = ({ question }) => {
    console.log(question);
  if (!question || question.length <= 0) {
    return <p className='empty-list'>Geen vragen gevonden.</p>;
  }

  return (
    <section className='question-list'>
      {question.map((q) => (
        <QuestionCard key={q.id}  title={q.title} answer={q.answer} />
      ))}
    </section>
  );
};

export default QuestionList;
