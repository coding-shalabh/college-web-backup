import React from "react";
import Link from "next/link";
import collegeData from "@/src/data/admin_colleges.json";

const Card = ({ col, mt, start, end, isDesc, isUser }) => {
  // Get the first three colleges from the actual data
  const colleges = collegeData.slice(start || 0, end || 3).map(college => ({
    id: college._id.$oid,
    name: college.name,
    location: college.excerpt ? college.excerpt.split('\n').find(line => line.includes('Address'))?.replace('Address - ', '') || 'Location not specified' : 'Location not specified',
    image: college.image && college.image.startsWith('data:image') ? college.image : "/images/course/course-01.jpg",
    reviews: college.reviews || "0",
    excerpt: college.excerpt ? college.excerpt.split('\n')[0] : "Quality education with experienced faculty."
  }));

  return (
    <>
      {colleges.map((college) => (
        <div key={college.id} className={`${col} ${mt || ""}`}>
          <div className="rbt-card variation-01 rbt-hover">
            <div className="rbt-card-img">
              <Link href={`/college-details/${college.id}`}>
                <img 
                  src={college.image} 
                  alt={college.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </Link>
            </div>
            <div className="rbt-card-body">
              <h4 className="rbt-card-title">
                <Link href={`/college-details/${college.id}`}>
                  {college.name}
                </Link>
              </h4>
              {isDesc && (
                <p className="rbt-card-text">
                  {college.excerpt}
                </p>
              )}
              <div className="rbt-card-bottom">
                <div className="rbt-price">
                  <span className="current-price">⭐ {college.reviews} Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card; 