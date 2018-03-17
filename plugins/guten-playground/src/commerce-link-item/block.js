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
registerBlockType( 'cgb/block-commerce-link', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Commerce Link - XXXXXX' ), // Block title.
	icon: 'index-card', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Commerce Link' ),
	],
	anchor: true, // Add the support for an anchor link.
	customClassName: false, // Remove the support for a the custom className
	attributes: {
		commerceURL: {
			type: 'string',
			default: '',
		},
		mediaID: {
			type: 'number',
		},
		mediaALT: {
			type: 'string',
			default: '',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
			alt: 'string',
		},
		captionOne: {
			type: 'string',
			default: '',
			selector: '.caption-1',
		},
		captionTwo: {
			type: 'string',
			default: '',
			selector: '.caption-2',
		},
		applyStyles: {
			type: 'string',
			default: '',
		},
	},
	edit: props => {
		const focusedEditable = props.focus ? props.focus.editable || 'title' : null;
		const attributes = props.attributes;
		const onSelectImage = media => {
			console.table( media );
			props.setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
				mediaALT: media.alt,
			} );
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

		const onChangeCaptionOne = value => {
			props.setAttributes( { captionOne: value } );
		};
		const onFocusCaptionOne = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'captionOne' } ) );
		};
		const onChangeCaptionTwo = value => {
			props.setAttributes( { captionTwo: value } );
		};
		const onFocusCaptionTwo = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'captionTwo' } ) );
		};

		return (
			<div className={ props.className }>
				{
					!! focusedEditable && (
						<InspectorControls>
							<ToggleControl
								label={ __( 'Apply "Styled" class to link Test Toggle' ) }
								checked={ !! attributes.applyStyles }
								onChange={ onChangeStyleSettings }
							/>
							<TextControl
								label={ __( 'Commerce URL' ) }
								value={ attributes.commerceURL }
								onChange={ onChangeURL }
								type="url"
							/>
						</InspectorControls>
					)
				}
				<MediaUpload
					className="img-responsive"
					onSelect={ onSelectImage }
					type="image"
					value={attributes.mediaID}
					render={ ( { open } ) => (
						<Button className={ attributes.mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
							{ ! attributes.mediaID ? __( 'Upload Image' ) : <img src={ attributes.mediaURL } /> }
						</Button>
					) }
				/>
				<div className="captions">
					<RichText
						className="caption-1"
						tagname="div"
						placeholder={ __( 'Caption One' ) }
						value={ attributes.captionOne }
						onChange={ onChangeCaptionOne }
						focus={ focusedEditable === 'captionOne' }
						onFocus={ onFocusCaptionOne }
						type="text"
					/>
					<RichText
						className="caption-2"
						tagname="div"
						placeholder={ __( 'Caption Two' ) }
						value={ attributes.captionTwo }
						onChange={ onChangeCaptionTwo }
						focus={ focusedEditable === 'captionTwo' }
						onFocus={ onFocusCaptionTwo }
						type="text"
					/>
				</div>
			</div>
		);
	},
	save: props => {
		const {
			className,
			attributes: {
				commerceURL,
				mediaURL,
				captionOne,
				captionTwo,
				applyStyles,
				mediaALT,
			},
		} = props;

		return (
			<div className={ className }>
				<a className={applyStyles} data-test={ commerceURL } href={ commerceURL } rel="nofollow noopener" target="_blank">
					{
						mediaURL && (
							<img className="img-responsive" src={ mediaURL } alt={ mediaALT } />
						)
					}
					<div className="captions">
						{
							captionOne && (
								<div className="caption-1">{ captionOne }</div>
							)
						}
						{
							captionTwo && (
								<div className="caption-2">{ captionTwo }</div>
							)
						}
					</div>
					<div className="hover-overlay">
						<div className="shop-now-cta">{ __( 'Shop Now' ) }</div>
					</div>
				</a>
			</div>
		);
	},
} );
