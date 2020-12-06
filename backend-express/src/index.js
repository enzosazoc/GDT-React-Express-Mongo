import app from './app';
import './database';


/* app.listen(4000) */
app.listen(app.get('port'));
console.log('App iniciada en puerto:', 4000);
