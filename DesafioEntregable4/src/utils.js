import {dirname} from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url)) //establecer la variable para obtener la ruta absoluta 