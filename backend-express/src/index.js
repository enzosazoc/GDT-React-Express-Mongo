import app from './app';
import './database';

app.listen(app.get('port'));
console.log('App iniciada en puerto:', 4000);
