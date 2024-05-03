import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";

import MainDemoData from "../../../data/course-details/courseData2.json";
import StudyTour from '../../../images/banner/studytour.svg';
import IndustrialVisit from '../../../images/banner/industrialvisit.svg';
import Internship from '../../../images/banner/internship.svg';





const HomeCourses = ({ start, end }) => {
  return (
    <>
      <Swiper
        className="swiper-wrapper"
        effect={"cards"}
        modules={[EffectCards, Pagination]}
        grabCursor={true}
        pagination={{
          el: ".rbt-swiper-pagination",
          clickable: true,
        }}
      >
        {/* Swiper Slide 1: Study Tours */}
        <SwiperSlide className="swiper-slide">
          <div className="rbt-card variation-01 rbt-hover">
            <div className="rbt-card-body">
              <Image src={StudyTour} alt="Study Tours" width={500} height={300} style={{marginBottom: 20, borderRadius: 5}} />
              {/* <i className="feather-compass"></i> */}
              <h4 className="rbt-card-title">Study Tours</h4>
              <p className="rbt-card-text">Explore educational tours to enhance learning experiences.</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Swiper Slide 2: Industry Visits */}
        <SwiperSlide className="swiper-slide">
          <div className="rbt-card variation-01 rbt-hover">
            <div className="rbt-card-body">
              {/* <i className="feather-briefcase"></i> */}
              <Image src={IndustrialVisit} alt="Industry Visits" width={500} height={300} style={{marginBottom: 20, borderRadius: 5}} />

              <h4 className="rbt-card-title">Industry Visits</h4>
              <p className="rbt-card-text">Experience real-world applications of classroom knowledge.</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Swiper Slide 3: Internship */}
        <SwiperSlide className="swiper-slide">
          <div className="rbt-card variation-01 rbt-hover">
            <div className="rbt-card-body">
              {/* <i className="feather-briefcase"></i> */}
              <Image src={Internship} alt="Internship" width={500} height={300} style={{marginBottom: 20, borderRadius: 5}} />

              <h4 className="rbt-card-title">Internship</h4>
              <p className="rbt-card-text">Gain practical work experience in your field of study.</p>
            </div>
          </div>
        </SwiperSlide>
        <div className="rbt-swiper-pagination"></div>
      </Swiper>
    </>
  );
};

export default HomeCourses;
