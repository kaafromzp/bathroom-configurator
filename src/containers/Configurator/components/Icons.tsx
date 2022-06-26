// interface IOwnProps {};
// interface IProps extends IReduxProps, IOwnProps {};
import { ColorPicker } from '../../ObjectModal/components';
import json from './icons.json';

function Icons() {
  return (
    <>
      {json.map( ( i ) => (
        <ColorPicker
          key={ i.id }
          uuid={ i.id }
          position={ i.position }
        />
      ) )}
    </>
  );
}

export default Icons;
