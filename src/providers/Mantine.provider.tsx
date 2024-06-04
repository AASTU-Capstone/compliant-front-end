"use client";

import "@mantine/dates/styles.css";

import { generateColors } from "@mantine/colors-generator";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export default function Provider({ children }: { children: React.ReactNode }) {
  const theme: Partial<MantineThemeOverride> = baseTheme({
    primaryColor: "#0757da",
  });
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Notifications />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}

const baseTheme = ({
  primaryColor,
}: {
  primaryColor: string;
}): Partial<MantineThemeOverride> => {
  return {
    defaultRadius: "calc(var(--radius) - 2px)",
    primaryColor: "primary",
    primaryShade: 6,

    breakpoints: {
      xs: "36rem",
      sm: "48rem",
      md: "62rem",
      lg: "75rem",
      xl: "87.5rem",
    },

    colors: {
      primary: generateColors(primaryColor),
    },

    components: {
      Container: {
        defaultProps: {
          sizes: {
            xs: 540,
            sm: 720,
            md: 960,
            lg: 1140,
            xl: 1320,
          },
        },
      },
      Button: {
        defaultProps: {
          size: "sm",
        },
      },
      Card: {
        defaultProps: {
          radius: "md",
          withBorder: true,
        },
        styles: {
          root: {
            backgroundColor: "var(--primary-color-background)",
          },
        },
      },
      Paper: {
        defaultProps: {
          radius: "md",
          withBorder: true,
        },
      },
      Input: {
        defaultProps: {
          size: "sm",
        },
        styles: {
          input: {
            backgroundColor: "var(--primary-color-background)",
          },
        },
      },
      TextInput: {
        defaultProps: {
          size: "sm",
        },
      },
      NumberInput: {
        defaultProps: {
          size: "sm",
        },
      },
      Select: {
        defaultProps: {
          size: "sm",
        },
      },
      PasswordInput: {
        defaultProps: {
          size: "sm",
        },
      },
      Breadcrumbs: {
        styles: {
          breadcrumb: {
            fontSize: "14px",
          },
        },
      },
      AppShell: {
        styles: {
          main: {
            backgroundColor: "#F3F4F6",
          },
          header: {
            height: 40,
          },
        },
      },
    },
  };
};
