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
        icon: "i-heroicons-home",
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
        icon: "i-heroicons-home",
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
         
          to: "/avatar",
          
        },
        
      ],
     
      [
     
        {
          label: "Sprints",
          icon: "i-heroicons-home",
          to: "/",
        },
        {
          label: "Goals",
          icon: "i-heroicons-chart-bar",
          to: "/",
        },
        {
          label: "My Deployments",
          icon: "i-heroicons-chart-bar",
          to: "/",
        },
        {
          label: "Reports",
          icon: "i-heroicons-chart-bar",
          to: "/",
        },
       
        {
          label: "Calendar",
          icon: "i-heroicons-chart-bar",
          to: "/",
        },
     
        {
          label: "Dashboard",
          icon: "i-heroicons-chart-bar",
          to: "/dashboard",
        },
        
      ],
    ],
  }

   

};
