import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#26A69A",
        secondary: "#80CBC4",
        accent: "#EF5350",
        error: "#D50000",
        warning: "#FFC107",
        info: "#2979FF",
        success: "#1B5E20"
      },
      dark: {
        primary: "#26A69A",
        secondary: "#80CBC4",
        accent: "#EF5350",
        error: "#D50000",
        warning: "#FFC107",
        info: "#2979FF",
        success: "#1B5E20"
      }
    }
  }
});
