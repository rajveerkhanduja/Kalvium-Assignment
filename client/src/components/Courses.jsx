import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="p-4">Loading courses...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const handleViewCourse = (courseId) => {
    navigate(`/dashboard/courses/${courseId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Courses</h2>
        <button 
          onClick={() => navigate('/dashboard/create')}
          className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Course
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course._id} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
          >
            <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{course.summary}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <span className="capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {course.difficulty}
              </span>
              <span>{course.totalDuration}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                {course.chapters.length} Chapters
              </span>
              {course.createdBy && (
                <span className="text-gray-400 italic">
                  by {course.createdBy.username}
                </span>
              )}
            </div>
            <button 
              className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white py-2 rounded transition duration-200"
              onClick={() => handleViewCourse(course._id)}
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;