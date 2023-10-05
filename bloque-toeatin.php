<?php
/**
 * Plugin Name:       MyCode - TO EAT IN
 * Plugin URI:        https://melodious-griffin-d3095a.netlify.app/
 * Description:       Un bloque que añade la estructura para las entradas de restaurant to eat in
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Jesus Jimenez
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bloque-toeatin
 * Update URI:        https://melodious-griffin-d3095a.netlify.app/
 *
 * @package           to-eatin
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function to_eatin_bloque_toeatin_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'to_eatin_bloque_toeatin_block_init' );
