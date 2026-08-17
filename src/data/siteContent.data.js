import { dummyImages } from "@/lib/dummyImages";

export const siteContent = {
  schoolName: "Al-Hadi School",
  schoolTag: "Greenwood International Academy",
  tagline: "Tomorrow's Leaders Start Here",
  heroSubtitle:
    "Experience a transformative education that balances academic rigor with personal growth, preparing students to excel in a global landscape.",
  admissionsSession: "2026–2027",
  announcement:
    "Admissions for Academic Session 2026–2027 are officially OPEN!",
  
  contact: {
    phone: "+1 (234) 567-8900",
    email: "admissions@greenwood.edu",
    address: "123 Academy Blvd, North District, Metropolis 56789",
    timings: "Monday – Saturday: 8:00 AM – 2:30 PM",
  },

  principal: {
    name: "Dr. A. Rahman",
    title: "Principal",
    image: dummyImages.principal,
    welcomeHeading: "Welcome to Greenwood International",
    paragraphs: [
      "At Greenwood, we believe every child carries unique potential. Our mission is to create an environment where curiosity thrives, character is built, and futures are shaped through education that goes beyond textbooks.",
      "We are dedicated to academic distinction, fostering an atmosphere where digital literacy and holistic life skills are integrated into every facet of the learning journey, ensuring our students are prepared for the global stage.",
    ],
    lsaNote: "Our comprehensive Life Skills & Activities (LSA) program ensures every student finds their passion and builds resilient character.",
  },

  quickActions: [
    {
      id: "results",
      title: "Find Exam Results",
      subtitle: "Look up session results by roll number",
      link: "/results",
      actionText: "View Results",
      icon: "GraduationCap",
      badge: "Live Portal",
    },
    {
      id: "admission-status",
      title: "Check Admission Status",
      subtitle: "Track your submitted application",
      link: "/admissions/status",
      actionText: "Track Application →",
      icon: "FileCheck2",
    },
    {
      id: "fees",
      title: "Fee Structure & Dates",
      subtitle: "Session fee schedule and terms",
      link: "/admissions#fees",
      actionText: "Quick PDF/View",
      icon: "ReceiptText",
    },
    {
      id: "prospectus",
      title: "Download Prospectus",
      subtitle: "Comprehensive curriculum overview",
      link: "/about#prospectus",
      actionText: "View Page",
      icon: "BookOpen",
    },
  ],

  stats: [
    { value: "25+", label: "YEARS OF EXCELLENCE" },
    { value: "100%", label: "FULLY EQUIPPED LABS" },
    { value: "45+", label: "CLUBS & ACTIVITIES" },
    { value: "15:1", label: "STUDENT-TEACHER RATIO" },
  ],

  coCurricular: [
    {
      id: "sports",
      title: "Athletics & Sports",
      description:
        "From competitive football to swimming, we offer professional coaching in over 12 different sports disciplines.",
      link: "/facilities#sports",
      linkText: "View Sports Facilities →",
      image: dummyImages.sports,
    },
    {
      id: "arts",
      title: "Creative Arts",
      description:
        "Our fine arts, music, and drama programs provide a platform for self-expression, theatre production, and creative exploration.",
      link: "/activities#arts",
      linkText: "Explore the Arts →",
      image: dummyImages.arts,
    },
    {
      id: "clubs",
      title: "Leadership & Clubs",
      description:
        "Developing civic responsibility through student council, debate clubs, robotics teams, and community service initiatives.",
      link: "/activities#clubs",
      linkText: "See Active Clubs →",
      image: dummyImages.clubs,
    },
  ],

  academicPrograms: [
    {
      id: "primary",
      name: "Primary Wing",
      grades: "Grades 1 – 5",
      description: "Foundation in literacy, numeracy, critical curiosity, and social-emotional development.",
      image: dummyImages.primaryProgram,
    },
    {
      id: "middle",
      name: "Middle School",
      grades: "Grades 6 – 8",
      description: "Exploration of integrated sciences, humanities, analytical mathematics, and creative arts.",
      image: dummyImages.middleProgram,
    },
    {
      id: "secondary",
      name: "Secondary School",
      grades: "Grades 9 – 10",
      description: "Rigorous board exam preparation, specialized science and computer applications tracks.",
      image: dummyImages.secondaryProgram,
    },
    {
      id: "stem",
      name: "STEM Wings",
      grades: "All Levels",
      description: "Cutting-edge robotics, digital fabrication, computer science, and experiential physics labs.",
      image: dummyImages.stemProgram,
    },
  ],

  admissionsGuide: [
    {
      step: 1,
      title: "Submit Online Form",
      description: "Initial application with necessary student background and preferred grade level.",
    },
    {
      step: 2,
      title: "Document Review",
      description: "Our team evaluates academic transcripts, birth certificate, and previous records.",
    },
    {
      step: 3,
      title: "Student Assessment",
      description: "An interactive friendly session to understand student's aptitudes and potential.",
    },
    {
      step: 4,
      title: "Final Enrollment",
      description: "Welcome to the family! Secure your seat with initial fee payment and welcome kit.",
    },
  ],

  upcomingEvents: [
    {
      id: "ev-1",
      day: "20",
      month: "MAR",
      year: "2026",
      title: "Annual Science Exhibition",
      time: "09:00 AM – 04:00 PM",
      venue: "Main Auditorium",
      category: "Academic",
    },
    {
      id: "ev-2",
      day: "05",
      month: "APR",
      year: "2026",
      title: "Inter-House Debate Finals",
      time: "10:30 AM – 12:30 PM",
      venue: "Seminar Hall",
      category: "Co-Curricular",
    },
  ],
};
