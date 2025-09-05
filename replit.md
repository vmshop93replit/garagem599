# Garagem 599 - Premium Automotive Services Landing Page

## Overview

Garagem 599 is a premium automotive services landing page built for a specialized automotive aesthetic company. The application is designed as a conversion-focused website that allows customers to book services directly through WhatsApp integration, without requiring a traditional backend or database system.

The project showcases automotive services including car detailing, vitrification, auto electrical work, sound systems, and window tinting (insulfilm). The design emphasizes a premium, modern aesthetic with dark themes and blue accents that reflect the sophisticated garage environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application is built using a modern React-based stack with TypeScript for type safety. The frontend uses Vite as the build tool and development server, providing fast hot module replacement and optimized production builds. The routing is handled by Wouter, a lightweight alternative to React Router.

The UI framework is based on shadcn/ui components built on top of Radix UI primitives, providing accessible and customizable components. Styling is implemented using Tailwind CSS with a custom dark theme that reflects the premium garage aesthetic - dark grays, vibrant blues, and clean whites.

Animation and interactivity are handled by Framer Motion, providing smooth transitions and micro-interactions throughout the user experience. The design system uses CSS variables for theming, allowing for consistent color management across the application.

### Component Structure
The application follows a modular component architecture with clear separation of concerns:

- **Layout Components**: Navigation, Footer, and main page structure
- **Section Components**: Hero, Services, Gallery, Testimonials, and How It Works sections
- **Interactive Components**: Booking modal with form validation and WhatsApp integration
- **UI Components**: Reusable shadcn/ui components for buttons, forms, dialogs, and other interface elements

### State Management
State management is kept simple using React's built-in hooks (useState, useEffect) for local component state. Complex forms use React Hook Form with Zod schema validation for type-safe form handling. TanStack Query is included for potential future API integration, though currently not actively used since the app operates without a backend.

### Booking System
The booking system is designed around WhatsApp integration rather than traditional form submission. Users select services, fill out booking forms, and the data is formatted into WhatsApp messages that open the user's WhatsApp application with pre-filled messages to the business number.

Local storage is used for managing booking slots and preventing double-bookings, with time slot generation based on service duration and working hours. Form validation ensures all required fields are completed before generating the WhatsApp message.

### Responsive Design
The application implements a mobile-first responsive design approach using Tailwind CSS breakpoints. Custom hooks like `useIsMobile` provide JavaScript-based responsive behavior for components that need different logic across screen sizes.

### Backend Architecture
The backend is built with Express.js using TypeScript and follows a minimal API structure. Currently, the server primarily serves the static frontend files and provides a foundation for future API endpoints.

The server implementation includes middleware for request logging, error handling, and development-specific features like Vite integration for hot module replacement during development.

### Data Storage Design
The application includes Drizzle ORM setup with PostgreSQL configuration, though it's not actively used in the current implementation. The storage interface is abstracted with both in-memory and potential database implementations, allowing for easy scaling when backend functionality is needed.

Schema definitions use Drizzle with Zod integration for type-safe database operations when the backend functionality is implemented.

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend framework for building the user interface
- **TypeScript**: Provides static typing for both frontend and backend code
- **Vite**: Build tool and development server with fast HMR
- **Express.js**: Backend server framework
- **Wouter**: Lightweight routing solution for React

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and functionality
- **Framer Motion**: Animation library for smooth transitions and micro-interactions
- **Lucide React**: Icon library providing consistent iconography

### Form Management and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library for type-safe data validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Database and ORM
- **Drizzle ORM**: Type-safe ORM for database operations
- **@neondatabase/serverless**: PostgreSQL database adapter for serverless environments
- **Drizzle Kit**: Database migration and development tools

### Development and Build Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing tool for Tailwind CSS
- **tsx**: TypeScript execution environment for development

### Additional Utilities
- **date-fns**: Date manipulation and formatting library
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Utility for conditional CSS class names
- **nanoid**: ID generation utility for unique identifiers

The application is designed to work without external API dependencies in its current state, relying on WhatsApp's URL scheme for booking functionality and local storage for basic data persistence.