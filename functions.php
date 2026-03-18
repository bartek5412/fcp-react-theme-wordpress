<?php
/**
 * Functions and definitions for FCP React Theme
 *
 * @package FCP_React_Theme
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Theme setup
 */
function fcp_react_theme_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'fcp-react-theme'),
        'footer' => __('Footer Menu', 'fcp-react-theme'),
    ));
}
add_action('after_setup_theme', 'fcp_react_theme_setup');

/**
 * Enqueue scripts and styles
 */
function fcp_react_theme_scripts() {
    $theme_version = wp_get_theme()->get('Version');

    // Enqueue React app (compiled by Vite)
    wp_enqueue_script(
        'fcp-react-app',
        get_template_directory_uri() . '/dist/assets/index.js',
        array(),
        $theme_version,
        true
    );

    // Enqueue React app styles
    wp_enqueue_style(
        'fcp-react-app-style',
        get_template_directory_uri() . '/dist/assets/index.css',
        array(),
        $theme_version
    );

    // Pass WordPress data to React
    wp_localize_script('fcp-react-app', 'wpReactTheme', array(
        'apiUrl' => rest_url('wp/v2/'),
        'nonce' => wp_create_nonce('wp_rest'),
        'siteUrl' => home_url(),
        'themeUrl' => get_template_directory_uri(),
    ));
}
add_action('wp_enqueue_scripts', 'fcp_react_theme_scripts');

/**
 * Add REST API support for custom fields
 */
function fcp_react_theme_rest_api_init() {
    // Enable REST API for all post types
    global $wp_post_types;
    foreach ($wp_post_types as $post_type) {
        if (isset($post_type->show_in_rest) && $post_type->show_in_rest) {
            $post_type->show_in_rest = true;
        }
    }
}
add_action('rest_api_init', 'fcp_react_theme_rest_api_init');

/**
 * CORS headers for REST API (if needed for development)
 */
function fcp_react_theme_cors_headers() {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
    }
}
add_action('rest_api_init', 'fcp_react_theme_cors_headers', 15);

