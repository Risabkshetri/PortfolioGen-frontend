'use client';
import { X, Download, LinkIcon, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { downloadPortfolio } from '@/utils/downloadPortfolio';
import { savePortfolio } from '@/utils/SavePortfolio';
import { useUser } from '@clerk/nextjs';
import Input from '@/components/Input';
import Button from '@/components/Button'



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
    })
  };

  const handleSubmit = async (e) => {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async (e) => {
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

  const [isModalOpen, setModalOpen] = useState(false)

  const handlSocialModalClick = () => [
    setModalOpen(true)
  ]


  return (
    // <div>
    //   <form className="max-w-3xl mx-auto space-y-8">
    //     {!completedSections.home ? (
    //       <div className="card rounded-lg border border-border bg-card p-6 shadow-sm" id="section-home">
    //         <h1 className="text-3xl font-bold text-primary mb-6">Let's Create Homepage</h1>
    //         <div className="space-y-4">

    //           <Input
    //             label="Full Name"
    //             type="text"
    //             id="name"
    //             name="name"
    //             placeholder="Rishab Chhetri"
    //             value={formData.name}
    //             onChange={handleChange}
    //             required={false}
    //           />
    //           <Input
    //             label="Email"
    //             type="email"
    //             id="email"
    //             name="email"
    //             placeholder="risab@gmail.com"
    //             value={formData.email}
    //             onChange={handleChange}
    //             required={false}
    //           />
    //           <Input
    //             label="Location"
    //             type="text"
    //             id="location"
    //             name="location"
    //             placeholder="Delhi, India"
    //             value={formData.location}
    //             onChange={handleChange}
    //             required={false}
    //           />

    //           <div className="space-y-2">
    //             <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="homePagePhoto">
    //               Homepage Photo
    //             </label>
    //             <input
    //               type="file"
    //               id="homePagePhoto"
    //               onChange={handleChange}
    //               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    //             />
    //           </div>

    //           <div className="relative">
    //             <button
    //               onClick={handlSocialModalClick}
    //               type="button"
    //               className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    //             >
    //               Social Media Links
    //             </button>
    //             {isModalOpen &&
    //               <div className="absolute top-full mt-2 w-full rounded-md border border-gray-200 bg-white p-4 shadow-md">
    //                 <button onClick={() => setModalOpen(false)} className="float-right p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-150 ease-in-out">
    //                   <X className="h-5 w-5 text-gray-600" />
    //                 </button>
    //                 {['linkedin', 'github', 'twitter'].map(platform => (
    //                   <div key={platform} className=" mt-4 first:mt-0">
    //                     <Input
    //                       label={platform}
    //                       type="text"
    //                       id={platform}
    //                       name={platform}
    //                       placeholder={`${platform} URL`}
    //                       value={formData.social[platform]}
    //                       onChange={(e) => handleChange(e, 'social')}
    //                       required={false}
    //                     />
    //                   </div>

    //                 ))}
    //               </div>
    //             }

    //           </div>
    //           <div className='flex flex-row justify-center items-center py-4'>
    //           <Button onClick={handlePageSubmit} children="Save Homepage" className="w-full" />
    //           </div>
    //         </div>
    //       </div>
    //     ) : completedSections.home && !completedSections.about ? (
    //       <div className="card rounded-lg border border-border bg-card p-6 shadow-sm" id="section-about">
    //         <h1 className="text-3xl font-bold text-primary mb-6">About Page</h1>
    //         <div className="space-y-4">
    //               <Input
    //               label="Role"
    //               type="text"
    //               id="role"
    //               name="role"
    //               helpText="e.g. Software Engineer"
    //               placeholder="Full Stack Developer"
    //               value={formData.role}
    //               onChange={handleChange}
    //               required
    //             />
    //           <Input
    //               label="About"
    //               type="text"
    //               id="about"
    //               name="about"
    //               helpText="50-100 words"
    //               placeholder="Write something about yourself..."
    //               value={formData.about}
    //               onChange={handleChange}
    //               required
    //             />

    //           <div className="space-y-2">
    //             <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="aboutPhoto">Photo</label>
    //             <input
    //               type="file"
    //               id="aboutPhoto"
    //               onChange={handleChange}
    //              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    //             />
    //           </div>
    //           <div className="space-y-2">
    //             <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="cv">CV</label>
    //             <input
    //               type="file"
    //               id="cv"
    //               onChange={handleChange}
    //               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    //             />
    //           </div>
    //           <div className='flex flex-row justify-center items-center py-4'>
    //           <Button onClick={handlePageSubmit} children="Save About" className="w-full" />
    //           </div>
             
    //         </div>
    //       </div>
    //     ) : completedSections.home && completedSections.about && !completedSections.skills ? (
    //       <div className="card rounded-lg border border-border bg-card p-6 shadow-sm" id="section-skills">
    //         <h1 className="text-3xl font-bold text-primary mb-6">Skills Page</h1>
    //         <div className="space-y-4">
    //           <Input
    //               label="Skills"
    //               type="text"
    //               id="skills"
    //               name="skills"
    //               helpText="5-10 skills"
    //               placeholder="Javascript"
    //               value={formData.skills}
    //               onChange={handleChange}
    //               required
    //             />
    //           <Input
    //               label="Descriptionills"
    //               type="text"
    //               id="skillAbout"
    //               name="skillAbout"
    //               helpText="50-100 words"
    //               placeholder="Write something about your skills..."
    //               value={formData.skillAbout}
    //               onChange={handleChange}
    //               required={false}
    //             />
    //           <div className="space-y-2">
    //             <label className="label text-black" htmlFor="yearOfExperience">Experience</label>
    //             <select
    //               id="yearOfExperience"
    //               value={formData.yearOfExperience}
    //               onChange={handleChange}
    //               className="select select-bordered w-full"
    //             >
    //               {[...Array(11)].map((_, i) => (
    //                 <option key={i} value={i}>{i} years</option>
    //               ))}
    //             </select>
    //           </div>
    //           <div className='flex flex-row justify-center items-center py-4'>
    //           <Button onClick={handlePageSubmit} children="Save Skills" className="w-full" />
    //           </div>
    //         </div>
    //       </div>
    //     ) : completedSections.home && completedSections.about && completedSections.skills && !completedSections.projects ? (
    //       <div className="card rounded-lg border border-border bg-card p-6 shadow-sm" id="section-projects">
    //         <h1 className="text-3xl font-bold text-primary mb-6">Projects</h1>

    //         <div className="space-y-4">
    //           <Input
    //               label="Project Name"
    //               type="text"
    //               id="projectname"
    //               name="projectname"
    //               placeholder="your project title"
    //               value={currentProject.title}
    //               onChange={(e) => handleProjectChange('title', e.target.value)}
    //               required
    //             />
    //           <Input
    //               label="Description"
    //               type="text"
    //               id="projectdes"
    //               name="projectdes"
    //               placeholder="Project Description"
    //               helpText='10-20 words'
    //               value={currentProject.description}
    //               onChange={(e) => handleProjectChange('description', e.target.value)}
    //               required={false}
    //             />
    //           <Input
    //               label="Project URL"
    //               type="text"
    //               id="projecturl"
    //               name="projecturl"
    //               placeholder="https://example.com"
    //               helpText='10-20 words'
    //               value={currentProject.link}
    //               onChange={(e) => handleProjectChange('link', e.target.value)}
    //               required={false}
    //             />

    //           <div className="space-y-2">
    //             <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="image">Project Photo</label>
    //             <input
    //               type="file"
    //               onChange={(e) => handleProjectChange('image', e.target.files[0])}
    //               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    //             />
    //           </div>
    //          <div className='flex flex-row justify-center items-center py-4'>
    //           <Button onClick={handleProjectSave} children="Save Project" className="w-full" />
    //           </div>
    //         </div>

    //         {formData.projects.length > 0 && (
    //           <div className="mt-12 space-y-6">
    //             <h2 className="text-2xl font-bold text-black mb-8">Added Projects</h2>
    //             {formData.projects.map((project, index) => (
    //               <div key={index} className="card gray-300 shadow-lg hover:shadow-lg transition-all duration-300 p-6 flex flex-col md:flex-row justify-between items-start gap-4">
    //                 <div className="flex-1 space-y-3">
    //                   <h3 className="text-xl font-bold text-black">{project.title}</h3>
    //                   <p className="text-base text-neutral-content">{project.description}</p>
    //                   <a
    //                     href={project.projectUrl}
    //                     className="inline-flex items-center text-blue-600 hover:text-blue-800 gap-2 transition-colors"
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                   >
    //                     <LinkIcon size={16} />
    //                     {project.link}
    //                   </a>
    //                 </div>
    //                 <button
    //                   onClick={() => handleDeleteProject(index)}
    //                   className="btn btn-error btn-outline gap-2 hover:scale-105 transition-transform"
    //                 >
    //                   <Trash2 size={18} />
    //                   Delete
    //                 </button>
    //               </div>
    //             ))}
    //           </div>
    //         )}
    //       </div>

    //     ) : null
    //     }
    //   </form>
    //   <div className="mt-12 space-y-6 flex justify-center">
    //     {isSubmitting &&
    //       <button onClick={handleSubmit} className="btn btn-primary left-14">
    //         Submit Portfolio
    //       </button>
    //     }
    //     {isAllFinished &&
    //       <button onClick={handleDownload} className="btn btn-secondary right-14">
    //         <Download /> Download Portfolio
    //       </button>
    //     }
    //   </div>
    // </div>
    <div>
  <form className="max-w-3xl mx-auto space-y-8">
    {!completedSections.home ? (
      <div className="card rounded-lg border border-border bg-card dark:bg-gray-800 dark:border-gray-700 p-6 shadow-sm" id="section-home">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-6">Let's Create Homepage</h1>
        <div className="space-y-4">
         
        <Input
                label="Full Name"
                type="text"
                id="name"
                name="name"
                placeholder="Rishab Chhetri"
                value={formData.name}
                onChange={handleChange}
                required={false}
              />
              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="risab@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required={false}
              />
              <Input
                label="Location"
                type="text"
                id="location"
                name="location"
                placeholder="Delhi, India"
                value={formData.location}
                onChange={handleChange}
                required={false}
              />
                 <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="homePagePhoto">
                  Homepage Photo
                </label>
                <input
                  type="file"
                  id="homePagePhoto"
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
          
          <div className="relative">
            <button
              onClick={handlSocialModalClick}
              type="button"
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background dark:bg-gray-700 dark:border-gray-600 px-3 py-2 text-sm ring-offset-background dark:text-gray-200 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Social Media Links
            </button>
            {isModalOpen &&
              <div className="absolute top-full mt-2 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-md">
                <button onClick={() => setModalOpen(false)} className="float-right p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150 ease-in-out">
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                {['linkedin', 'github', 'twitter'].map(platform => (
                      <div key={platform} className=" mt-4 first:mt-0">
                        <Input
                          label={platform}
                          type="text"
                          id={platform}
                          name={platform}
                          placeholder={`${platform} URL`}
                          value={formData.social[platform]}
                          onChange={(e) => handleChange(e, 'social')}
                          required={false}
                        />
                      </div>

                    ))}
              </div>
            }
          </div>
          <div className='flex flex-row justify-center items-center py-4'>
          <Button onClick={handlePageSubmit} children="Save Homepagae" className="w-full" />
          </div>
        </div>
      </div>
    ) : completedSections.home && !completedSections.about ? (
      <div className="card rounded-lg border border-border bg-card dark:bg-gray-800 dark:border-gray-700 p-6 shadow-sm" id="section-about">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-6">About Page</h1>
        <div className="space-y-4">
                  <Input
                  label="Role"
                  type="text"
                  id="role"
                  name="role"
                  helpText="e.g. Software Engineer"
                  placeholder="Full Stack Developer"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              <Input
                  label="About"
                  type="text"
                  id="about"
                  name="about"
                  helpText="50-100 words"
                  placeholder="Write something about yourself..."
                  value={formData.about}
                  onChange={handleChange}
                  required
                />

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="aboutPhoto">Photo</label>
                <input
                  type="file"
                  id="aboutPhoto"
                  onChange={handleChange}
                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="cv">CV</label>
                <input
                  type="file"
                  id="cv"
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className='flex flex-row justify-center items-center py-4'>
              <Button onClick={handlePageSubmit} children="Save About" className="w-full" />
              </div>
             
            </div>
      </div>
    ) : completedSections.home && completedSections.about && !completedSections.skills ? (
      <div className="card rounded-lg border border-border bg-card dark:bg-gray-800 dark:border-gray-700 p-6 shadow-sm" id="section-skills">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-6">Skills Page</h1>
        <div className="space-y-4">
        <Input
                  label="Skills"
                  type="text"
                  id="skills"
                  name="skills"
                  helpText="5-10 skills"
                  placeholder="Javascript"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />
              <Input
                  label="Descriptionills"
                  type="text"
                  id="skillAbout"
                  name="skillAbout"
                  helpText="50-100 words"
                  placeholder="Write something about your skills..."
                  value={formData.skillAbout}
                  onChange={handleChange}
                  required={false}
                />
          <div className="space-y-2">
            <label className="label text-black dark:text-white" htmlFor="yearOfExperience">Experience</label>
            <select
              id="yearOfExperience"
              value={formData.yearOfExperience}
              onChange={handleChange}
              className="select select-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i} className="dark:bg-gray-700">{i} years</option>
              ))}
            </select>
          </div>
          <div className='flex flex-row justify-center items-center py-4'>
              <Button onClick={handlePageSubmit} children="Save Skills" className="w-full" />
              </div>
        </div>
      </div>
    ) : completedSections.home && completedSections.about && completedSections.skills && !completedSections.projects ? (
      <div className="card rounded-lg border border-border bg-card dark:bg-gray-800 dark:border-gray-700 p-6 shadow-sm" id="section-projects">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-6">Projects</h1>
        <div className='space-y-4'>
        <Input
                  label="Project Name"
                  type="text"
                  id="projectname"
                  name="projectname"
                  placeholder="your project title"
                  value={currentProject.title}
                  onChange={(e) => handleProjectChange('title', e.target.value)}
                  required
                />
              <Input
                  label="Description"
                  type="text"
                  id="projectdes"
                  name="projectdes"
                  placeholder="Project Description"
                  helpText='10-20 words'
                  value={currentProject.description}
                  onChange={(e) => handleProjectChange('description', e.target.value)}
                  required={false}
                />
              <Input
                  label="Project URL"
                  type="text"
                  id="projecturl"
                  name="projecturl"
                  placeholder="https://example.com"
                  helpText='10-20 words'
                  value={currentProject.link}
                  onChange={(e) => handleProjectChange('link', e.target.value)}
                  required={false}
                />

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="image">Project Photo</label>
                <input
                  type="file"
                  onChange={(e) => handleProjectChange('image', e.target.files[0])}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
             <div className='flex flex-row justify-center items-center py-4'>
              <Button onClick={handleProjectSave} children="Save Project" className="w-full" />
              </div>
            </div>

        {formData.projects.length > 0 && (
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-8">Added Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="card gray-300 dark:bg-gray-700 shadow-lg hover:shadow-lg transition-all duration-300 p-6 flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold text-black dark:text-white">{project.title}</h3>
                  <p className="text-base text-neutral-content dark:text-gray-300">{project.description}</p>
                  <a
                    href={project.projectUrl}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 gap-2 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon size={16} />
                    {project.link}
                  </a>
                </div>
                <Button
                  onClick={() => handleDeleteProject(index)}
                  className=" gap-2 bg-red-500 hover:scale-105 transition-transform dark:bg-red-500 dark:text-red-400 dark:hover:bg-red-400/10"
                >
                  <Trash2 size={18} />
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    ) : null}
  </form>
  <div className="mt-12 space-y-6 flex justify-center">
    {isSubmitting &&
      <Button onClick={handleSubmit} className="bg-violate-300">
        Submit Portfolio
      </Button>
    }
    {isAllFinished &&
      <Button onClick={handleDownload} className="bg-violate-300">
        <Download /> Download Portfolio
      </Button>
    }
  </div>
</div>
  );
}

export default PortfolioForm;


