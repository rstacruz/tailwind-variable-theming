const { createTheme } = require('./index')

test('basic', () => {
  const theme = createTheme({
    colors: {
      base: {
        body: '#333',
        bg: '#fafafa',
        bold: '#111',
      },
    },
  })

  expect(theme.config).toMatchInlineSnapshot(`
    Object {
      "colors": Object {
        "base": Object {
          "bg": "var(--base-bg)",
          "body": "var(--base-body)",
          "bold": "var(--base-bold)",
        },
      },
    }
  `)

  expect(theme.vars).toMatchInlineSnapshot(`
    Object {
      "--base-bg": "#fafafa",
      "--base-body": "#333",
      "--base-bold": "#111",
    }
  `)
})

test('duplicate leaves', () => {
  const theme = createTheme({
    colors: {
      base: {
        body: '#333',
        bg: '#fafafa',
        bold: '#111',
      },
      panel: {
        body: '#888',
        bg: '#eee',
        bold: '#000',
      },
    },
  })

  expect(theme.config).toMatchInlineSnapshot(`
    Object {
      "colors": Object {
        "base": Object {
          "bg": "var(--base-bg)",
          "body": "var(--base-body)",
          "bold": "var(--base-bold)",
        },
        "panel": Object {
          "bg": "var(--panel-bg)",
          "body": "var(--panel-body)",
          "bold": "var(--panel-bold)",
        },
      },
    }
  `)
  expect(theme.vars).toMatchInlineSnapshot(`
    Object {
      "--base-bg": "#fafafa",
      "--base-body": "#333",
      "--base-bold": "#111",
      "--panel-bg": "#eee",
      "--panel-body": "#888",
      "--panel-bold": "#000",
    }
  `)
})
