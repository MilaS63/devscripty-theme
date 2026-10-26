<?php
/**
 * Exports code from Breakdance "Code Block" elements into files.
 * Run: wp eval-file wp-content/plugins/devscripty-core/tools/export-breakdance.php
 */
if ( ! defined( 'ABSPATH' ) || ! defined( 'WP_CLI' ) ) {
	exit;
}

function dsc_find_code( $value, &$found ) {
	if ( ! is_array( $value ) ) {
		return;
	}
	foreach ( $value as $key => $item ) {
		if ( is_string( $key ) && preg_match( '/_code$/', $key ) && is_string( $item ) && '' !== trim( $item ) ) {
			$found[ $key ] = $item;
		} elseif ( is_array( $item ) ) {
			dsc_find_code( $item, $found );
		}
	}
}

function dsc_find_blocks( $node, &$blocks ) {
	if ( ! is_array( $node ) ) {
		return;
	}
	$type = isset( $node['data']['type'] ) ? $node['data']['type'] : '';
	if ( is_string( $type ) && false !== strpos( $type, 'CodeBlock' ) ) {
		$found = array();
		if ( isset( $node['data']['properties'] ) ) {
			dsc_find_code( $node['data']['properties'], $found );
		}
		if ( $found ) {
			$blocks[ isset( $node['id'] ) ? $node['id'] : count( $blocks ) ] = $found;
		}
	}
	if ( ! empty( $node['children'] ) && is_array( $node['children'] ) ) {
		foreach ( $node['children'] as $child ) {
			dsc_find_blocks( $child, $blocks );
		}
	}
}

$ext_map = array(
	'php_code'        => 'php',
	'css_code'        => 'css',
	'js_code'         => 'js',
	'javascript_code' => 'js',
);

global $wpdb;
$ids   = $wpdb->get_col( "SELECT DISTINCT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_breakdance_data'" );
$base  = dirname( __DIR__ ) . '/exports';
$total = 0;

foreach ( $ids as $post_id ) {
	$post = get_post( $post_id );
	if ( ! $post || in_array( $post->post_type, array( 'revision' ), true ) || in_array( $post->post_status, array( 'trash', 'auto-draft' ), true ) ) {
		continue;
	}

	$raw  = get_post_meta( $post_id, '_breakdance_data', true );
	$data = is_string( $raw ) ? json_decode( $raw, true ) : $raw;
	if ( ! is_array( $data ) || empty( $data['tree_json_string'] ) ) {
		continue;
	}
	$tree = json_decode( $data['tree_json_string'], true );
	if ( ! is_array( $tree ) || empty( $tree['root'] ) ) {
		continue;
	}

	$blocks = array();
	dsc_find_blocks( $tree['root'], $blocks );

	$name = $post->post_name ? $post->post_name : $post_id;
	$dir  = $base . '/' . sanitize_title( $post->post_type . '-' . $name );

	if ( is_dir( $dir ) ) {
		foreach ( glob( $dir . '/*' ) as $old ) {
			if ( is_file( $old ) ) {
				unlink( $old );
			}
		}
	}
	if ( ! $blocks ) {
		continue;
	}

	wp_mkdir_p( $dir );
	$count = 0;
	foreach ( $blocks as $block_id => $codes ) {
		foreach ( $codes as $key => $code ) {
			if ( isset( $ext_map[ $key ] ) ) {
				$file = $dir . '/block-' . $block_id . '.' . $ext_map[ $key ];
			} else {
				$file = $dir . '/block-' . $block_id . '-' . $key . '.txt';
			}
			file_put_contents( $file, $code );
			$count++;
		}
	}
	$total += $count;
	WP_CLI::log( sprintf( '%s (ID %d): %d files', basename( $dir ), $post_id, $count ) );
}

WP_CLI::success( "Exported $total files." );
