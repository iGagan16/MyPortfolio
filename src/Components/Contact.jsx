import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all fields');
      return;
    }
    
    // If using JavaScript submission (alternative method)
    // You can use fetch to submit the form data
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
    .then(() => {
      setFormSubmitted(true);
      setFormError('');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch(error => {
      setFormError('There was an error sending your message. Please try again.');
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const contactItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Address",
      value: "Abhanpur Chhattisgarh",
      link: "#"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      value: "000000000000",
      link: ""
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "gagansahuji16@gmail.com",
      link: "mailto:gagansahuji16@gmail.com"
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <div className="py-20 px-4 md:px-8 " id="contact">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          className="text-center text-4xl md:text-5xl font-bold mb-16"
          variants={itemVariants}
        >
          <span className="text-5xl font-thin mb-4 text-center">
            Get in
          </span>{' '}
          <span className="bg-gradient-to-r from-pink-300 to-purple-500 text-transparent font-thin bg-clip-text">
            Touch
          </span>
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-8">
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              variants={itemVariants}
              whileHover={{
                y: -5,
                scale: 1.03,
                boxShadow: "0 10px 20px -5px rgba(34, 211, 238, 0.2)"
              }}
              className="flex flex-col items-center text-center p-8 rounded-2xl backdrop-blur-sm bg-slate-800/50 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300"
            >
              <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-400/20">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r bg-clip-text from-pink-300 to-purple-500 text-transparent">{item.title}</h3>
              <p className="text-slate-300">{item.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-slate-200">Or send me a message</h3>
          
          {formSubmitted ? (
            <div className="bg-green-800/30 border border-green-600/50 p-6 rounded-lg">
              <p className="text-green-300 text-lg">Thank you for your message! I'll get back to you soon.</p>
            </div>
          ) : (
            <form 
              className="max-w-lg mx-auto space-y-6" 
              name="contact" 
              
            >
              
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 text-slate-200 placeholder-slate-500 transition-all"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 text-slate-200 placeholder-slate-500 transition-all"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <textarea 
                name="message"
                placeholder="Your Message" 
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 text-slate-200 placeholder-slate-500 transition-all"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              
              {formError && (
                <p className="text-red-400">{formError}</p>
              )}
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-pink-300 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30"
              >
                Send Message
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;