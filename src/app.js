import express from "express";
import morgan from "morgan";
import cors from "cors";

//Import de las rutas del backend
import adminRoutes from './routes/admins.routes.js'
import alumnoRoutes from './routes/alumnos.routes.js'
import repRoutes from './routes/reps.routes.js'
import municipioRoutes from './routes/municipios.routes.js'
import estadoRoutes from './routes/estados.routes.js'
import nivelRoutes from './routes/nivel.routes.js'
import asuntoRoutes from './routes/asunto.routes.js'
import statusRoutes from './routes/status.routes.js'
import turnoRoutes from './routes/turnos.routes.js'


const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin: '*'
}));

app.use(express.json());

//Rutas
app.use('/admin', adminRoutes); 
app.use('/alumno', alumnoRoutes); 
app.use('/rep', repRoutes);
app.use('/municipio', municipioRoutes);
app.use('/estado', estadoRoutes);
app.use('/nivel', nivelRoutes);
app.use('/asunto', asuntoRoutes);
app.use('/status', statusRoutes);
app.use('/turno', turnoRoutes);

export default app;