// src/config.ts
const fixedDate = new Date('2010-01-01');
const now = new Date();
let yearsElapsed = now.getFullYear() - fixedDate.getFullYear(); 

const monthDiff = now.getMonth() - fixedDate.getMonth();
const dayDiff = now.getDate() - fixedDate.getDate();
if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
  yearsElapsed--; 
}

export const ABOUT_ME = {
    profile_title: "Climate Scientist and Software Engineer",
    description_short: ['in interdisciplinary research and cloud-native workflows advancing open science.'],
    description: [
       'description long',
    ],
    profile_image: "/images/jbusecke_profile.webp",
    profile_image_alt: "Profile image of Julius Busecke",
    profile_image_blog: "/images/jbusecke_profile.webp",
    profile_image_blog_alt: "Profile image of Julius Busecke for the Blog post",
    years_experience: yearsElapsed,
}
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/julius-busecke",
  mastodon: "https://mastodon.social/@username",
  github: "https://github.com/jbusecke",
  vimeo: "TBD",
  youtube: "https://www.youtube.com/@codeandcurrents",
  instagram: "https://www.instagram.com/codeandcurrents/"
};
export const CONTACT = {
    name: "Julius Busecke",
    email: "contact@juliusbusecke.com" 
}
export const PAGE = {
    title: "Julius Busecke",
    description : "Page description",
    author: "Julius Busecke",
    sitename: "Site Name",
    ogimage: ABOUT_ME.profile_image,
    title_blog: "Julius Busecke's Blog",
    description_blog: "Welcome to my blog, where I share thoughts on climate science, software engineering, and open science.",
    ogimage_blog: "/images/imagedefault.webp",
    ogimage_blog_alt: "Julius Busecke's Blog Image",
}