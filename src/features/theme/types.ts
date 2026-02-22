/**
 * Theme Feature Types
 */

export interface CustomTheme {
  name: string;
  colors: {
    // Background colors
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;

    // Text colors
    textPrimary: string;
    textSecondary: string;
    textMuted: string;

    // Brand colors
    blurple: string;
    green: string;
    yellow: string;
    red: string;

    // Border colors
    border: string;
    borderHover: string;

    // Button colors
    buttonPrimary: string;
    buttonSecondary: string;
    buttonSuccess: string;
    buttonDanger: string;
  };
}
