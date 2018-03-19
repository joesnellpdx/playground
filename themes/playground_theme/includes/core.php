<?php
/**
 * Core setup, site hooks and filters.
 */
namespace PlaygroundTheme\Core;

/**
 * Set up theme defaults and register supported WordPress features.
 *
 * @since 0.1.0
 *
 * @uses add_action()
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'after_setup_theme',  $n( 'i18n' ) );
	add_action( 'after_setup_theme',  $n( 'theme_setup' ) );
	add_action( 'wp_enqueue_scripts', $n( 'scripts' ) );
	add_action( 'wp_enqueue_scripts', $n( 'styles' ) );
}

/**
 * Makes WP Theme available for translation.
 *
 * Translations can be added to the /lang directory.
 * If you're building a theme based on WP Theme, use a find and replace
 * to change 'wptheme' to the name of your theme in all template files.
 *
 * @uses load_theme_textdomain() For translation/localization support.
 *
 * @since 0.1.0
 *
 * @return void
 */
function i18n() {
	load_theme_textdomain( 'playground-theme', PLAYGROUND_THEME_PATH . '/languages' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function theme_setup() {
	// add_theme_support( 'automatic-feed-links' );
	// add_theme_support( 'title-tag' );
	// add_theme_support( 'post-thumbnails' );
	// add_theme_support(
	// 	'html5', array(
	// 		'search-form',
	// 		'gallery'
	// 	)
	// );

	// // This theme uses wp_nav_menu() in three locations.
	// register_nav_menus(
	// 	array(
	// 		'primary'        => esc_html__( 'Primary Menu', 'tenup' ),
	// 	)
	// );
}

/**
 * Enqueue scripts for front-end.
 *
 * @uses wp_enqueue_script() to load front end scripts.
 *
 * @since 0.1.0
 *
 * @return void
 */
function scripts() {

	wp_enqueue_script(
		'frontend',
		PLAYGROUND_THEME_TEMPLATE_URL . "/dist/js/frontend.min.js",
		[],
		false,
		true
	);

}

/**
 * Enqueue styles for front-end.
 *
 * @uses wp_enqueue_style() to load front end styles.
 *
 * @since 0.1.0
 *
 * @return void
 */
function styles() {

	wp_enqueue_style(
		'styles',
		PLAYGROUND_THEME_TEMPLATE_URL . "/dist/css/style.min.css",
		false
	);
}

/**
 * Custom Image Sizes
 *
 */
if ( function_exists( 'add_image_size' ) ) {
	add_image_size( 'landscape-100', 100, 65, true ); // ratio 1.55
	add_image_size( 'landscape-200', 200, 129, true ); // ratio 1.55
	add_image_size( 'landscape-400', 400, 258, true );
	add_image_size( 'landscape-800', 800, 516, true );
	add_image_size( 'landscape-1200', 1200, 774, true );
	add_image_size( 'landscape-1600', 1600, 1032, true );
	add_image_size( 'landscape-2000', 2000, 1290, true );
	add_image_size( 'landscape-2400', 2400, 1548, true );
	add_image_size( 'landscape-3200', 3200, 2064, true );
	add_image_size( 'landscape-4000', 4000, 2580, true );

	add_image_size( 'square-100', 100, 100, true );
	add_image_size( 'square-200', 200, 200, true ); // ratio 1
	add_image_size( 'square-400', 400, 400, true );
	add_image_size( 'square-800', 800, 800, true );
	add_image_size( 'square-1200', 1200, 1200, true );
	add_image_size( 'square-1600', 1600, 1600, true );
	add_image_size( 'square-2000', 2000, 2000, true );
	add_image_size( 'square-2400', 2400, 2400, true );
	add_image_size( 'square-2400', 3200, 3200, true );
	add_image_size( 'square-4000', 4000, 4000, true );
}

if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' );
}
