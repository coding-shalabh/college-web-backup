import React, { useMemo } from "react";
import Link from "next/link";
import allColleges from "../../../data/admin_colleges.json";
import allCourses from "../../../data/admin_courses.json";

const CategoryOne = () => {
  // Count colleges and courses by category
  const categoryStats = useMemo(() => {
    const stats = {
      "Engineering": { colleges: 0, courses: 0 },
      "Management": { colleges: 0, courses: 0 },
      "Elite Science": { colleges: 0, courses: 0 },
      "Law": { colleges: 0, courses: 0 },
    };

    // Map course names to categories
    const courseToCategory = {
      // Engineering courses
      "b-tech-civil-engineering": "Engineering",
      "b-tech-mechanical-engineering": "Engineering", 
      "b-tech-in-cse": "Engineering",
      "b-tech-aerospace-engineering": "Engineering",
      "b-tech-in-ai-ml": "Engineering",
      "b-tech-aeronautical-engineering": "Engineering",
      "b-tech-in-cse-with-cyber-security": "Engineering",
      "b-tech-in-cse-with-data-science": "Engineering",
      "b-tech-in-cse-with-chemical-engineering": "Engineering",
      "b-tech-in-biotechnology": "Engineering",
      "b-tech-in-ece": "Engineering",
      "b-tech-in-eee": "Engineering",
      "b-tech-in-ise": "Engineering",
      "mtech": "Engineering",
      "barch": "Engineering",
      
      // Management courses
      "mba": "Management",
      "mcom": "Management",
      "b-com": "Management",
      "b-b-a": "Management",
      
            // Science courses  
      "mca": "Elite Science",
      "ba": "Elite Science",
      "b-pharm-1": "Elite Science",
      "pharm-d-1": "Elite Science",
      "d-pharma": "Elite Science",
       
      // Law courses
      "llb": "Law",
      "ll-m-business-corporate-law": "Law",
      "ll-m-criminal-law": "Law",
      "ll-m-constitutional-law": "Law",
      "ll-m-commercial-law": "Law",
      "ph-d-law": "Law",
      "ph-d-in-law": "Law",
    };

    // Count courses by category
    allCourses.forEach(course => {
      const category = courseToCategory[course._id.$oid] || courseToCategory[course._id];
      if (category && stats[category]) {
        stats[category].courses++;
      }
    });

    // Count colleges that offer courses in each category
    allColleges.forEach(college => {
      const categories = new Set();
      
      college.courses.forEach(courseRef => {
        const courseId = courseRef.$oid || courseRef;
        const category = courseToCategory[courseId];
        if (category) {
          categories.add(category);
        }
      });
      
      categories.forEach(category => {
        if (stats[category]) {
          stats[category].colleges++;
        }
      });
    });

    return stats;
  }, []);

  const categories = [
    { 
      id: 1, 
      title: "Engineering", 
      slug: "engineering",
      description: "Technology and Innovation"
    },
    { 
      id: 2, 
      title: "Management", 
      slug: "management",
      description: "Business and Leadership"
    },
    { 
      id: 3, 
      title: "Elite Science", 
      slug: "elite-science",
      description: "Research and Discovery"
    },
    { 
      id: 4, 
      title: "Law", 
      slug: "law",
      description: "Justice and Legal Studies"
    },
  ];

  return (
    <>
      {categories.map((category) => {
        const stats = categoryStats[category.title] || { colleges: 0, courses: 0 };
        
        return (
          <div key={category.id} className="col-lg-3 col-md-6 col-sm-6 col-12">
            <Link 
              className="rbt-cat-box rbt-cat-box-1 text-center" 
              href={`/colleges?category=${category.slug}`}
            >
              <div 
                className="inner" 
                style={{
                  border: "2px solid",
                  borderImage: "linear-gradient(to right, var(--color-primary), var(--color-secondary), var(--color-secondary), var(--color-primary)) 1",
                  borderImageSlice: "1",
                  borderRadius: "20px",
                  backgroundColor: "transparent"
                }}
              >
                <div className="content">
                  <h5 className="title">{category.title}</h5>
                  <div className="read-more-btn">
                    <div className="rbt-btn-link">
                      {stats.courses}+ Courses
                      <i className="feather-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default CategoryOne; 