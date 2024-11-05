# Project File Structure Guide

This guide provides an overview of where to store each type of file in your React project. We'll cover the purpose and recommended contents of the `pages`, `components`, and `layout` folders to help maintain a clean, organized project structure.

---

## 1. Pages (`src/pages`)

The `pages` folder contains all of the main pages of your application. These are typically components that represent full screens or major sections that are linked directly through routing.

- **Purpose**: Each file in the `pages` folder should represent a distinct route or view of your application.
- **Examples**:
    - `Home.tsx`: The main landing page.
    - `AboutPage.tsx`: An about page that describes your application.
    - `ContactPage.tsx`: A page for user inquiries and contact forms.

### Structure Example:
```
src/
  pages/
    Home.tsx
    AboutPage.tsx
    ContactPage.tsx
```

---

## 2. Components (`src/components`)

The `components` folder is used to store reusable, modular components. These components are usually smaller building blocks that can be used across multiple pages or layouts.

- **Purpose**: Create reusable UI elements that can be shared throughout the application.
- **Examples**:
    - `Button.tsx`: A button component that can be used across different parts of the application.
    - `Card.tsx`: A reusable card component to display information.
    - `FormInput.tsx`: A reusable form input component for different forms.

### Structure Example:
``` 
src/
  components/
    Button.tsx
    Card.tsx
    FormInput.tsx
```

---

## 3. Layout (`src/layout`)

The `layout` folder contains layout components that define the structure of your pages. These components typically include headers, footers, sidebars, and general structure to be shared among multiple pages.

- **Purpose**: Provide a consistent structure for the pages of your application by including shared elements like navigation menus and footers.
- **Examples**:
    - `MainLayout.tsx`: A layout that includes the header, footer, and common structure for most pages.
    - `AdminLayout.tsx`: A special layout for admin-related pages, which might include side navigation.

### Structure Example:
``` 
src/
  layout/
    MainLayout.tsx
    AdminLayout.tsx
```

---

## Summary
By organizing your files into `pages`, `components`, and `layout`, you can keep your React project maintainable and easy to navigate. Use the `pages` folder for full views, `components` for reusable elements, and `layout` for shared page structures.

- **Pages**: Main screens linked via routing.
- **Components**: Reusable UI pieces used across multiple parts of the application.
- **Layout**: Page-level structure components, including navigation and footers.
