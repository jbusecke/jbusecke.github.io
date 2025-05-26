export interface Language {
  name: string;
  iconName: string;
  className?: string;
  category?: string;
}

  // astro: {
  //   name: "Astro",
  //   iconName: "astro",
  //   category: "Programming & DevOps",
  // },

  // xdggs: {
  //   name: "xDGGS",
  //   iconName: "xdggs",
  //   category: "Data Analytics & Visualization",
  // },


  // html: {
  //   name: "HTML 5",
  //   iconName: "html",
  //   category: "Programming & DevOps",
  // },


export const languages: Record<string, Language> = {

  markdown: {
    name: "Markdown",
    iconName: "markdown",
    category: "Documentation & Publishing",
  },
  git: {
    name: "Git",
    iconName: "git",
    category: "Programming & DevOps",
  },
  python: {
    name: "Python",
    iconName: "python",
    category: "Programming & DevOps",
  },
  xarray: {
    name: "Xarray",
    iconName: "xarray",
    category: "Data Analytics & Visualization",
  },
  docker: {
    name: "Docker",
    iconName: "docker",
    category: "Programming & DevOps",
  },
  dataflow: {
    name: "Google Dataflow",
    iconName: "dataflow",
    category: "Cloud & Data Platforms",
  },
  physics:
  {
    name: "Physics",
    iconName: "science",
    category: "Science",
  },
  simulations: {
    name: "Numerical Simulations",
    iconName: "science",
    category: "Science",
  },
  climate: {
    name: "Climate Science",
    iconName: "science",
    category: "Science",
  },
  jupyter: {
    name: "Jupyter",
    iconName: "jupyter",
    category: "Data Analytics & Visualization",
  },
  zarr: {
    name: "Zarr",
    iconName: "zarr",
    category: "Data Analytics & Visualization",
  },
  netcdf: {
    name: "NetCDF",
    iconName: "science",
    category: "Data Analytics & Visualization",
  },
  dask: {
    name: "Dask",
    iconName: "dask",
    category: "Data Analytics & Visualization",
  },
  pandas: {
    name: "Pandas",
    iconName: "science",
    category: "Data Analytics & Visualization",
  },
  numpy: {
    name: "NumPy",
    iconName: "science",
    category: "Data Analytics & Visualization",
  },
  matplotlib: {
    name: "Matplotlib",
    iconName: "matplotlib",
    category: "Data Analytics & Visualization",
  },


};

export const getLanguage = (lang: string): Language => {
  return languages[lang] || languages.html;
}; 