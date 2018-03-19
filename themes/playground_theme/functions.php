<?php
/**
 * WP Theme constants and setup functions
 *
 * @package PlaygroundTheme
 * @since 0.1.0
 */

// Useful global constants.
define( 'PLAYGROUND_THEME_VERSION',      '0.1.0' );
define( 'PLAYGROUND_THEME_URL',          get_stylesheet_directory_uri() );
define( 'PLAYGROUND_THEME_TEMPLATE_URL', get_template_directory_uri() );
define( 'PLAYGROUND_THEME_PATH',         get_template_directory() . '/' );
define( 'PLAYGROUND_THEME_INC',          PLAYGROUND_THEME_PATH . 'includes/' );

require_once PLAYGROUND_THEME_INC . 'core.php';
require_once PLAYGROUND_THEME_INC . 'template-tags.php';

// Run the setup functions.
PlaygroundTheme\Core\setup();

// What does this do?
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once 'vendor/autoload.php';
}


// How to use this theme
// 1. Rename folder PlaygroundTheme -> your project's name
// 2. Do 3 case-sensitive search/replace:
// 		A. PlaygroundTheme
// 		B. PLAYGROUND_THEME
// 		C. tenup
