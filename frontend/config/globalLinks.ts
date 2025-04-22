export const CONFIG = {
 

 horizontal: {
  default:[
    [
      {
        label: "Ev App",
        icon: "i-heroicons-light-bulb",
        to: "/",
      },
    ],
    [
      {
        label: "Stories",
        icon: "i-heroicons-puzzle-piece",
        to: "/stories",
      },
      {
        label: "Todos",
        icon: "i-heroicons-chart-bar",
        to: "/todos",
      },
   
      {
        label: "Sign In",
        icon: "i-heroicons-user-solid",
        to: "/login",
      },
    ],
  ],
  storyLinks: [
    [
      {
        label: "Ev App",
        icon: "i-heroicons-light-bulb",
        to: "/",
      },
    ],
    [
      {
        label: "Stories",
        icon: "i-heroicons-puzzle-piece",
        to: "/stories",
      },      
      {
        label: "Config",
        icon: "heroicons:cog-8-tooth-20-solid",
        to: "/config",
      },
    
    
      {
        label: "Sign In",
        icon: "i-heroicons-user-solid",
        to: "/login",
      },
    ],
  ],
 footer: [
  
    [
      {
        label: "Stories",
        icon: "i-heroicons-puzzle-piece",
        to: "/stories",
      },      
      {
        label: "Config",
        icon: "heroicons:cog-8-tooth-20-solid",
        to: "/config",
      },
    
      {
        label: "Sign In",
        icon: "i-heroicons-user-solid",
        to: "/login",
      },
    ],
  ],

 },

 // vertical Links options

  vertical: {

    default:  [
      [
        {
          label: "",
          // icon: "i-heroicons-light-bulb",
          avatar: {
            srcset: 'https://ipx.nuxt.com/s_32x32/gh_avatar/benjamincanac 2x',
            alt: 'Sergio Terrero',
            size: 'md'
          },
         
          to: "/",
          
        },
        
      ],
     
      [
     
        {
          label: "Sprints",
          icon: "heroicons:chevron-double-right-solid",
          to: "/sprints",
        },
        
     
        {
          label: "Notes",
          icon: "heroicons:book-open-16-solid",
          to: "/notes",
        },
        {
          label: "Events",
          icon: "heroicons:calendar-date-range-20-solid",
          to: "/events",
        },
       
        {
          label: "Meetings",
          icon: "heroicons:calendar-date-range-solid",
          to: "/meetings",
        },
      
    
        {
          label: "Dashboard",
          icon: "i-heroicons-chart-bar",
          to: "/dashboard",
        },
        
      ],
    ],
  },


  reporters : ["Sergio Terrero", "Pedro Martinez", "Eugenia Derbez", "Jackie Perex", "Pamela Alvarez"],
  difficultyLevels : ["Low", "Medium", "High", "Critical"],

};
