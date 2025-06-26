import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="rbt-error-area rbt-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="error-inner text-center">
              <h1 className="title">404</h1>
              <h3 className="sub-title">Page Not Found</h3>
              <p>The page you are looking for does not exist.</p>
              <div className="rbt-button-group">
                <Link className="rbt-btn btn-gradient" href="/">
                  Go Back Home
                </Link>
                <Link className="rbt-btn btn-border" href="/colleges">
                  Browse Colleges
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 