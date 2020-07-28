# @rstacruz/tailwind-variable-theming

Small utility to define multiple themes using CSS variables

> NB: This is an experimental micro-utility.

## Usage

Define a theme using `createTheme` _(1)_, then inject the config it generates into your project's Tailwind config _(2)_.

```js
// tailwind.config.js
const { createTheme } = require('@rstacruz/tailwind-variable-theming')
const { colors } = require('tailwindcss/defaultTheme')

// Define a theme [1]
const theme = createTheme({
  name: 'default',
  colors: {
    base: {
      bodyBg: colors.white,
      bodyText: colors.gray['900'],
    },
    input: {
      baseBg: colors.gray['100'],
      baseText: colors.gray['900'],
    },
  },
})

// Include the variables and the plugin to your Tailwind config [1]
module.exports = {
  theme: {
    extend: {
      colors: {
        ...theme.config.colors,
      },
    },
  },
  variants: {},
  plugins: [theme.plugin],
}
```

The plugin creates a utility which can be loaded onto `:root`.

```css
:root {
  @apply theme-default;
}
```

## Result

The config object (`theme.config.colors`) will define colors as CSS variables. This follows what Tailwind would recommend for switching themes ([docs](https://tailwindcss.com/docs/customizing-colors/#naming-your-colors)).

<table>
<tr>
<th>Input</th>
<th>Output</th>
</tr>

<tr>
<td>

```css
.box {
  background: theme('colors.base.bodyBg');
}
```

</td>
<td>

```css
.box {
  background: var(--base-body-bg);
}
```

</td>
</tr>

<tr>
<td>

```css
.paragraph {
  @apply text-base-bodyBg;
}
```

</td>
<td>

```css
.paragraph {
  color: var(--base-body-bg);
}
```

</td>
</tr>
</table>

The plugin (`theme.plugin`) will create a utility to define those variables, which can be used in `:root` via _@apply_.

<table>
<tr>
<th>Input</th>
<th>Output</th>
</tr>

<tr>
<td>

```css
:root {
  @apply theme-default;
}
```

</td>
<td>

```css
:root {
  --base-body-bg: #fff;
  --base-body-text: #1a202c;
  --input-body-bg: #f7fafc;
  --input-body-text: #1a202c;
}
```

</td>
</tr>
</table>

## Examples

<details>
<summary>Creating a dark theme</summary>

Two themes can be defined for `default` and `dark` themes.

```js
// Define themes
const defaultTheme = createTheme({
  name: 'default',
  colors: {
    /*...*/
  },
})

const darkTheme = createTheme({
  name: 'dark',
  colors: {
    /*...*/
  },
})

// Include the variables and the plugin to your Tailwind config
module.exports = {
  theme: {
    extend: {
      colors: {
        // Only one will be needed here
        ...defaultTheme.config.colors,
      },
    },
  },
  variants: {},
  plugins: [defaultTheme.plugin, darkTheme.plugin],
}
```

CSS media queries can be used to define an alternate theme.

```css
:root {
  @apply theme-default;

  @media (prefers-color-scheme: dark) {
    @apply theme-dark;
  }
}
```

</details>

## Thanks

MIT
