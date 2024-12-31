'use client';
import { Download, LinkIcon, Loader2, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { downloadPortfolio } from '@/utils/downloadPortfolio';
import { savePortfolio } from '@/utils/SavePortfolio';
import { useUser } from '@clerk/nextjs';


function PortfolioForm() {

  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAllFinished, setIsAllFinished] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    homePagePhoto: null,
    social: {
      linkedin: '',
      github: '',
      twitter: '',
    },
    role: '',
    about: '',
    aboutPhoto: null,
    cv: null,
    skills: '',
    skillAbout: '',
    yearOfExperience: '0',
    projects: []
  });
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    link: '',
    image: null
  });
  const [completedSections, setCompletedSections] = useState({
    home: false,
    about: false,
    skills: false,
    projects: false
  });
  const validations = {
    home: formData => formData.name && formData.email && formData.location,
    about: formData => formData.role && formData.about,
    skills: formData => formData.skills?.length > 0,
    projects: formData => formData.projects?.length > 0
  };

  const validateSection = (section) => {
    const validationFn = validations[section];
    return validationFn ? validationFn(formData) : false;
  };

  const handleChange = (e, section = null) => {
    const { id, value, type, files } = e.target;

    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [id]: files[0]
      }));
      return;
    }

    if (section === 'social') {
      setFormData(prev => ({
        ...prev,
        social: { ...prev.social, [id]: value }
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleProjectChange = (field, value) => {
    setCurrentProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProjectSave = (e) => {
    e.preventDefault();
    if (!currentProject.title || !currentProject.description || !currentProject.link) {
      toast.error('Please fill all fields to save project');
      return;
    }
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, currentProject]
    }));
    setCurrentProject({
      title: '',
      description: '',
      link: '',
      image: null
    });
    toast.success('Project added successfully!');
    setIsSubmitting(true);
  };

  const handleDeleteProject = (index) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this project!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // Perform deletion
          setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
          }));

          swal("Proof! Your project has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your project is not deleted!");
        }
      })
      .catch((error) => {
        console.error("Error handling project deletion:", error);
        swal("Something went wrong!", "Unable to delete the project.", "error");
      });
  };

  const handlePageSubmit = (e) => {
    e.preventDefault();
    const card = e.target.closest('.card');
    if (!card) return;

    const sectionId = card.id.split('-')[1];
    const isValid = validateSection(sectionId);

    if (isValid) {
      setCompletedSections(prev => ({ ...prev, [sectionId]: true }));
      toast.success(`${sectionId} page data saved!`);
    } else {
      toast.error('Please fill required fields');
    }
  };

  useEffect(() => {
    if (!user) return;
    
     if (formData.name || formData.email) {
      setUserData({
        userId: user.id,
        name: formData.name,
        email: formData.email,
        location: formData.location,
        homePagePhoto: formData.homePagePhoto,
        social: formData.social,
        tagline: formData.role,
        about: formData.about,
        aboutImgUrl: formData.aboutPhoto,
        cv: formData.cv,
        skills: formData.skills.split(',').filter(Boolean).map(skill => skill.trim()),
        aboutSkill: formData.skillAbout,
        yearOfExperience: formData.yearOfExperience,
        projects: formData.projects
      });
    }
  }, [formData, user]);
  console.log(userData);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      location: '',
      homePagePhoto: null,
      social: {
        linkedin: '',
        github: '',
        twitter: '',
      },
      role: '',
      about: '',
      aboutPhoto: null,
      cv: null,
      skills: '',
      skillAbout: '',
      yearOfExperience: '0',
      projects: []
    })};
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!userData) {
      toast.error('Please fill in the required fields');
      return;
    }
    try {
      await savePortfolio(userData);
      setIsSubmitting(false);
      setIsAllFinished(true);
    } catch (error) {
      console.error('Error submitting portfolio:', error); 
    }finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload =  async(e) => {
    e.preventDefault();
    
    if (!userData?.userId) {
      console.error('User ID not available');
      return;
    }
    try {
      await downloadPortfolio(userData?.userId);
      setIsAllFinished(false);
      resetForm();
      setCompletedSections({
        home: false,
        about: false,
        skills: false,
        projects: false
      });
    } catch (error) {
      console.error('Error downloading portfolio:', error);
    }
  };
  

  return (
    <div>
      <form className="max-w-3xl mx-auto space-y-8">
        {!completedSections.home ? (
          <div className="card bg-gray-100 text-black shadow-lg shadow-slate-800 p-6" id="section-home">
            <h1 className="text-3xl font-bold text-primary mb-6">Let's Create Homepage</h1>
            <div className="space-y-4">
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder='John Doe'
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder='john@gmail.comm'
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <div className="form-control text-white">
                  <label className="label text-black" htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    placeholder='Delhi, India'
                    value={formData.location}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="homePagePhoto">Homepage Photo</label>
                <input
                  type="file"
                  id="homePagePhoto"
                  onChange={handleChange}
                  className="file-input file-input-bordered file-input-secondary w-full"
                />
              </div>

              <div className="dropdown dropdown-bottom dropdown-end w-full">
                <label tabIndex={0} className="btn btn-secondary w-full">Social Media Links</label>
                <div tabIndex={0} className="dropdown-content card card-compact w-96 p-4 z-10 shadow-lg shadow-violet-800 bg-gray-100">
                  {['linkedin', 'github', 'twitter'].map(platform => (
                    <div key={platform} className="form-control text-white">
                      <label className="label text-black capitalize">{platform}</label>
                      <input
                        type="text"
                        id={platform}
                        value={formData.social[platform]}
                        onChange={(e) => handleChange(e, 'social')}
                        className="input input-bordered"
                        placeholder={`${platform} URL`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={handlePageSubmit} className="btn btn-primary w-full">Save Homepage</button>
            </div>
          </div>
        ) : completedSections.home && !completedSections.about ? (
          <div className="card bg-gray-100 shadow-lg shadow-neutral-400 p-6" id="section-about">
            <h1 className="text-3xl font-bold text-primary mb-6">About Page</h1>
            <div className="space-y-4">
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="role">
                  Role
                  <span className="label-text-alt text-gray-400">(e.g. Software Engineer)</span>
                </label>
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="about">
                  About
                  <span className="label-text-alt text-gray-400">(50-100 words)</span>
                </label>
                <textarea
                  id="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                />
              </div>
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="aboutPhoto">Photo</label>
                <input
                  type="file"
                  id="aboutPhoto"
                  onChange={handleChange}
                  className="file-input file-input-bordered"
                />
              </div>
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="cv">CV</label>
                <input
                  type="file"
                  id="cv"
                  onChange={handleChange}
                  className="file-input file-input-bordered"
                />
              </div>
              <button onClick={handlePageSubmit} className="btn btn-primary w-full">Save About</button>
            </div>
          </div>
        ) : completedSections.home && completedSections.about && !completedSections.skills ? (
          <div className="card bg-gray-100 shadow-lg shadow-slate-400 p-6" id="section-skills">
            <h1 className="text-3xl font-bold text-primary mb-6">Skills Page</h1>
            <div className="space-y-4">
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="skills">
                  Skills
                  <span className="label-text-alt text-gray-400">(5-10 skills)</span>
                </label>
                <input
                  type="text"
                  id="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="skillAbout">
                  Description
                  <span className="label-text-alt text-gray-400">(50-100 words)</span>
                </label>
                <textarea
                  id="skillAbout"
                  value={formData.skillAbout}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                />
              </div>
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="yearOfExperience">Experience</label>
                <select
                  id="yearOfExperience"
                  value={formData.yearOfExperience}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i}>{i} years</option>
                  ))}
                </select>
              </div>
              <button onClick={handlePageSubmit} className="btn btn-primary w-full">Save Skills</button>
            </div>
          </div>
        ) : completedSections.home && completedSections.about && completedSections.skills && !completedSections.projects ? (
          <div className="card bg-gray-100 shadow-lg shadow-gray-400 p-6" id="section-projects">
            <h1 className="text-3xl font-bold text-primary mb-6">Projects</h1>

            <div className="space-y-4">
              <div className="form-control text-white">
                <label className="label text-black" htmlFor="title">Project Name</label>
                <input
                  type="text"
                  value={currentProject.title}
                  onChange={(e) => handleProjectChange('title', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Project Name"
                />
              </div>

              <div className="form-control text-white">
                <label className="label text-black" htmlFor="description">
                  Description
                  <span className="label-text-alt text-gray-400">(10-20 words)</span>
                </label>
                <textarea
                  value={currentProject.description}
                  onChange={(e) => handleProjectChange('description', e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="Project Description"
                />
              </div>

              <div className="form-control text-white">
                <label className="label text-black" htmlFor="link">Project URL</label>
                <input
                  type="url"
                  value={currentProject.link}
                  onChange={(e) => handleProjectChange('link', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-control text-white">
                <label className="label text-black" htmlFor="image">Project Photo</label>
                <input
                  type="file"
                  onChange={(e) => handleProjectChange('image', e.target.files[0])}
                  className="file-input file-input-bordered w-full"
                />
              </div>

              <button
                onClick={handleProjectSave}
                className="btn btn-primary w-full"
              >
                Save Project
              </button>
            </div>

            {formData.projects.length > 0 && (
              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-bold text-black mb-8">Added Projects</h2>
                {formData.projects.map((project, index) => (
                  <div key={index} className="card gray-300 shadow-lg hover:shadow-lg transition-all duration-300 p-6 flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-bold text-black">{project.title}</h3>
                      <p className="text-base text-neutral-content">{project.description}</p>
                      <a
                        href={project.projectUrl}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 gap-2 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkIcon size={16} />
                        {project.link}
                      </a>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className="btn btn-error btn-outline gap-2 hover:scale-105 transition-transform"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        ) : null
        }
      </form>
      <div className="mt-12 space-y-6 flex justify-center">
        {isSubmitting &&
          <button onClick={handleSubmit} className="btn btn-primary left-14">
            Submit Portfolio
          </button>
        }
        {isAllFinished &&
          <button onClick={handleDownload} className="btn btn-secondary right-14">
            <Download /> Download Portfolio
          </button>
        }
      </div>
    </div>
  );
}

export default PortfolioForm;