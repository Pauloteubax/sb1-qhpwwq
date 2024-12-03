<?php
/**
 * Plugin Name: F1 Constructor Standings
 * Description: Affiche le classement des constructeurs de Formule 1
 * Version: 1.0.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) {
    exit;
}

function f1_constructor_standings_enqueue_scripts() {
    wp_enqueue_script(
        'f1-constructor-standings',
        plugins_url('dist/assets/index.js', __FILE__),
        array(),
        '1.0.0',
        true
    );
    wp_enqueue_style(
        'f1-constructor-standings',
        plugins_url('dist/assets/index.css', __FILE__),
        array(),
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'f1_constructor_standings_enqueue_scripts');

function f1_constructor_standings_shortcode() {
    return '<div id="f1-constructor-standings"></div>';
}
add_shortcode('f1_standings', 'f1_constructor_standings_shortcode');