import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
    fonts: {
        heading: "'Segoe UI', 'Inter', sans-serif",
        body: "'Segoe UI', 'Inter', sans-serif",
    },
    colors: {
        whatsapp: {
            50: "#e6faf0",
            100: "#b3f0d4",
            200: "#80e6b8",
            300: "#4ddc9c",
            400: "#25D366",
            500: "#128C7E",
            600: "#075E54",
            700: "#054D44",
            800: "#033D35",
            900: "#022D27",
        },
        brand: {
            50: "#e6faf0",
            100: "#b3f0d4",
            200: "#80e6b8",
            300: "#4ddc9c",
            400: "#25D366",
            500: "#128C7E",
            600: "#075E54",
            700: "#054D44",
            800: "#033D35",
            900: "#022D27",
        },
    },
    styles: {
        global: {
            body: {
                bg: "#0B141A",
                color: "#E9EDEF",
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: "500",
                borderRadius: "8px",
                transition: "all 0.2s ease",
            },
            variants: {
                solid: {
                    bg: "#25D366",
                    color: "white",
                    _hover: {
                        bg: "#128C7E",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)",
                    },
                    _active: {
                        bg: "#075E54",
                        transform: "translateY(0)",
                    },
                },
                ghost: {
                    color: "#8696A0",
                    _hover: {
                        bg: "rgba(37, 211, 102, 0.1)",
                        color: "#25D366",
                    },
                },
                outline: {
                    borderColor: "rgba(37, 211, 102, 0.3)",
                    color: "#25D366",
                    _hover: {
                        bg: "rgba(37, 211, 102, 0.1)",
                        borderColor: "rgba(37, 211, 102, 0.5)",
                    },
                },
                whatsapp: {
                    bg: "#25D366",
                    color: "white",
                    fontWeight: "600",
                    _hover: {
                        bg: "#20c05c",
                        boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
                    },
                    _active: {
                        bg: "#128C7E",
                    },
                },
            },
        },
        Input: {
            variants: {
                filled: {
                    field: {
                        bg: "#2A3942",
                        borderColor: "transparent",
                        borderWidth: "0px",
                        color: "#E9EDEF",
                        borderRadius: "8px",
                        _hover: {
                            bg: "#323F49",
                        },
                        _focus: {
                            bg: "#2A3942",
                            borderColor: "#25D366",
                            borderWidth: "1px",
                            boxShadow: "none",
                        },
                        _placeholder: {
                            color: "#667781",
                        },
                    },
                },
                outline: {
                    field: {
                        bg: "#2A3942",
                        borderColor: "#2A3942",
                        color: "#E9EDEF",
                        borderRadius: "8px",
                        _hover: {
                            borderColor: "#3B4A54",
                        },
                        _focus: {
                            borderColor: "#25D366",
                            boxShadow: "none",
                        },
                        _placeholder: {
                            color: "#667781",
                        },
                    },
                },
            },
            defaultProps: {
                variant: "filled",
            },
        },
        Modal: {
            baseStyle: {
                dialog: {
                    bg: "#1F2C34",
                    borderRadius: "12px",
                    border: "1px solid #2A3942",
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
                },
                header: {
                    color: "#E9EDEF",
                    fontWeight: "600",
                },
                body: {
                    color: "#8696A0",
                },
                closeButton: {
                    color: "#667781",
                    _hover: {
                        color: "#E9EDEF",
                        bg: "rgba(37, 211, 102, 0.1)",
                    },
                },
            },
        },
        Drawer: {
            baseStyle: {
                dialog: {
                    bg: "#111B21",
                },
                header: {
                    color: "#E9EDEF",
                    borderColor: "#2A3942",
                },
                body: {
                    bg: "#111B21",
                },
            },
        },
        Menu: {
            baseStyle: {
                list: {
                    bg: "#233138",
                    borderColor: "#2A3942",
                    borderRadius: "8px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                    py: "1",
                },
                item: {
                    bg: "transparent",
                    color: "#E9EDEF",
                    fontSize: "sm",
                    _hover: {
                        bg: "rgba(37, 211, 102, 0.1)",
                    },
                    _focus: {
                        bg: "rgba(37, 211, 102, 0.1)",
                    },
                },
                divider: {
                    borderColor: "#2A3942",
                },
            },
        },
        Tabs: {
            variants: {
                "soft-rounded": {
                    tab: {
                        color: "#667781",
                        fontWeight: "500",
                        borderRadius: "8px",
                        transition: "all 0.2s ease",
                        _selected: {
                            bg: "#25D366",
                            color: "white",
                            boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
                        },
                        _hover: {
                            color: "#25D366",
                        },
                    },
                },
            },
        },
        Tooltip: {
            baseStyle: {
                bg: "#233138",
                color: "#E9EDEF",
                borderRadius: "6px",
                px: "3",
                py: "2",
                fontSize: "xs",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
            },
        },
        Badge: {
            variants: {
                solid: {
                    bg: "#25D366",
                    color: "white",
                    borderRadius: "full",
                },
            },
        },
        Skeleton: {
            baseStyle: {
                borderRadius: "8px",
                startColor: "#1F2C34",
                endColor: "#2A3942",
            },
        },
        Spinner: {
            baseStyle: {
                color: "#25D366",
            },
        },
        FormLabel: {
            baseStyle: {
                color: "#8696A0",
                fontWeight: "500",
                fontSize: "sm",
            },
        },
    },
});

export default theme;
