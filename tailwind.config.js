import { Button } from "antd";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navbar: "#E6E2DF",
        violet: "#8280ff",
        plainviolet: "#e4e4ff",
        tableheadgray: "#f4f4f4",
        white: "#fff",
        graybutton: "#777777",
        plaingraybutton: "#e7e7e7",
        deletebutton: "#ff4444",
        cardbordergray: "#D9D9D9",
        plaingreen: "#DEF7E7",
        positivegreen: "#00B69B",
        secondarytext: "#ACACAC",
        secondarytextval: "#202224",
        secondarytextgray: "#606060",
        signintext: "#626476",
        warnyellow: "#FEC53D",
        plainyellow: "#FFF3D6",
        deletered: "#ED1C24",
        plainred: "#F8D3D3",
        cagViolet: "#8280FF",
        cagActiveViolet: "#8280FF",
        sidebarBlack: "#0E1015",
        sidebarText: "white",
      },
    },
    corePlugins: {
      preflight: false, // If you set false for Ant Design CSS, it will not be overridden by Tailwind CSS.
    },
  },
  plugins: [],
};
