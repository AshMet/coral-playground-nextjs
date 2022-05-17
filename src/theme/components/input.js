/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { mode } from "@chakra-ui/theme-tools";

const sg1 = "secondaryGray.100";
const wa1 = "whiteAlpha.100";
const sg6 = "secondaryGray.600";

export const inputStyles = {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: "8px",
        },
      },

      variants: {
        main: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid",
            color: mode("secondaryGray.900", "white")(props),
            borderColor: mode({ sg1 }, { wa1 })(props),
            borderRadius: "16px",
            fontSize: "sm",
            p: "20px",
            _placeholder: { color: "secondaryGray.400" },
          },
        }),
        auth: (props) => ({
          field: {
            fontWeight: "500",
            color: mode("navy.700", "white")(props),
            bg: mode("transparent", "transparent")(props),
            border: "1px solid",
            borderColor: mode({ sg1 }, "rgba(135, 140, 189, 0.3)")(props),
            borderRadius: "16px",
            _placeholder: { color: { sg6 }, fontWeight: "400" },
          },
        }),
        authSecondary: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            borderColor: { sg1 },
            borderRadius: "16px",
            _placeholder: { color: { sg6 } },
          },
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: { sg6 } },
          },
        }),
        social: (props) => ({
          field: {
            bg: mode("secondaryGray.300", "transparent")(props),
            border: "1px solid",
            color: mode("secondaryGray.900", "white")(props),
            borderColor: mode("secondaryGray.300", { wa1 })(props),
            borderRadius: "30px",
            fontSize: "sm",
            p: "20px",
            _placeholder: {
              color: mode("secondaryGray.700", { sg6 })(props),
            },
          },
        }),
        story: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            color: "white",
            borderColor: "white",
            borderRadius: "30px",
            fontSize: "sm",
            p: "20px",
            _placeholder: {
              color: "whiteAlpha.900",
            },
            _active: {
              borderColor: "white",
            },
          },
        }),
      },
    },
    NumberInput: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },

      variants: {
        main: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: { sg1 },
            borderRadius: "16px",
            _placeholder: { color: { sg6 } },
          },
        }),
        auth: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: { sg1 },
            borderRadius: "16px",
            _placeholder: { color: { sg6 } },
          },
        }),
        authSecondary: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: { sg1 },
            borderRadius: "16px",
            _placeholder: { color: { sg6 } },
          },
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: { sg6 } },
          },
        }),
      },
    },
    Select: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },

      variants: {
        main: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid",
            color: { sg6 },
            borderColor: mode({ sg1 }, { wa1 })(props),
            borderRadius: "16px",
            _placeholder: { color: { sg6 } },
          },
          icon: {
            color: { sg6 },
          },
        }),
        mini: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "0px solid transparent",
            fontSize: "0px",
            p: "10px",
            _placeholder: { color: { sg6 } },
          },
          icon: {
            color: { sg6 },
          },
        }),
        subtle: (props) => ({
          box: {
            width: "unset",
          },
          field: {
            bg: "transparent",
            border: "0px solid",
            color: { sg6 },
            borderColor: "transparent",
            width: "max-content",
            _placeholder: { color: { sg6 } },
          },
          icon: {
            color: { sg6 },
          },
        }),
        transparent: (props) => ({
          field: {
            bg: "transparent",
            border: "0px solid",
            width: "min-content",
            color: mode({ sg6 }, { sg6 })(props),
            borderColor: "transparent",
            padding: "0px",
            paddingLeft: "8px",
            paddingRight: "20px",
            fontWeight: "700",
            fontSize: "14px",
            _placeholder: { color: { sg6 } },
          },
          icon: {
            transform: "none !important",
            position: "unset !important",
            width: "unset",
            color: { sg6 },
            right: "0px",
          },
        }),
        auth: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: { sg1 },
            borderRadius: "16px",
            _placeholder: { color: { sg6 } },
          },
        }),
        authSecondary: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: { sg1 },
            borderRadius: "16px",
            _placeholder: { color: { sg6 } },
          },
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: { sg6 } },
          },
        }),
      },
    },
    // PinInputField: {
    //   variants: {
    //     main: (props) => ({
    //       field: {
    //         bg: "red !important",
    //         border: "1px solid",
    //         color: mode("secondaryGray.900", "white")(props),
    //         borderColor: mode({sg1}, { wa1 })(props),
    //         borderRadius: "16px",
    //         _placeholder: { color: { sg6 } },
    //       },
    //     }),
    //   },
    // },
  },
};
