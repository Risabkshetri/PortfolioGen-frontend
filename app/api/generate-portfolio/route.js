
import { NextResponse } from 'next/server';
import archiver from 'archiver';

export async function POST(req) {
  try {
    const { name, tagline,  projects, location, facebookUrl = '', twitterUrl = "", instaUrl = "", aboutImgurl = "", about = "", skills, aboutSkill = "", yearofexperience = 3 } = await req.json();
    const html = `<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
  <meta charset="UTF-8" />
  <title>${name}</title>
  <link rel="stylesheet" href="style.css" />
  <!-- Fontawesome CDN Link -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>
  <!-- Move to up button -->
  <div class="scroll-button">
    <a href="#home"><i class="fas fa-arrow-up"></i></a>
  </div>
  <!-- navgaition menu -->
  <nav>
    <div class="navbar">
      <div class="logo"><a href="#">Portfolio.</a></div>
      <ul class="menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
        <div class="cancel-btn">
          <i class="fas fa-times"></i>
        </div>
      </ul>
      <div class="media-icons">
        <a href=${facebookUrl}><i class="fab fa-facebook-f"></i></a>
        <a href=${twitterUrl}><i class="fab fa-twitter"></i></a>
        <a href=${instaUrl}><i class="fab fa-instagram"></i></a>
      </div>
    </div>
    <div class="menu-btn">
      <i class="fas fa-bars"></i>
    </div>
  </nav>

  <!-- Home Section Start -->
  <section class="home" id="home" style="display: flex; justify-content: space-between;">
    <div class="home-content">
      <div class="text">
        <div class="text-one">Hello,</div>
        <div class="text-two">I'm ${name}</div>
        <div class="text-three">${tagline}</div>
        <div class="text-four">From ${location}</div>
      </div>
      <div class="button">
        <button>Hire Me</button>
      </div>
    </div>
    <div class="image-container">
      <img class="hero-img" src="https://res.cloudinary.com/deht0dsks/image/upload/v1734961263/webphoto_g0tgtd.jpg"
        alt="">
    </div>
  </section>

  <!-- About Section Start -->
  <section class="about" id="about">
    <div class="content">
      <div class="title"><span>About Me</span></div>
      <div class="about-details">
        <div class="left">
          <img src=${aboutImgurl} alt="about" />
        </div>
        <div class="right">
          <div class="topic">${tagline}</div>
          <p>
            ${about}
          </p>
          <div class="button">
            <button>Download CV</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- My Skill Section Start -->
  <!-- Section Tag and Other Div will same where we need to put same CSS -->
  <section class="skills" id="skills">
    <div class="content">
      <div class="title"><span>My Skills</span></div>
      <div class="skills-details">
        <div class="text">
          <div class="topic">Skills Reflects MY Knowledge</div>
          <p>${aboutSkill}</p>
          <div class="experience">
            <div class="num">${yearofexperience}</div>
            <div class="exp">
              Years Of <br />
              Experience
            </div>
          </div>
        </div>
         <div class="skills-lists">
        ${skills.map((skill, index) => `
          <div class="skills-box" key=${index}>
            <div class="topic">${skill}</div>
          </div>
            `).join('')}
          </div>
      </div>
    </div>
  </section>

  <!-- My Portfolio Section Start -->

  <section id="projects" class="projects">
    <div class="container">
      <h2>Projects</h2>
      <div class="projects-grid">
        ${projects.map(project => `
        <div class="project-card">
          <div class="project-content">
          <img src=${project.image} alt="Project 1" />
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-links">
              <a href="${project.link}" class="project-link" target="_blank">
                View Project <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

 <!-- Contact Me section Start -->
  <section class="contact" id="contact">
      <div class="title"><span>Contact Me</span></div>
      <div class="content">
      <div class="text">
        <div class="topic">Do you want to contact me?</div>
        <p>Thank you for your interest in contacting me. I am always open to new opportunities and collaborations.
          Please feel free to reach out to me for any professional inquiries or discussions. I look forward to hearing
          from you.</p>
        <div class="button">
          <button>Let's Chat <span style="font-size: 24px;">👉</span></button>
        </div>
      </div>
      <div class="form-container">
        <div class="title">Get in Touch</div>
        <form id="contactForm" action="#" method="POST">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <div class="form-group">
                <button type="submit">Send Message</button>
            </div>
        </form>
      </div>
      </div>
  </section>


  <!-- Footer Section Start -->
  <footer>
    <footer>
      <div class="text">
        <<p>&copy; ${new Date().getFullYear()} ${name}. All rights reserved.</p>
      </div>
    </footer>

  <script src="script.js"></script>
</body>

</html>`;

    const css = `/* Google Font CDN Link */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Ubuntu:wght@400;500;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  scroll-behavior: smooth;
}

/* Custom Scroll Bar CSS */
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-track {
    background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background: #6e93f7;
    border-radius: 12px;
    transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
    background: #4070f4;
}
/* navbar styling */
nav{
  position: fixed;
  width: 100%;
  padding: 20px 0;
  z-index: 998;
  transition: all 0.3s ease;
  font-family: 'Ubuntu', sans-serif;
  padding: 1rem;
  border-bottom: 1px solid  violet;
  background-color: #f1f1f1;
  box-shadow: 0 0 10px gray;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
nav.sticky{
  background: #4070f4;
  padding: 13px 0;
}
nav .navbar{
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}
nav .navbar .logo a{
  font-weight: 500;
  font-size: 35px;
  color: #4070f4;
}
nav.sticky .navbar .logo a{
  color: #fff;
}
nav .navbar .menu{
  display: flex;
  position: relative;
}
nav .navbar .menu li{
  list-style: none;
  margin: 0 8px;
}
.navbar .menu a{
  font-size: 18px;
  font-weight: 500;
  color: #0E2431;
  padding: 6px 0;
  transition: all 0.4s ease;
}
.navbar .menu a:hover{
  color: #4070f4;
}
nav.sticky .menu a{
  color: #FFF;
}
nav.sticky .menu a:hover{
  color: #0E2431;
}
.navbar .media-icons a{
  color: #4070f4;
  font-size: 18px;
  margin: 0 6px;
}
nav.sticky .media-icons a{
  color: #FFF;
}

/* Side Navigation Menu Button CSS */
nav .menu-btn,
.navbar .menu .cancel-btn{
  position: absolute;
  color: #fff;
  right: 30px;
  top: 20px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: none;
}
nav .menu-btn{
  color: #4070f4;
}
nav.sticky .menu-btn{
  color: #FFF;
}
.navbar .menu .menu-btn{
  color: #fff;
}

.home {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8%;
  background: linear-gradient(to right, #f8fafc 50%, #f1f5f9 50%);
  gap: 4rem;
}

.home-content {
  flex: 1;
  max-width: 600px;
}

.text {
  margin-bottom: 2rem;
}

.text-one {
  color: #2563eb;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.text-two {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1e293b;
}

.text-three {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #2563eb;
  margin-bottom: 1rem;
}

.text-four {
  font-size: 1.1rem;
  color: #64748b;
}

.button button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: white;
  background: #2563eb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
}

.button button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px -1px rgba(37, 99, 235, 0.3);
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-img {
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.hero-img:hover {
  transform: scale(1.02);
}

@media (max-width: 968px) {
  .home {
    flex-direction: column;
    padding: 6rem 5%;
    gap: 2rem;
    text-align: center;
  }

  .home-content {
    max-width: 100%;
  }

  .image-container {
    padding: 1rem;
  }

  .hero-img {
    max-width: 80%;
  }
}

@media (max-width: 480px) {
  .text-two {
    font-size: 2rem;
  }

  .text-three {
    font-size: 1.5rem;
  }

  .hero-img {
    max-width: 100%;
  }
}
/* About Section Styling */
/* Those Elements Where We Have Apply Same CSS,
 I'm Selecting Directly 'Section Tag' and 'Class'  */
section{
  padding-top: 40px;
}
section .content{
  width: 80%;
  margin: 40px auto;
  font-family: 'Poppins', sans-serif;
}
.about .about-details{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
section .title{
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}
section .title span{
  color: #0E2431;
  font-size: 3rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 8px;
}
section .title span::before,
section .title span::after{
  content: '';
  position: absolute;
  height: 3px;
  width: 100%;
  background: #4070f4;
  left: 0;
  bottom: 0;
}
section .title span::after{
  bottom: -7px;
  width: 70%;
  left: 50%;
  transform: translateX(-50%);
}
.about .about-details .left{
  width: 45%;
}
.about .left img{
  height: 400px;
  width: 400px;
  object-fit: cover;
  border-radius: 12px;
}
.about-details .right{
  width: 55%;
}
section  .topic{
  color: #0E2431;
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 10px;
}
.about-details .right p{
  text-align: justify;
  color: #0E2431;
}
section .button{
  margin: 16px 0;
}
section .button button{
  outline: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 25px;
  font-weight: 400;
  background: #4070f4;
  color: #fff;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.4s ease;
}
section .button button:hover{
  border-color: #4070f4;
  background-color: #fff;
  color: #4070f4;
}

/* Skills Section Styling */

.skills {
  padding: 6rem 0;
  background: linear-gradient(135deg, #ffffff, #f5f7ff);
}

.content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
}

.title {
  text-align: center;
  margin-bottom: 5rem;
}

.title span {
  font-size: 2.8rem;
  font-weight: 700;
  color: #1a1a1a;
  position: relative;
  display: inline-block;
}

.title span::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 4px;
  background: #4070f4;
  border-radius: 2px;
}

.skills-details {
  display: flex;
  justify-content: space-between;
  gap: 5rem;
}

/* Left Side - About & Experience */
.text {
  flex: 0 0 40%;
}

.text .topic {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 3rem;
}

.experience {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.experience .num {
  font-size: 4.5rem;
  font-weight: 700;
  color: #4070f4;
  line-height: 1;
}

.experience .exp {
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
  line-height: 1.6;
}

/* Right Side - Skills List */
.skills-lists {
  flex: 0 0 55%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
}

.skills-box {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.skills-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(64, 112, 244, 0.1);
}

.skills-box .topic {
  padding: 1.5rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  position: relative;
}

.skills-box .topic::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: #4070f4;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skills-box:hover .topic::before {
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .title span {
    font-size: 2.4rem;
  }
  
  .skills-details {
    gap: 3rem;
  }
  
  .experience .num {
    font-size: 4rem;
  }
}

@media (max-width: 768px) {
  .skills {
    padding: 4rem 0;
  }
  
  .skills-details {
    flex-direction: column;
    gap: 4rem;
  }
  
  .text, .skills-lists {
    flex: 0 0 100%;
  }
  
  .text .topic {
    text-align: center;
  }
  
  .experience {
    justify-content: center;
  }
  
  .skills-lists {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .content {
    padding: 0 1.5rem;
  }
  
  .title span {
    font-size: 2rem;
  }
  
  .text .topic {
    font-size: 1rem;
  }
  
  .experience {
    padding: 2rem;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .experience .num {
    font-size: 3.5rem;
  }
  
  .skills-lists {
    font-size: 0.9rem;
    grid-template-columns: 1fr 1fr;
  }
}


/* Projects Section */
.projects {
  padding: 5rem 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.projects h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2d3436;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 2fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-content {
  padding: 1.5rem;
}

.project-content img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.project-content h3 {
  font-size: 1.5rem;
  margin: 1rem 0;
  color: #2d3436;
}

.project-content p {
  color: #636e72;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-links {
  display: flex;
  justify-content: flex-start;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background-color: #0984e3;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.project-link:hover {
  background-color: #0870c0;
}

.project-link i {
  font-size: 0.9rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .projects h2 {
    font-size: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-content h3 {
    font-size: 1.3rem;
  }
}

/* Contact Section Styles */
.contact {
  padding: 50px 0 100px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.contact .content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

/* Left Side - Text Content */
.contact .title {
  margin-bottom: 60px;
}

.contact .title span {
  font-size: 3rem;
  font-weight: 700 ;
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.contact .text {
  max-width: 500px;
}

.contact .text .topic {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 1.3;
}

.contact .text p {
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.contact .text .button {
  margin-top: 40px;
}

.contact .text button {
  background: transparent;
  color: #4299e1;
  border: 2px solid #4299e1;
  padding: 15px 35px;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.contact .text button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #4299e1;
  transition: all 0.3s ease;
  z-index: -1;
}

.contact .text button:hover {
  color: white;
}

.contact .text button:hover::before {
  width: 100%;
}

/* Right Side - Form Container */
.form-container {
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.form-container:hover {
  transform: translateY(-5px);
}

.form-container .title {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #4a5568;
  font-weight: 500;
  font-size: 1rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.1);
  background: white;
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.form-group button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4299e1 0%, #667eea 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-group button:hover {
  background: linear-gradient(135deg, #3182ce 0%, #5a67d8 100%);
  transform: translateY(-2px);
}

.form-group button:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .contact .content {
      grid-template-columns: 1fr;
      gap: 40px;
  }
  
  .contact .text {
      text-align: center;
      margin: 0 auto;
  }
  
  .contact .title span {
      font-size: 2.5rem;
  }
  
  .contact .text .topic {
      font-size: 1.8rem;
  }
  
  .form-container {
      max-width: 600px;
      margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .contact {
      padding: 60px 0;
  }
  
  .contact .content {
      padding: 0 20px;
  }
  
  .form-container {
      padding: 30px;
  }
  
  .contact .title span {
      font-size: 2rem;
  }
  
  .contact .text .topic {
      font-size: 1.5rem;
  }
}

/* Animations */
@keyframes fadeInLeft {
  from {
      opacity: 0;
      transform: translateX(-30px);
  }
  to {
      opacity: 1;
      transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
      opacity: 0;
      transform: translateX(30px);
  }
  to {
      opacity: 1;
      transform: translateX(0);
  }
}

.contact .text {
  animation: fadeInLeft 0.8s ease-out;
}

.form-container {
  animation: fadeInRight 0.8s ease-out;
}

/* Footer CSS */
footer{
  background: #4070f4;
  padding: 15px 0;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}
footer .text span{
  font-size: 17px;
  font-weight: 400;
  color: #fff;
}
footer .text span a{
  font-weight: 500;
  color: #FFF;
}
footer .text span a:hover{
  text-decoration: underline;
}
/* Scroll TO Top Button CSS */
.scroll-button a{
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: #fff;
  background: #4070f4;
  padding: 7px 12px;;
  font-size: 18px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.15);
  display: none;
}

/* Responsive Media Query */
@media (max-width: 1190px) {
  section .content{
    width: 85%;
  }
}
@media (max-width: 1000px) {
  .about .about-details{
    justify-content: center;
    flex-direction: column;
  }
  .about .about-details .left{
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .about-details .right{
    width: 90%;
    margin: 40px 0;
  }
  .services .boxes .box{
    margin: 20px 0;
    width: calc(100% / 2 - 20px);
  }
}
@media (max-width: 900px) {
  .about .left img{
    height: 350px;
    width: 350px;
  }
}

@media (max-width: 750px) {
  nav .navbar{
    width: 90%;
  }
  nav .navbar .menu{
    position: fixed;
    left: -100%;
    top: 0;
    background: #0E2431;
    height: 100vh;
    max-width: 400px;
    width: 100%;
    padding-top: 60px;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s ease;
  }
  .navbar.active .menu{
    left: 0;
  }
  nav .navbar .menu a{
    font-size: 23px;
    display: block;
    color: #fff;
    margin: 10px 0;
  }
  nav.sticky .menu a:hover{
    color: #4070f4;
  }
  nav .navbar .media-icons{
    display: none;
  }
  nav .menu-btn,
  .navbar .menu .cancel-btn{
    display: block;
  }
  .home .text-two{
    font-size: 65px;
  }
  .home .text-three{
    font-size: 35px;
  }
  .skills .skills-details{
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .skills-details .text{
    width: 100%;
    margin-bottom: 50px;
  }
  .skills-details .boxes{
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .services .boxes .box{
    margin: 20px 0;
    width: 100%;
  }
  .contact .text{
    width: 100%;
}
}

@media (max-width: 500px){
  .home .text-two{
    font-size: 55px;
  }
  .home .text-three{
    font-size: 33px;
  }
}`;

    const js = `// Sticky Navigation Menu
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

// Show/hide sticky navigation and scroll button based on scroll position
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
};

// Side Navigation Menu
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

// Open side navigation
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
};

const hideNavMenu = () => {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
};

// Close side navigation
cancelBtn.onclick = hideNavMenu;

// Close side navigation when a menu link is clicked
let navLinks = document.querySelectorAll(".menu li a");
navLinks.forEach((link) => {
  link.addEventListener("click", hideNavMenu);
});


document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Get form data
  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
  };

  try {
      const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      if (response.ok) {
          alert('Message sent successfully!');
          document.getElementById('contactForm').reset();
      } else {
          throw new Error('Failed to send message');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again later.');
  }
});`;

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    const chunks = [];
    archive.on('data', (chunk) => chunks.push(chunk));

    archive.append(html, { name: 'Portfolio/index.html' });
    archive.append(css, { name: 'Portfolio/style.css' });
    archive.append(js, { name: 'Portfolio/script.js' });

    await archive.finalize();

    const zipBuffer = Buffer.concat(chunks);

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=portfolio.zip`
      }
    });

  } catch (error) {
    console.error('Error generating portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to generate portfolio files' }, 
      { status: 500 }
    );
  }
}