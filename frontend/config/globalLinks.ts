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
                        label: "Dashboard",
          icon: "i-heroicons-chart-bar",
          to: "/dashboard",
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
          icon: "i-heroicons-home",
          to: "/sprints",
        },
        
     
        {
          label: "Notes",
          icon: "i-heroicons-chart-bar",
          to: "/notes",
        },
        {
          label: "Events",
          icon: "i-heroicons-chart-bar",
          to: "/events",
        },
       
        {
          label: "Meetings",
          icon: "i-heroicons-chart-bar",
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
