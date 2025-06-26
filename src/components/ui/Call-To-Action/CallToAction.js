import React from "react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="rbt-callto-action-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="rbt-cta-content text-center">
              <h2 className="title">Ready to Start Your Educational Journey?</h2>
              <p>Discover the best colleges and courses for your future career.</p>
              <div className="rbt-button-group">
                <Link className="rbt-btn btn-gradient" href="/colleges">
                  Explore Colleges
                </Link>
                <Link className="rbt-btn btn-border" href="/courses">
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction; 