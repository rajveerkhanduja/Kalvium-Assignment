import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ChapterContent = () => {
  const { courseId, chapterIndex } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchChapterContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch chapter content');

        const courseData = await response.json();
        setCourse(courseData);
        setChapter(courseData.chapters[chapterIndex]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterContent();
  }, [courseId, chapterIndex]);

  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleNext = () => {
    if (currentContentIndex < chapter.content.length - 1) {
      // Next resource in current chapter
      setCurrentContentIndex(prev => prev + 1);
    } else if (parseInt(chapterIndex) < course.chapters.length - 1) {
      // Go to next chapter
      navigate(`/dashboard/courses/${courseId}/chapters/${parseInt(chapterIndex) + 1}`);
      setCurrentContentIndex(0);
    } else {
      // All chapters completed, return to course page
      navigate(`/dashboard/courses/${courseId}`);
    }
  };

  const navigateToChapter = (index) => {
    navigate(`/dashboard/courses/${courseId}/chapters/${index}`);
    setCurrentContentIndex(0);
  };

  if (loading) return <div className="p-4">Loading chapter content...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!chapter || !course) return <div className="p-4">Chapter not found</div>;

  const currentContent = chapter.content[currentContentIndex];
  const videoId = getYoutubeVideoId(currentContent.videoUrl);
  const currentChapterIndex = parseInt(chapterIndex);

  return (
    <div className="flex">
      {/* Side Navigation */}
      <div className="w-120 bg-white shadow-lg h-screen sticky top-14 overflow-y-auto p-5 border-r border-gray-200">
        <h3 className="font-bold text-xl mb-5 text-indigo-700">Course Chapters</h3>
        <div className="space-y-2">
          {course.chapters.map((ch, idx) => (
            <div 
              key={idx} 
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                idx === currentChapterIndex 
                  ? 'bg-indigo-100 text-indigo-800 font-medium shadow-sm' 
                  : 'hover:bg-gray-50 hover:shadow-sm'
              }`}
              onClick={() => navigateToChapter(idx)}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium mr-3 shadow-sm">
                  {idx + 1}
                </span>
                <span className="text-sm truncate">{ch.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Chapter Navigation Controls */}
          

          <h1 className="text-3xl font-bold mb-6">{chapter.title}</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <p className="text-gray-700 mb-4">{chapter.summary}</p>
            <span className="text-sm text-gray-500">{chapter.duration}</span>
          </div>

          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
            <button
              onClick={() => navigateToChapter(Math.max(0, currentChapterIndex - 1))}
              disabled={currentChapterIndex === 0}
              className={`px-5 py-2.5 rounded-md flex items-center transition-all duration-200 ${
                currentChapterIndex === 0 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Previous Chapter
            </button>
            
            <div className="text-center bg-indigo-50 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-indigo-700">Chapter {currentChapterIndex + 1} of {course.chapters.length}</span>
            </div>
            
            <button
              onClick={() => navigateToChapter(Math.min(course.chapters.length - 1, currentChapterIndex + 1))}
              disabled={currentChapterIndex === course.chapters.length - 1}
              className={`px-5 py-2.5 rounded-md flex items-center transition-all duration-200 ${
                currentChapterIndex === course.chapters.length - 1 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow'
              }`}
            >
              Next Chapter
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Video Resource</h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={currentContent.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[400px] rounded-lg"
              ></iframe>
            </div>
            <h3 className="font-semibold text-lg mb-2">{currentContent.videoTitle}</h3>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-gray-700">{currentContent.summary}</p>
            </div>

            {currentContent.keyPoints.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Key Points</h2>
                <ul className="list-disc pl-5">
                  {currentContent.keyPoints.map((point, i) => (
                    <li key={i} className="text-gray-700 mb-1">{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {currentContent.codeBlocks.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Code Examples</h2>
                {currentContent.codeBlocks.map((block, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">{block.language}</h3>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                      <code>{block.code}</code>
                    </pre>
                    <p className="mt-2 text-gray-600">{block.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between items-center">
              <span className="text-gray-500">
                Resource {currentContentIndex + 1} of {chapter.content.length}
              </span>
              {currentContentIndex < chapter.content.length - 1 && (
                <button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white px-6 py-2 rounded transition duration-200"
                >
                  Next Resource
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterContent;