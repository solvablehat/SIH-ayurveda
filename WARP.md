# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

### Development Server
```bash
npm run dev          # Start development server on localhost:8080
npm run preview      # Preview production build locally
```

### Build & Deploy
```bash
npm run build        # Production build
npm run build:dev    # Development mode build
npm run lint         # Run ESLint for code quality
```

### Testing Development Flow
```bash
# Complete demo flow test:
# 1. Login with any credentials
# 2. Navigate to Dashboard → Patient List → Select patient → Assessment → Diet Plan Generator
# 3. Generate plan and view formatted diet chart
```

## Project Architecture

### Core Application Type
This is an **Ayurvedic Diet Management SPA** for healthcare practitioners. It's a React TypeScript application with Vite, using shadcn/ui components and Tailwind CSS for styling.

### Authentication System
- **Mock Authentication**: Uses `localStorage['ayur-token']` for session management
- **Route Protection**: `ProtectedRoute` and `PublicRoute` components in `src/components/ProtectedRoute.tsx`
- **Access Pattern**: All protected routes are wrapped in `WebsiteLayout` component

### Data Architecture
All data is currently **mock data** stored in `src/data/`:
- `patients.ts` - 25 demo patients with complete Ayurvedic profiles
- `foods.ts` - 25+ foods with dosha effects, nutritional values, Ayurvedic properties
- `assessment.ts` - Dosha assessment questionnaire and scoring logic

### Key Business Logic

#### Dosha Assessment System
- Multi-step questionnaire in `src/pages/DoshaAssessment.tsx`
- Calculates Vata/Pitta/Kapha percentages based on answers
- Results drive personalized diet recommendations

#### Diet Plan Generation Algorithm
Located in `src/pages/DietPlanGeneratorNew.tsx`:
1. **Input**: Patient's primary dosha + dietary preferences/restrictions
2. **Logic**: Filters foods where `doshaEffects[primaryDosha] >= 0.7`
3. **Output**: Structured meal plan with nutritional summary and Ayurvedic principles
4. **UX**: 2-second simulated "AI processing" delay for realistic feel

#### Food Database Structure
Each food item contains:
- `doshaEffects`: Compatibility scores (0-1) for each dosha
- `rasa`: Taste profile (Sweet, Sour, Salty, Pungent, Bitter, Astringent)
- `virya`: Heating/Cooling energy effect
- `vipaka`: Post-digestive effect
- `gunas`: Physical qualities (Light, Heavy, Dry, Oily, etc.)

### Critical Routes & Flow
```
/login → Authentication (any credentials work)
/ → Dashboard with stats and appointments
/patients → Patient list with search/filter
/patients/:id → Individual patient profile
/assessment/:patientId → Dosha assessment questionnaire
/diet-plan/generator → Primary diet plan creation interface
/diet-chart/:patientId/generated → Print-ready diet chart
```

### State Management
- Uses React local state and localStorage
- No global state management library (Zustand mentioned in docs but not implemented)
- Patient data flows through URL parameters and component props

### UI System
- **shadcn/ui components** with Radix primitives
- **Tailwind CSS** with custom Ayurvedic color palette
- **Custom fonts**: Poppins (sans-serif), Playfair Display (serif)
- **Theme**: Light mode with custom CSS variables for gradients and shadows
- **Icons**: Lucide React icon library

## Development Patterns

### Component Organization
```
src/components/ui/     # shadcn/ui reusable components
src/pages/            # Route-based page components  
src/data/             # Mock data and business logic
```

### Import Patterns
- Uses `@/` alias for src directory (configured in vite.config.ts)
- shadcn/ui components imported from `@/components/ui/`
- Data imports use relative paths to `../data/`

### Key Files to Understand
- `src/App.tsx` - Main routing configuration with nested protected routes
- `src/pages/DietPlanGeneratorNew.tsx` - Core diet generation logic
- `src/data/foods.ts` - Ayurvedic food database with scoring system
- `src/components/ui/website-layout.tsx` - Main app shell with navigation

### Development Notes
- This is a **demo/prototype** application with realistic mock data
- All API calls are simulated with setTimeout delays
- Print functionality uses `window.print()` for PDF generation
- Mobile-responsive design with touch-friendly interfaces

### Future Backend Integration Points
When connecting to real APIs, focus on:
- `src/data/` files will become API service calls
- Authentication flow needs real JWT token handling
- Diet plan generation should preserve the dosha compatibility logic
- Patient data will need proper CRUD operations
- Generated diet charts should integrate with PDF generation service

### Performance Considerations
- Uses Vite with SWC for fast development builds
- Images and assets should be optimized for production
- Consider lazy loading for patient list and food database
- Diet generation algorithm may need optimization for larger datasets

## Troubleshooting Common Issues

### Build Issues
- Ensure all TypeScript types are properly defined
- Check that all imports resolve correctly with the `@/` alias
- Verify all dependencies are installed: `npm install`

### Authentication Issues
- Mock auth always succeeds - check localStorage for 'ayur-token'
- Protected routes redirect to /login when token is missing
- Clear localStorage to reset authentication state

### Data Display Issues
- Patient and food data comes from hardcoded arrays in `src/data/`
- Check browser console for any data filtering or mapping errors
- Verify dosha calculations are returning valid percentage values
