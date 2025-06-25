import { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import CourseList from './CourseList';
import {questions} from '../data/FAQquestions.js';
import PopularCourses from './PopularCourses';
import Statistics from './Statistics';
import QuestionList from './QuestionList';

const Dashboard = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [pendingSearchQuery, setPendingSearchQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategories, setActiveCategories] = useState([])
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    const savedSearch = localStorage.getItem('searchQuery');
    const savedCategories = JSON.parse(localStorage.getItem('activeCategories'));

    const duration = '40 uur'
    const durationInt = parseInt(duration)
    console.log(durationInt)

    if (savedTab) setActiveTab(savedTab);
    if (savedSearch) {
      setSearchQuery(savedSearch);
      setPendingSearchQuery(savedSearch);
    }
    if (Array.isArray(savedCategories)) setActiveCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('activeCategories', JSON.stringify(activeCategories));
  }, [activeCategories]);


  const handleSearch = () => {
    setSearchQuery(pendingSearchQuery);
  };


  const setCategories = (category) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter((c) => c !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
  };

  const allCategories = [
    ...new Set(courseData.flatMap(course => course.categories))
  ];


  const filteredCourses = () => {
    if (!courseData || !Array.isArray(courseData)) return [];

    let courses = [...courseData];

    if (activeTab === 'beginner') {
      courses = courses.filter((course) => course.level === 'Beginner');
    } else if (activeTab === 'gemiddeld') {
      courses = courses.filter((course) => course.level === 'Gemiddeld');
    } else if (activeTab === 'favorites') {
      courses = courses.filter((course) => course.isFavorited === true);
    } else if (activeTab === 'gevorderd') {
      courses = courses.filter((course) => course.level === 'Gevorderd');
    } else if (activeTab === 'populair') {
      courses = courses.sort((a, b) => b.views - a.views);
    } else if (activeTab === 'duur') {
      courses = courses.sort((a, b) => parseInt(b.duration) - parseInt(a.duration))
    }


    if (activeCategories.length > 0) {
      courses = courses.filter((course) =>
        activeCategories.every(cat => course.categories.includes(cat))
      );
    }

    if (searchQuery.trim() !== '') {
      courses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return courses;
  };

  return (
    <>
      <section className='dashboard'>
        <header className='dashboard-header'>
          <div className='dashboard-search-container'>
            <input
              className='search-bar'
              type="text"
              placeholder='Naar cursussen zoeken'
              value={pendingSearchQuery}
              onChange={(e) => setPendingSearchQuery(e.target.value)}
            />
            <button className='search-button' onClick={handleSearch}>
              Zoeken
            </button>
          </div>
          <nav className='tab-buttons'>
            <button
              className={activeTab === 'all' ? 'active' : ''}
              onClick={() => setActiveTab('all')}
            >
              Alle Cursussen
            </button>
            <button
              className={activeTab === 'beginner' ? 'active' : ''}
              onClick={() => setActiveTab('beginner')}
            >
              Voor Beginners
            </button>
            <button
              className={activeTab === 'gemiddeld' ? 'active' : ''}
              onClick={() => setActiveTab('gemiddeld')}
            >
              Gemiddeld
            </button>
            <button
              className={activeTab === 'gevorderd' ? 'active' : ''}
              onClick={() => setActiveTab('gevorderd')}
            >
              Gevorderd
            </button>
            <button
              className={activeTab === 'populair' ? 'active' : ''}
              onClick={() => setActiveTab('populair')}
            >
              Meest Bekeken
            </button>
            <button
              className={activeTab === 'duur' ? 'active' : ''}
              onClick={() => setActiveTab('duur')}
            >
              Duur
            </button>
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className={categoriesOpen && 'active'}>
              Categorieën
            </button>
            <button
              className={activeTab === 'favorites' ? 'active' : ''}
              onClick={() => setActiveTab('favorites')}
            >
              Favorieten
            </button>
          </nav>
          <div className='category-container'>
            {categoriesOpen && (
              <div className='category-list'>
                {allCategories.map((category, index) => (
                  <div
                    onClick={() => setCategories(category)}
                    key={index}
                    className={activeCategories.includes(category) ? 'category selected' : 'category'}
                  >
                    {category[0].toUpperCase() + category.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className='dashboard-content'>
          <section className='main-content'>
            <h2>
              {activeTab === 'all'
                ? 'Alle Cursussen'
                : activeTab === 'beginner'
                  ? 'Alle Cursussen'
                  : activeTab === 'gemiddeld'
                    ? 'Gemiddelde Cursussen'
                    : activeTab === 'gevorderd'
                      ? 'Gevorderde Cursussen'
                      : 'Meest Bekeken Cursussen'}
            </h2>
            <CourseList courses={filteredCourses()} />
            <footer>
              <h2>FAQ</h2>
              <QuestionList question={questions} />
            </footer>
          </section>

          <aside className='sidebar'>
            <PopularCourses courses={courseData} />
            <Statistics courses={courseData} />
          </aside>
        </div>

      </section>
    </>
  );
};

export default Dashboard;