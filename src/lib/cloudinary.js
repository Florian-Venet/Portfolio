// src/lib/cloudinary.js
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: "di0mcchgn", // remplace ici
  },
});

export default cld;