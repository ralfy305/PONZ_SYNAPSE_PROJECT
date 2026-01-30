# Synapse - Relationship Intelligence Platform

## Overview

Synapse is a relationship intelligence application designed for couples to complete comprehensive quizzes that assess compatibility, communication styles, and relationship dynamics. The platform features a multi-module quiz system with various question types (MCQ, scale, ranking, text), partner linking via invite codes, and a dashboard for tracking progress. The system is built with a focus on ethical data handling, privacy, and non-coercive design principles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend uses a dark "neural network" themed design with custom CSS variables for brand colors (synapse-red, synapse-blue, synapse-sage). Typography uses Space Grotesk for display text and Inter for body text.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON APIs under `/api/*` prefix
- **Authentication**: Replit Auth (OpenID Connect)
- **Development**: tsx for TypeScript execution, Vite dev server with HMR proxy

The server handles quiz response persistence, user management, and couple pairing logic. Routes are registered in a centralized router with middleware for logging and error handling.

### Authentication
- **Provider**: Replit Auth via OpenID Connect
- **Supports**: Google, GitHub, X, Apple, and email/password login
- **Session Storage**: PostgreSQL via connect-pg-simple
- **Auth Routes**:
  - `/api/login` - Initiates login flow
  - `/api/logout` - Logs out user
  - `/api/callback` - OIDC callback handler
  - `/api/auth/user` - Returns current authenticated user
- **Frontend Hook**: `useAuth()` from `@/hooks/use-auth.ts`

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit with `drizzle-kit push` for schema sync
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod

Key entities:
- `users`: Individual user accounts with optional couple association
- `couples`: Partner pairing with invite codes and status tracking
- `quizResponses`: Quiz answers stored as JSONB with module/question references

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/ui/   # shadcn/ui components
│   ├── pages/           # Route components
│   ├── data/            # Quiz question definitions
│   └── hooks/           # Custom React hooks
├── server/              # Express backend
│   ├── routes.ts        # API endpoint definitions
│   ├── storage.ts       # Database access layer
│   └── db.ts            # Database connection
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle schema definitions
└── migrations/          # Database migrations
```

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: Session storage in PostgreSQL

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Production server bundling
- **tsx**: TypeScript execution for development

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator