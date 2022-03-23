import 'focus-visible';
import lazyImages from './lazyImages';
import documentReady from '../helpers/documentReady';

documentReady(() => {
  lazyImages();
});
