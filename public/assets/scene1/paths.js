const fs = require( 'fs' );
const paths = [];
const applyData = [];
fs.readdirSync( './' ).forEach( ( file ) => {
  if ( fs.lstatSync( `./${ file }` ).isDirectory() ) {
    fs.readdirSync( `./${ file }/` ).forEach( ( file2 ) => {
      if ( fs.lstatSync( `./${ file }/${ file2 }` ).isDirectory() ) {
        console.log( 'folder: ', `${ file }/${ file2 }` );
        fs.readdirSync( `./${ file }/${ file2 }/` ).forEach( ( file3 ) => {
          const fileName = file3.slice( 0, file3.indexOf( '.' ) );
          if ( fs.lstatSync( `./${ file }/${ file2 }/${ file3 }` ).isFile() ) {
            console.log( 'file: ', `${ file }/${ file2 }/${ file3 }` );
            console.log( 'splitted: ', fileName.split( /(\s+)/ ).filter( ( e ) => e.trim().length > 0 ) );
            paths.push( `${ file }/${ file2 }/${ file3 }` );
            applyData.push( [fileName.split( /(\s+)/ ).filter( ( e ) => e.trim().length > 0 ), file2] );
          }
        } );
      }
    } );
  }
} );
fs.writeFile( 'paths.json', JSON.stringify( paths ), () => {} );
fs.writeFile( 'applyData.json', JSON.stringify( applyData ), () => {} );
