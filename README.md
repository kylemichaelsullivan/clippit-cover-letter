# Clippit

A Next.js application that generates tailored cover letters and resumes using AI assistance.

## Features

- 🤖 AI-powered document generation
- 🎯 Template-based document generation with {{mustache values}} and <%=ERB instructions%> for AI enhancement
- 📋 Multi-phase form workflow (React Hook Form)
- 🎨 Modern, responsive UI (Tailwind CSS v4)
- 🔒 Secure API key management
- 🌙 Light/Dark mode toggle
- 🔧 Comprehensive feature flag system
- 🐛 Development debugging tools

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd clippit-cover-letter
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
# Copy the sample environment file
cp .env.sample .env.local

# Edit .env.local and add your OpenAI API key
# Replace 'your-api-key-here' with your actual OpenAI API key
```

### Environment Variables

Copy `.env.sample` to `.env.local` and update the values:

```bash
cp .env.sample .env.local
```

Then edit `.env.local` and replace `your-api-key-here` with your actual OpenAI API key. All other variables have sensible defaults and are optional.

**Required:**

- `OPENAI_API_KEY` - Your OpenAI API key (get one from https://platform.openai.com/api-keys)

**Optional:** See `.env.sample` for all available configuration options.

**Important**: Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

### Running the Development Server

#### Fast Development (Recommended)

Uses Turbopack for faster builds and hot reloading:

```bash
bun dev
```

#### Standard Development

Uses Webpack (slower but more stable):

```bash
bun dev:webpack
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Enter Candidate Details**: Fill in your personal information
2. **Add Templates**: Provide your resume and cover letter templates with {{mustache values}} and <%=ERB instructions%>
3. **Enter Job Details**: Fill in the company name, position, and other relevant information
4. **Generate Documents**: Click generate to create personalized documents (AI-enhanced when available)
5. **Preview and Edit**: Review the generated content and make any adjustments
6. **Export**: Copy or download your final documents

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom class ordering
- **Language**: TypeScript
- **AI**: OpenAI GPT API
- **Package Manager**: Bun
- **Form Handling**: TanStack Form with Zod validation and proper TypeScript typing
- **Markdown**: React Markdown
- **Theme**: Custom light/dark mode implementation

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components by function
│   │   ├── buttons/      # Button components
│   │   ├── display/      # Display and preview components
│   │   ├── feedback/     # Status and feedback components
│   │   ├── input/        # Input components
│   │   ├── navigation/   # Navigation components
│   │   ├── debug/        # Development debugging components

│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   ├── utils/            # Utility components
│   └── features/         # Feature-based components
├── config/               # Configuration files
│   ├── ai.ts            # AI configuration and validation
│   ├── constants.ts     # Application constants
│   ├── features.ts      # Feature flag system
│   └── env.ts           # Environment variable handling
├── contexts/            # React contexts
│   └── AppContext.tsx   # Main application context
├── lib/                 # Utility functions and hooks
│   ├── hooks.ts         # Custom React hooks
│   └── openai.ts        # OpenAI API integration
└── types/               # TypeScript type definitions
```

## Key Features

### AI Integration

Secure and configurable AI integration with:

- API key validation and security
- Rate limiting and error handling
- Configurable models and parameters
- Safe logging practices
- Template enhancement capabilities

### Template-based Document Generation

Advanced template system with:

- Mustache-style placeholder replacement (`{{variable}}`) and ERB-style AI instructions (`<%=instruction%>`)
- AI enhancement when available
- Direct template rendering as fallback
- Template validation and error handling

### Multi-phase Form Workflow

Comprehensive form management with:

- TanStack Form integration
- Zod schema validation for all forms with form-specific types
- Multi-step form progression with type-safe form sections
- Form validation and error handling with detailed error logging
- State persistence across steps with proper type inference

### Modern, Responsive UI

Professional user interface featuring:

- Tailwind CSS v4 styling
- Responsive design for all devices
- Modern component architecture
- Consistent design system

### Secure API Key Management

Enterprise-grade security with:

- Environment variable protection
- Client-side key validation
- Secure API communication
- No key exposure in client code

### Light/Dark Mode Toggle

Accessible theme system with:

- Hydration-safe implementation
- Browser extension interference handling
- Accessible theme toggle
- CSS custom properties

### Feature Flag System

A robust feature flag system allows fine-grained control over functionality:

- Environment variable-based configuration
- Runtime feature checking
- Development debugging tools
- Performance optimization options

### Development Debugging Tools

Comprehensive debugging support including:

- Development mode indicators
- Error boundary implementation
- Performance monitoring tools

### Theme System

Hydration-safe theme implementation with:

- Consistent server/client rendering
- Browser extension interference handling
- Accessible theme toggle
- CSS custom properties

## Documentation

- [AI Configuration Guide](./documentation/AI-CONFIGURATION.md)
- [Template Syntax Guide](./documentation/TEMPLATE_SYNTAX.md)
- [Hydration Error Handling Guide](./documentation/HYDRATION_GUIDE.md)
- [Components Documentation](./documentation/COMPONENTS.md)
- [State Management Guide](./documentation/STATE_MANAGEMENT.md)
- [Classname Optimization Guide](./documentation/CLASSNAME_OPTIMIZATION.md)

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Form Documentation](https://tanstack.com/form/latest)
- [Zod Documentation](https://zod.dev/)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Remember to set your environment variables in your deployment platform's settings.

## License

This project is open source and available under the [MIT License](LICENSE).
