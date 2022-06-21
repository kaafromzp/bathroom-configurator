import { ReactSVG } from 'react-svg';
import { Properties } from 'csstype';
import './index.css';

type IProps = {
  src: any;
  wrapperClassName?: string;
  style?: Properties;
  draggable?: boolean;
  onClick?: () => void;
  // onDragStart?: ( e: React.DragEvent<HTMLImageElement> ) => void;
  // onDragEnd?: ( e: React.MouseEvent ) => void;
}

export const SvgRender = ( { src, onClick, wrapperClassName, style }: IProps ): JSX.Element => {
  return (
    <ReactSVG
      // afterInjection={ ( error: Error | null, svg?: SVGSVGElement ) => {
      //   if ( error ) {
      //     console.error( error );

      //     return;
      //   }

      //   console.log( svg );
      // } }
      // beforeInjection={ ( svg ) => {
      //   svg.classList.add( 'svg-class-name' );
      //   // svg.setAttribute( 'style', 'width: 200px' );
      // } }
      style={ style ? style : {} }
      // color = 'red'
      className={ `svgWrap ${ wrapperClassName ? wrapperClassName : '' }` }
      // className={ className ? className : 'svgWrapper' }
      evalScripts='always'
      fallback={ () => <span>Error!</span> }
      httpRequestWithCredentials={ true }
      // loading={ () => <span>Loading</span> }
      onClick={ onClick }
      renumerateIRIElements={ false }
      src={ src.default }
      useRequestCache={ false }
      wrapper={ undefined }
    />
  );
};
