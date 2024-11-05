# Creating a New Component in React with TypeScript

This guide shows the steps to create a new component in React using TypeScript (`.tsx` files). We will cover creating a basic component without props and with props.

---

## 1. Setting Up the Component File
- **Location**: Create new components in the `src/components` folder.
- **Naming**: Use PascalCase for the file name, e.g., `MyComponent.tsx`.
- **File Extension**: Use `.tsx` to enable TypeScript support.

---

## 2. Quick Start with "rsc" Shortcut
If you are using WebStorm, type `"rsc"` and press **Tab** to automatically generate a basic React functional component.

---

## 3. Component Examples

### A. Basic Component without Props
To create a simple component that does not require props, start with this structure:

```typescript
import React from 'react';

const MyComponent = () => {
  return (
    <div>
      {/* Component content */}
      <p>Hello, World!</p>
    </div>
  );
};

export default MyComponent;
```

### B. Component with Props and an Interface
If you need to pass props to a component, it is recommended to create an interface that describes the types of these props:

1. **Define the Interface**: Describe the props the component will receive.
2. **Use the Interface in the Component**: This makes the component type-safe and easy to understand.

```
import React from 'react';

// Define the interface for the component props
interface MyComponentProps {
  title: string;
  count: number;
}

const MyComponent = ({ title, count }: MyComponentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
    </div>
  );
};

export default MyComponent;
```

**Explanation:**
- `title`: A string that is displayed as the heading.
- `count`: A number that displays the count value.

### C. Example Usage of the Component
After creating your component, you can import and use it in other files like this:

```
import MyComponent from './components/MyComponent';

const App: React.FC = () => {
  return (
    <div>
      <MyComponent title="Hello, World!" count={42} />
    </div>
  );
};

export default App;
```

In this example, we pass the string "Hello, World!" as `title` and the number `42` as `count` to `MyComponent`.

---

## Summary
By following these steps, you can create modular and reusable components with or without props. Using TypeScript interfaces keeps your components type-safe, making your code easier to maintain and debug.
