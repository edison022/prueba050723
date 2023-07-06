//Importamos la clase EventEmitter del módulo events para utilizar el patrón Observer.
import { EventEmitter } from 'events';

//Definimos la clase base Laboratorio que tiene propiedades nombre y software, y métodos para obtener el nombre y el software del laboratorio.
class Laboratorio {
  protected nombre: string;
  protected software: string[];

  constructor(nombre: string, software: string[]) {
    this.nombre = nombre;
    this.software = software;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getSoftware(): string[] {
    return this.software;
  }
}

/*
Se aplica la herencia en las clases LaboratorioLogicaBasica, LaboratorioLogicaAvanzada, 
LaboratorioEmpresarial y LaboratorioRetos, que heredan de la clase base Laboratorio.
*/
class LaboratorioLogicaBasica extends Laboratorio {
  constructor() {
    super('Laboratorio de Lógica Básica', ['Sratch', 'Python']);
  }
}

class LaboratorioLogicaAvanzada extends Laboratorio {
  constructor() {
    super('Laboratorio de Lógica Avanzada', ['Prolog', 'Haskell']);
  }
}

class LaboratorioEmpresarial extends Laboratorio {
  constructor() {
    super('Laboratorio Empresarial', ['SAP ABAP', 'Microsoft Visual Studio']);
  }
}

class LaboratorioRetos extends Laboratorio {
  constructor() {
    super('Laboratorio de Retos', ['Coderbyte', 'LeetCode']);
  }
}
/*
Se utilizar el polimorfismo al tratar a los objetos de las clases hijas (LaboratorioLogicaBasica, LaboratorioLogicaAvanzada, LaboratorioEmpresarial, 
LaboratorioRetos y ComputadoraConExtra) como instancias de sus respectivas clases base (Laboratorio y Computadora).
*/
class Computadora {
  protected nombre: string;
  protected software: string[];

  constructor(nombre: string, software: string[]) {
    this.nombre = nombre;
    this.software = software;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getSoftware(): string[] {
    return this.software;
  }
}
/*
 se utiliza la herencia en las clases ComputadoraConExtra, que hereda de la clase base Computadora.
*/
class ComputadoraConExtra extends Computadora {
  private extra: string[];
/*
Se utiliza el patrón Decorator al crear la clase ComputadoraConExtra.
Esta clase decoradora extiende la funcionalidad de la clase Computadora al agregar
*/
  constructor(computadora: Computadora, extra: string[]) {
    super(computadora.getNombre(), computadora.getSoftware());
    this.extra = extra;
  }

  public getSoftware(): string[] {
    return [...super.getSoftware(), ...this.extra];
  }
}

/*
Se aplica la asociación entre la clase Participante y la clase Laboratorio, donde un participante tiene una referencia a un laboratorio, 
esto se logra a través de la propiedad laboratorio en la clase Participante.
*/
class Participante {
  private nombre: string;
  private modalidad: string;
  private laboratorio: Laboratorio;
  private computadora: Computadora;
/*
Se utiliza la composición en la clase Participante, que contiene una instancia de Laboratorio y Computadora como propiedades.
*/
  constructor(nombre: string, modalidad: string, laboratorio: Laboratorio, computadora: Computadora) {
    this.nombre = nombre;
    this.modalidad = modalidad;
    this.laboratorio = laboratorio;
    this.computadora = computadora;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getModalidad(): string {
    return this.modalidad;
  }

  public getLaboratorio(): Laboratorio {
    return this.laboratorio;
  }

  public getComputadora(): Computadora {
    return this.computadora;
  }
}
/*
Se utiliza la agregación en la clase Concurso, que tiene una colección de objetos Participante.
La clase Concurso "posee" varios participantes, pero los participantes existen de manera independiente del concurso.
*/

class Concurso {
  private participantes: Participante[];
  private eventEmitter: EventEmitter;

  constructor() {
    this.participantes = [];
    this.eventEmitter = new EventEmitter();
  }

  public agregarParticipante(participante: Participante): void {
    this.participantes.push(participante);
    this.eventEmitter.emit('cambio', participante);
  }
/*
Se utiliza el patrón Observer en la clase Concurso.
La clase Concurso emite eventos utilizando EventEmitter cuando se agrega un participante.
Otros objetos pueden suscribirse a estos eventos y tomar acciones en respuesta a los cambios de estado en el concurso.
*/
  public mostrarDetalleParticipantes(): void {
    this.eventEmitter.on('cambio', (participante: Participante) => {
      console.log('--------------------------------------');
      console.log('Nombre del participante:', participante.getNombre());
      console.log('Modalidad:', participante.getModalidad());
      console.log('Laboratorio:', participante.getLaboratorio().getNombre());
      console.log('Computadora:', participante.getComputadora().getNombre());
      console.log('Software incluido por el laboratorio:', participante.getLaboratorio().getSoftware());
      console.log('Software requerido por el participante:', participante.getComputadora().getSoftware());
      console.log('--------------------------------------');
      console.log();
    });

    this.participantes.forEach((participante) => {
      this.eventEmitter.emit('cambio', participante);
    });
  }
}
/*
Se aplica el patrón Singleton en la clase DataList.
Solo se permite una única instancia de DataList y se accede a ella a través del método estático getInstance().
*/

// Crear laboratorios utilizando herencia
const labLogicaBasica = new LaboratorioLogicaBasica();
const labLogicaAvanzada = new LaboratorioLogicaAvanzada();
const labEmpresarial = new LaboratorioEmpresarial();
const labRetos = new LaboratorioRetos();

// Crear computadoras
const comp1 = new Computadora('Computadora 1', ['SQL', 'PostgreSQL']);
const comp2 = new Computadora('Computadora 2', ['Software2', 'Lisp']);
const comp3 = new Computadora('Computadora 3', ['Java', 'Ruby on Rails']);
const comp4 = new Computadora('Computadora 4', ['CodeSignal', 'LeetCode']);

// Crear participantes utilizando composición y el patrón Decorator
const participante1 = new Participante('Juan', 'Lógica básica', labLogicaBasica, comp1);
const participante2 = new Participante('María', 'Lógica avanzada', labLogicaAvanzada, comp2);
const participante3 = new Participante('Pedro', 'Empresarial', labEmpresarial, new ComputadoraConExtra(comp3, ['Tynker']));
const participante4 = new Participante('Ana', 'Retos', labRetos, new ComputadoraConExtra(comp4, ['HackerRank']));

// Crear el concurso    
const concurso = new Concurso();

// Agregar participantes al concurso
concurso.agregarParticipante(participante1);
concurso.agregarParticipante(participante2);
concurso.agregarParticipante(participante3);
concurso.agregarParticipante(participante4);

// Mostrar detalle de los participantes
concurso.mostrarDetalleParticipantes();
/*
Se siguen los principios SOLID de manera general en el código.
Las clases tienen responsabilidades únicas y están acopladas de forma baja.
Por ejemplo, la clase Concurso tiene la responsabilidad de agregar participantes y mostrar detalles, 
mientras que las clases Laboratorio, Computadora y Participante también tienen responsabilidades específicas.
*/
