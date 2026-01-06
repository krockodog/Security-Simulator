const fs = require('fs');
const content = fs.readFileSync('pt003-data.ts', 'utf8');

// Fix escaped single quotes in payloads
const fixed = content
  .replace(/payload: 'site=www\.exa\\'ping -c 10 localhost\\'mple\.com'/g, 
           "payload: 'site=www.exa\\'ping -c 10 localhost\\'mple.com'")
  .replace(/payload: 'item=widget\\'waitfor delay\\'00:00:20\\'/g,
           "payload: \"item=widget'waitfor delay'00:00:20'\"")
  .replace(/payload: 'item=widget\\'convert\(int,@@version\)\\'/g,
           "payload: \"item=widget'convert(int,@@version)'\"")
  .replace(/\\'ping -c 10 localhost\\'/g, "'ping -c 10 localhost'")
  .replace(/\\'waitfor delay\\'/g, "'waitfor delay'")  
  .replace(/\\'convert/g, "'convert");

fs.writeFileSync('pt003-data.ts', fixed);
console.log('Fixed string escaping issues');
