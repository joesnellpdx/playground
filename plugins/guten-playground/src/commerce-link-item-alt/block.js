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
	RichText,
	MediaUpload,
	InspectorControls,
} = wp.blocks;
const {
	Button,
	ToggleControl,
	TextControl,
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
registerBlockType( 'jspdx/block-commerce-link', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Commerce Link - XXXXXX' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Commerce Link' ),
	],
	attributes: {
		commerceURL: {
			type: 'string',
			default: '',
		},
		title: {
			type: 'array',
			source: 'children',
			selector: 'p',
			formattingControls: 'link',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		ingredients: {
			type: 'array',
			source: 'children',
			selector: '.ingredients',
		},
		instructions: {
			type: 'array',
			source: 'children',
			selector: '.steps',
		},
		applyStyles: {
			type: 'string',
			default: '',
		},
	},
	edit: props => {
		const focusedEditable = props.focus ? props.focus.editable || 'title' : null;
		const attributes = props.attributes;
		const onChangeTitle = value => {
			props.setAttributes( { title: value } );
		};
		const onFocusTitle = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'title' } ) );
		};
		const onSelectImage = media => {
			props.setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeIngredients = value => {
			props.setAttributes( { ingredients: value } );
		};
		const onFocusIngredients = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'ingredients' } ) );
		};
		const onChangeInstructions = value => {
			props.setAttributes( { instructions: value } );
		};
		const onFocusInstructions = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'instructions' } ) );
		};

		const onChangeStyleSettings = applyStyles => {
			if ( attributes.applyStyles ) {
				props.setAttributes( { applyStyles: '' } );
			} else {
				props.setAttributes( { applyStyles: 'styled' } );
			}
		}

		const onChangeURL = value => {
			props.setAttributes( { commerceURL: value } );
		};

		return (
			<div className={props.className}>
				{
					!! focusedEditable && (
						<InspectorControls>
							<ToggleControl
								label={ __( 'Apply "Styled" class to link Test Toggle' ) }
								checked={ !! attributes.applyStyles }
								onChange={ onChangeStyleSettings }
							/>
							<TextControl
								label={ __( 'Block URL' ) }
								value={ attributes.commerceURL }
								onChange={ onChangeURL }
								type="url"
							/>
						</InspectorControls>
					)
				}

				<RichText
					tagName="p"
					placeholder={ __( 'Link Here' ) }
					value={ attributes.title }
					onChange={ onChangeTitle }
					focus={ focusedEditable === 'title' }
					onFocus={ onFocusTitle }
				/>
				<div className="recipe-image">
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ attributes.mediaID }
						render={ ( { open } ) => (
							<Button className={ attributes.mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
								{ ! attributes.mediaID ? __( 'Upload Image' ) : <img src={ attributes.mediaURL } /> }
							</Button>
						) }
					/>
				</div>
				<h3>{ __( 'Ingredients' ) }</h3>
				<RichText
					tagName="ul"
					multiline="li"
					placeholder={ __( 'Write a list of ingredients…' ) }
					value={ attributes.ingredients }
					onChange={ onChangeIngredients }
					focus={ focusedEditable === 'ingredients' }
					onFocus={ onFocusIngredients }
					className="ingredients"
				/>
				<h3>{ __( 'Instructions' ) }</h3>
				<RichText
					tagName="div"
					multiline="p"
					className="steps"
					placeholder={ __( 'Write the instructions…' ) }
					value={ attributes.instructions }
					onChange={ onChangeInstructions }
					focus={ focusedEditable === 'instructions' }
					onFocus={ onFocusInstructions }
				/>
			</div>
		);
	},
	save: props => {
		const {
			className,
			attributes: {
				title,
				mediaURL,
				ingredients,
				instructions,
				applyStyles
			}
		} = props;
		return (
			<div className={className}>
				<a className={applyStyles} href="{ title }">
					{
						mediaURL && (
							<img className="recipe-image" src={ mediaURL } />
						)
					}
					<div className="steps">
						{ instructions }
					</div>
				</a>
				<h2>
					'text here'
				</h2>

				<ul className="ingredients">
					{ ingredients }
				</ul>
			</div>
		);
	}
} );
