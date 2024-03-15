import express, { Router } from 'express';
import path from 'path';
import compression from 'compression';

interface Options {
  port: number;
  router: Router;
  publicPath?: string;
}

export class Server {
  public readonly app = express();

  private setverListener?: any;

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor({ port, publicPath = 'public', router }: Options) {
    this.port = port;
    this.publicPath = publicPath;
    this.routes = router;
  }

  async start() {
    //* Middlewares
    //? funcion que se va a ejecutar cuando una peticion pase por ahi

    //? parcear la informacion del body y volverla json
    this.app.use(express.json());

    //?habilitar x-www-form-urlencoded (muy usado en angular)
    this.app.use(express.urlencoded({ extended: true }));

    //? ayuda a minimizar las respuestas si es podible del body, para incrementar la velocidad
    this.app.use(compression());

    //-----------

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //----------

    //* routes

    this.app.use(this.routes);

    //! cuando no se estaba haciendo esto, al recargar la pagina salia error cannot get ya con esto no se estalla la app al recargar
    this.app.get('*', (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.setverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.setverListener.close();
  }
}
