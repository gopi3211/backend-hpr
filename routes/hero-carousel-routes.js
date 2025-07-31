const express = require('express');
const router = express.Router();

const {
  fetchHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} = require('../controllers/hero-carousel-controller');

console.log('[ROUTES] hero-carousel-routes.js loaded');

// @GET    /api/hero-carousel
router.get('/', fetchHeroSlides);

// @POST   /api/hero-carousel
router.post('/', createHeroSlide);

// @PUT    /api/hero-carousel/:id
router.put('/:id', updateHeroSlide);

// @DELETE /api/hero-carousel/:id
router.delete('/:id', deleteHeroSlide);

module.exports = router;
