import axios from 'axios';



 export default axios.create({
     baseURL: 'https://api.yelp.com/v3/businesses',
     headers: {
         Authorization: 'Bearer PRe0IrSTXYA3hmF04xyZQMX_LvHD2bbAFb0gEuhoKs4aixsB9SUcfD5p0a9b1puS9tpT3QdR4oS05-TtkLQtG_PyfwDvWTVQVY-v7BrKyGhKgXvBjY-EHJ8PcGlAXnYx'
     }
 });