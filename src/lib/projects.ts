import auctionHub from '../assets/auction_hub.png'
import tourEase from '../assets/tourease.png'
import bikeTracker from '../assets/biketracker.png'

export type Project = {
  slug: string
  title: string
  eyebrow: string
  description: string
  image: string
  technologies: string[]
  overview: string
  problem: string
  solution: string
  features: string[]
  github: string
}

export const projects: Project[] = [
  {
    slug: 'auction-hub',
    title: 'Auction Hub',
    eyebrow: 'Marketplace platform',
    description: 'An online auction platform with secure payments and real-time bidding.',
    image: auctionHub,
    technologies: ['Django', 'Razorpay', 'MySQL'],
    overview: 'A full-stack marketplace designed around clear buyer and seller journeys, secure payments, and time-sensitive bidding.',
    problem: 'Online auctions need trust, dependable payment handling, and a responsive experience when every second matters.',
    solution: 'Built a role-aware Django platform with robust transaction flows and background workflows for auction events.',
    features: ['Role-based dashboards', 'Secure payment flow', 'Timed bidding logic', 'Automated notifications'],
    github: 'https://github.com/abinr843/AUCTIONHUB',
  },
  {
    slug: 'tour-ease',
    title: 'TourEase',
    eyebrow: 'Travel booking product',
    description: 'A travel booking web application with a seamless user experience.',
    image: tourEase,
    technologies: ['Django', 'MySQL', 'Razorpay'],
    overview: 'A travel discovery and booking experience that brings vendors, administrators, and travellers into one straightforward system.',
    problem: 'Booking journeys often fall apart between discovery, vendor operations, and secure payment confirmation.',
    solution: 'Created a multi-role Django system with a considered booking flow, API-backed operations, and Razorpay integration.',
    features: ['Multi-role access', 'Tour discovery', 'Booking management', 'Payment webhooks'],
    github: 'https://github.com/abinr843/TourEase',
  },

  {
    slug: 'bike-tracker',
    title: 'BikeTracker',
    eyebrow: 'Mobile telemetry',
    description: 'Real-time bike tracking mobile app with battery telemetry.',
    image: bikeTracker,
    technologies: ['React Native', 'Firebase', 'GPS'],
    overview: 'A mobile companion for monitoring a bike’s position and battery telemetry in real time.',
    problem: 'Riders need one dependable mobile view of location, movement, and power without unnecessary complexity.',
    solution: 'Developed a React Native interface backed by real-time data services and a map-first tracking experience.',
    features: ['Live GPS map', 'Battery telemetry', 'Speed monitoring', 'Responsive mobile UI'],
    github: 'https://github.com/abinr843',
  },
]
