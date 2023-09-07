# Go House Call
Marketplace to connect patients and caregivers for home care services.

## Stack
- TypeScript
- Next.js React build
- Hosted on Vercel
- Node.js with TRPC APIs 
- Google Maps APIs 
- AWS S3 for image storage
- Tailwind CSS for styling
- MySQL db hosted by planetscale
- Live messaging with Pusher websockets
- Login with Google OAuth or credentials with bcrypt hashing

## Features
App 
- [x] Create account 
- [x] Login with credentials 
- [x] Login with Google OAuth
- [x] Messages page
- [x] Settings page
- [x] Care sessions page
- [x] Dashboard page
- [x] Landing pages explaining the app
- [x] Contact us page
- [x] About us page
- [x] Privacy policy page
- [x] Terms of service page
- [x] Login / logout on header 

Patients
- [x] Create & update profile
- [x] Upload profile picture (AWS S3)
- [x] Create care sessions
- [x] Use Google Maps API to get address
- [x] Accept caregivers
- [x] Message caregivers
- [ ] Set care sessions as complete
- [ ] Pay caregivers
- [ ] Rate caregivers

Caregivers
- [x] Create account
- [x] Create & update profile
- [x] Upload profile picture (AWS S3)
- [x] Search through patient created care sessions
- [x] Apply to care sessions
- [x] View patient profile
- [x] Message patients
- [ ] Set care sessions as complete
- [ ] Receive payments
- [ ] Receive ratings