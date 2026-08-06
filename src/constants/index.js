const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "About",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

 const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 20, suffix: "+", label: "Satisfied Clients" },
  { value: 10, suffix: "+", label: "Completed Projects" },
  { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const expCards = [
  {
    review: "Daniel brought creativity and technical expertise to the team, significantly building frontend applications with great performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/logos/relix.png",
    logoPath: "/images/logos/relix.png",
    title: "Frontend Developer",
    date: "January 2023 - Present",
    responsibilities: [
      "Developed and maintained user-facing features for some of our clients' websites.",
      "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
      "Optimized web applications for maximum speed and scalability.",
    ],
  },
  {
    review: "Daniel's contributions to Remeda Studio's portfolio website have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: "/images/logos/remeda2.png",
    logoPath: "/images/logos/remeda2.png",
    title: "Full Stack Developer",
    date: "June 2023 - December 2024",
    responsibilities: [
      "Led the development of Remeda Studio's web applications, focusing on scalability.",
      "Worked with backend tools to integrate APIs seamlessly with the frontend.",
      // "Contributed to open-source projects that were used with the Docker ecosystem.",
    ],
  },
  {
    review: "Daniel's work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Mobile App Developer (Flutter & Dart)",
    date: "March 2019 - May 2020",
    responsibilities: [
      "Built cross-platform mobile apps using Flutter, integrating with Appwrite's backend services.",
      "Improved app performance and user experience through code optimization and testing.",
      "Coordinated with the product team to implement features based on feedback.",
    ],
  },
];


const skillImages = [
  {imgPath: "/images/logos/nextjs.png", name: "Next.js"},
  {imgPath: "/images/logos/react.png", name: "React"},
  {imgPath: "/images/logos/node.png", name: "Node.js"},
  {imgPath: "/images/logos/flutter.png", name: "Flutter"},
  {imgPath: "/images/logos/dart.png", name: "Dart"},
  {imgPath: "/images/logos/js.png", name: "JavaScript"},
  {imgPath: "/images/logos/html.png", name: "HTML5"},
  {imgPath: "/images/logos/css.png", name: "CSS3"},
  {imgPath: "/images/logos/git.png", name: "Git"},
  {imgPath: "/images/logos/api.png", name: "REST API"},
  {imgPath: "/images/logos/three.png", name: "Three.js"},
  {imgPath: "/images/logos/express.png", name: "Express.js"},
]

const testimonials = [
  {
    name: "Tammi",
    mentions: "@estherhoward",
    review:
      "It was a pleasure working with you too! The website turned out beautifully Daniel. Thanks again for your patience and making this sauce launch a success. & I will definitely recommend your work to others",
    imgPath: "/images/client1.png",
  },
  {
    name: "RelixCore",
    mentions: "@wadewarren",
    review:
      "Daniel’s work exceeded all expectations! The website is not only beautiful but also functions flawlessly. His patience and expertise made the whole process smooth and stress-free. I can’t thank him enough for making this project a success, and I’ll definitely refer his services to others.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Hubert",
    mentions: "@guyhawkins",
    review:
      "Working with Daniel was fantastic! He brought our vision to life with a stunning website. His attention to detail made all the difference. Thanks to him, our project launch was a huge success, and I’ll absolutely recommend him to others",
    imgPath: "/images/client2.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  skillImages,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  testimonials,
  socialImgs,
  navLinks,
};
