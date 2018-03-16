/**
 * BLOCK: Editable Block Example
 *
 * https://github.com/modularwp/gutenberg-block-editable-example
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const createElement = wp.element.createElement; // The wp.element.createElement() function to create elements.
const Editable = wp.blocks.Editable; // For creating editable elements.

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/editable-block-example', {

	title: __( 'Editable Block Example - JSJSJSJSJS' ), // Block title. __() function allows for internationalization.
	icon: 'unlock', // Block icon from Dashicons. https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category. Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		content: {
			type: 'string',
			default: 'Editable block content...',
		},
	},

	// Defines the block within the editor.
	edit: function( props ) {
		var content = props.attributes.content;
		var focus = props.focus;

		function onChangeContent( updatedContent ) {
			props.setAttributes( { content: updatedContent } );
		}

		return createElement(
			Editable,
			{
				tagName: 'p',
				className: props.className,
				value: content,
				onChange: onChangeContent,
				focus: focus,
				onFocus: props.setFocus,
			},
		);
	},

	// Defines the saved block.
	save: function( props ) {
		var content = props.attributes.content;

		return createElement(
			'p',
			{
				className: props.className,
			},
			content
		);
	},

} );
