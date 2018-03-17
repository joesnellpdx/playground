/**
 * BLOCK: guten-playground
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
	InnerBlocks,
	InspectorControls,
} = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RangeControl,
} = wp.components;

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
registerBlockType( 'cgb/commerce-links', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Commerce Links' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Commerce Links' ),
		__( 'Nested' ),
		__( 'Inner' ),
	],
	customClassName: false,
	attributes: {
		columns: {
			type: 'number',
			default: 3,
		},
		active: {
			type: 'string',
			default: '',
		}
	},
	description: __( 'A multi-column layout wrapper for commerce links ONLY.' ),

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const focusedEditable = props.focus ? props.focus.editable || 'title' : null;
		const attributes = props.attributes;

		const onChangeColumns = value => {
			props.setAttributes( { columns: value } );
		};

		return (
			<div className={props.className}>
				{
					!! focusedEditable && (
						<InspectorControls>
							<RangeControl
								label={ __( 'Columns' ) }
								value={ attributes.columns }
								onChange={ onChangeColumns }
								min={ 1 }
								max={ 4 }
							/>
						</InspectorControls>
					)
				}
				<p>{__( 'Insert Commerce List Items Below Here:' )}</p>
				<InnerBlocks />
				<p>{ __( 'End of List Items' ) }</p>
			</div>
		);
	},
	save: props => {

		const {
			className,
			attributes: {
				columns,
			},
		} = props;

		return (
			<div className={className} data-columns={columns}>
				<div className="commerce-nav">
					<p className="navtitle">this is the nav title</p>
					<InnerBlocks.Content />
					<p className="navend">this is the nav end</p>
				</div>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
