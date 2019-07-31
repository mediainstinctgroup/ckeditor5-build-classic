/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@samhammer/ckeditor5-simple-image-upload-plugin';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	Alignment,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar
];

const IFRAME_SRC = '//cdn.iframe.ly/api/iframe';
const API_KEY = '91f98e48a48ef9c21af604';

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'alignment',
			'bulletedList',
			'numberedList',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	simpleImageUpload: {
		onUpload: file => {
			return new Promise( ( resolve, reject ) => {
				const reader = new window.FileReader();

				reader.addEventListener( 'load', () => {
					resolve( reader.result );
				} );

				reader.addEventListener( 'error', err => {
					reject( err );
				} );

				reader.addEventListener( 'abort', () => {
					reject();
				} );
				reader.readAsDataURL( file );
			} );
		}
	},
	mediaEmbed: {
		previewsInData: false,

		extraProviders: [
			{
				// hint: this is just for previews. Get actual HTML codes by making API calls from your CMS
				name: 'iframely previews',

				// Match all URLs or just the ones you need:
				url: /.+/,

				html: match => {
					const url = match[ 0 ];

					const iframeUrl = IFRAME_SRC + '?app=1&api_key=' + API_KEY + '&url=' + encodeURIComponent(url);
					// alternatively, use &key= instead of &api_key with the MD5 hash of your api_key
					// more about it: https://iframely.com/docs/allow-origins

					return (
						'<div class="iframely-embed" style="max-width: 200px">' +
							'<div class="iframely-responsive">' +
								`<iframe src="${ iframeUrl }" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>` +
								'</iframe>' +
							'</div>' +
						'</div>'
					);
				}
			}
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'ru'
};
