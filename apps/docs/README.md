# Next.js Boilerplate

A modern, production-ready Next.js boilerplate with opinionated project structure and best-in-class tools for building scalable web applications.

## 🚀 What's Included

This boilerplate gives you everything you need to start building immediately:

- **🏗️ Opinionated Project Structure** - Scalable monorepo setup with pnpm workspaces and Turborepo
- **🎯 Accessibility-First Components** - React Aria-based components instead of Radix UI for better UX
- **🔄 State Management** - TanStack Query for powerful async state management
- **📝 Form Handling** - React Hook Form + Zod validation with TypeScript integration
- **🎨 Styling** - Tailwind CSS with custom design system and dark mode support
- **📚 Comprehensive Examples** - Form patterns, data fetching strategies, error handling, and loading states

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with custom design system
- **Components**: React Aria-based UI components
- **Forms**: React Hook Form + Zod validation
- **Data**: TanStack Query for server state
- **Build**: Turborepo for monorepo management
- **Package Manager**: pnpm for fast, efficient dependency management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hoanggd/base-stack
   cd base-stack
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
base-stack/
├── apps/
│   ├── docs/          # Documentation site
│   └── web/           # Main web application
├── packages/
│   ├── ui/            # Shared UI components
│   ├── eslint-config/ # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── turbo.json          # Turborepo configuration
└── pnpm-workspace.yaml # pnpm workspace configuration
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm clean` - Clean build artifacts

## 📖 Documentation

- **Introduction**: [Getting Started Guide](/docs/getting-started/introduction)
- **Components**: [UI Component Library](/docs/ui)
- **Examples**: [Form Management](/docs/form-examples), [Data Fetching](/docs)

## 🎯 Key Features

### Monorepo Architecture
- Manage multiple apps and packages in a single repository
- Shared dependencies and configurations
- Fast builds with Turborepo

### Accessibility First
- React Aria components for superior accessibility
- Enhanced calendar, date picker, and pagination
- WCAG 2.1 AA compliance out of the box

### Modern Development Patterns
- TypeScript-first with comprehensive type definitions
- Optimized for Next.js 15+ and modern bundlers
- Zero runtime overhead with tree-shaking support

### Production Ready
- Battle-tested patterns and examples
- Comprehensive error handling and loading states
- Performance optimization techniques

## 🤝 Contributing

We welcome contributions! This boilerplate is built with the community in mind. Please see our contributing guidelines for more information.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with ❤️ using Next.js, React Aria, TanStack Query, and modern web standards.

---

**Ready to build something amazing?** Start with this boilerplate and focus on what matters most - your application logic, not tool configuration.
