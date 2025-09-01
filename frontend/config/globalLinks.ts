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
        label: "Sign In",
        icon: "i-heroicons-user-solid",
        to: "/login",
      },
        {
        label: "Log out",
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
           {
        label: "Log out",
        icon: "i-heroicons-user-solid",
        to: "/",
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
          label: "Sprints",
          icon: "heroicons:chevron-double-right-solid",
          to: "/sprints",
        },

           {
        label: "Story",
        icon: "i-heroicons-puzzle-piece",
        to: "/story",
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
          label: "Standup",
          icon: "heroicons-user-group-solid",
          to: "/standup",
        },
          {
          label: "Time off",
          icon: "heroicons-clock-16-solid",
          to: "/timeoff",
        },
          {
          label: "Dashboard",
          icon: "i-heroicons-chart-bar",
          to: "/dashboard",
        },
        
      ],
    ],
  },

};
