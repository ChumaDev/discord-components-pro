/**
 * Discord API Limits
 * Official limits from Discord API documentation
 */

export const DISCORD_LIMITS = {
  // Message limits
  MESSAGE_CONTENT_LENGTH: 2000,
  MESSAGE_EMBEDS: 10,
  MESSAGE_COMPONENTS: 5,

  // Component limits
  ACTION_ROW_COMPONENTS: 5,
  SELECT_OPTIONS: 25,
  BUTTON_LABEL_LENGTH: 80,
  SELECT_PLACEHOLDER_LENGTH: 150,
  SELECT_OPTION_LABEL_LENGTH: 100,
  SELECT_OPTION_DESCRIPTION_LENGTH: 100,
  SELECT_OPTION_VALUE_LENGTH: 100,

  // Text limits
  TEXT_DISPLAY_CONTENT_LENGTH: 4000,

  // Media limits
  MEDIA_GALLERY_ITEMS: 10,
  MEDIA_URL_LENGTH: 2048,
  MEDIA_DESCRIPTION_LENGTH: 200,

  // Container limits
  CONTAINER_COMPONENTS: 10,

  // Custom ID limits
  CUSTOM_ID_LENGTH: 100,
} as const;

export const VALIDATION_MESSAGES = {
  BUTTON_LABEL_TOO_LONG: `Button label must be ${DISCORD_LIMITS.BUTTON_LABEL_LENGTH} characters or less`,
  TEXT_CONTENT_TOO_LONG: `Text content must be ${DISCORD_LIMITS.TEXT_DISPLAY_CONTENT_LENGTH} characters or less`,
  TOO_MANY_SELECT_OPTIONS: `Select menu can have at most ${DISCORD_LIMITS.SELECT_OPTIONS} options`,
  TOO_MANY_ACTION_ROW_COMPONENTS: `Action row can have at most ${DISCORD_LIMITS.ACTION_ROW_COMPONENTS} components`,
  TOO_MANY_MEDIA_ITEMS: `Media gallery can have at most ${DISCORD_LIMITS.MEDIA_GALLERY_ITEMS} items`,
  INVALID_URL: 'Invalid URL format',
  CUSTOM_ID_REQUIRED: 'Custom ID is required for interactive components',
  CUSTOM_ID_TOO_LONG: `Custom ID must be ${DISCORD_LIMITS.CUSTOM_ID_LENGTH} characters or less`,
} as const;
