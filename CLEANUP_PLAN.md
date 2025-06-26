# 🧹 College Web Backup - Cleanup Execution Plan

## 📋 **CLEANUP STRATEGY**

### **Phase 1: Backup & Preparation**
- ✅ Create backup of current state
- ✅ Document current structure
- ✅ Test current functionality

### **Phase 2: Remove Unused Demo Pages**
- 🗑️ Delete `pages/02-course-school/` through `pages/16-udemy-affiliate/`
- 🗑️ Delete corresponding demo components
- 🗑️ Clean up unused page directories

### **Phase 3: Remove Unused Feature Components**
- 🗑️ Remove blog, shop, instructor, student systems
- 🗑️ Remove LMS, authentication, e-commerce components
- 🗑️ Keep only essential layout and content components

### **Phase 4: Clean Up Data Files**
- 🗑️ Remove unused JSON data files
- ✅ Keep essential data files (admin_colleges, admin_courses)

### **Phase 5: Update Imports & Dependencies**
- 🔧 Remove unused imports
- 🔧 Clean up package.json if needed
- 🔧 Verify all remaining imports work

### **Phase 6: Test & Verify**
- ✅ Test all 7 active routes
- ✅ Verify data connections work
- ✅ Ensure no broken imports

---

## 📁 **DIRECTORIES TO REMOVE**

### **Pages to Delete:**
```
pages/02-course-school/
pages/03-online-school/
pages/04-kindergarten/
pages/05-classic-lms/
pages/06-university-status/
pages/07-instructor-portfolio/
pages/08-language-academy/
pages/10-online-course/
pages/11-single-course/
pages/12-marketplace/
pages/13-university-classic/
pages/14-home-elegant/
pages/15-home-technology/
pages/16-udemy-affiliate/
pages/blog-grid/
pages/blog-list/
pages/blog-details/
pages/blog-grid-minimal/
pages/shop/
pages/single-product/
pages/cart/
pages/checkout/
pages/wishlist/
pages/instructor/
pages/student/
pages/lesson/
pages/lesson-quiz/
pages/lesson-intro/
pages/lesson-quiz-result/
pages/lesson-assignments/
pages/lesson-assignments-submit/
pages/create-course/
pages/my-account/
pages/login/
pages/profile/
pages/subscription/
pages/maintenance/
pages/course-masonry/
pages/course-filter-one-toggle/
pages/course-filter-one-open/
pages/course-filter-two-toggle/
pages/course-filter-two-open/
pages/course-with-sidebar/
pages/course-with-tab-two/
pages/course-card-2/
pages/course-card-3/
pages/course-details/
pages/course-details-2/
pages/become-a-teacher/
pages/elements/
```

### **Components to Delete:**
```
components/02-course-school/
components/03-online-school/
components/04-kindergarten/
components/05-classic-lms/
components/06-university-status/
components/07-instructor-portfolio/
components/08-language-academy/
components/10-online-course/
components/11-single-course/
components/12-Marketplace/
components/13-university-classic/
components/14-home-elegant/
components/15-home-technology/
components/16-udemy-affiliate/
components/Blogs/
components/Shop/
components/Single-Product/
components/Cart/
components/Checkout/
components/wishlist/
components/Instructor/
components/Student/
components/Lesson/
components/Login/
components/My-Account/
components/create-course/
components/Pricing/
components/Events/
components/Gallery/
components/Instagram/
components/Team/
components/User-Profile/
components/Faqs/
components/Progressbars/
components/Counters/
components/Services/
components/Brand/
components/Academy-Gallery/
components/Admission-Guide/
components/StyleGuide/
components/Become-a-Teacher/
components/Category/ (replaced by Cloned-Components)
components/Course-Details/ (except CourseDetails-One)
```

### **Data Files to Delete:**
```
data/shop.json
data/events.json
data/user.json
data/lesson.json
data/myAccount.json
data/createCourse.json
data/blog/ (directory)
data/elements/ (directory)
data/dashboard/ (directory)
data/course-details/ (directory)
```

---

## ✅ **FILES TO KEEP**

### **Essential Pages:**
```
pages/_app.js ✅
pages/_document.js ✅
pages/index.js ✅
pages/Head.js ✅
pages/backToTop.js ✅
pages/404.js ✅
pages/01-main-demo/ ✅
pages/colleges/ ✅
pages/courses/ ✅
pages/college-details/ ✅
pages/about-us/ ✅
pages/contact-us/ ✅
```

### **Essential Components:**
```
components/Header/HeaderStyle-Ten ✅
components/Header/MobileMenu ✅
components/Header/Offcanvas/Cart ✅
components/Footer/Footer-One ✅
components/Footer/Footer-Three ✅
components/Common/Separator ✅
components/Common/BreadCrumb ✅
components/Cloned-Components/ ✅ (ALL)
components/01-Main-Demo/ ✅
components/About-Us-01/ ✅
components/Abouts/ ✅
components/Contacts/ ✅
components/Course-Details/CourseDetails-One ✅
components/Newsletters/Newsletter-Two ✅
```

### **Essential Data Files:**
```
data/admin_colleges.json ✅
data/admin_courses.json ✅
data/footer.json ✅
data/headerTop.json ✅
data/admin_categories.json ✅
data/MegaMenu.json ✅
```

---

## 🚨 **SAFETY MEASURES**

1. **Create complete backup before starting**
2. **Test each phase incrementally**
3. **Keep track of deleted files for rollback**
4. **Verify application works after each major deletion**

Ready to execute this cleanup plan? 