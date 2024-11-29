## Información del Parcial

- **Nombre**: Santiago Navarrete
- **Código**: 202211202
- **Usuario**: s.navarretev

---

## Descripción General

Este proyecto implementa un backend NestJS y TypeORM, enfocada en la gestión de entidades como **Usuario**, **Clase** y **Bono**. Se desarrollaron la persistencia, los servicios y controladores correspondientes, aplicando reglas de negocio específicas y asegurando la integridad de los datos.

---

## Descripción Detallada

### Funcionalidades Implementadas

- **Usuario**:
  - Creación de usuarios con roles específicos (*Profesor* y *Decana*).
  - Validaciones de negocio, como la pertenencia a ciertos grupos de investigación para los profesores y la longitud de la extensión telefónica para las decanas.
  - Eliminación de usuarios, con restricciones si tienen bonos asociados o si el usuario es una decana.

- **Clase**:
  - Creación de clases asociadas a un usuario (profesor).
  - Validación de que el código de la clase tenga más de 10 caracteres.
  - Consulta de clases por ID.

- **Bono**:
  - Creación de bonos asociados a usuarios y clases.
  - Validación de que el monto sea positivo y que el usuario tenga el rol de profesor.
  - Consulta de bonos por código de clase y por ID de usuario.
  - Eliminación de bonos, con restricciones si la calificación es mayor a 4.

### Pruebas Realizadas

Se implementaron pruebas unitarias para los servicios desarrollados en la capa de lógica, incluyendo al menos un caso positivo y un caso negativo para cada método. Las pruebas se realizaron utilizando Jest y `@nestjs/testing`.

#### Casos Positivos

- Verificación de que los métodos funcionen correctamente con datos válidos.
- Aseguramiento de que las entidades se crean, consultan y eliminan según lo esperado.

#### Casos Negativos

- Pruebas con IDs inexistentes para verificar el manejo adecuado de errores y excepciones.
- Intentos de creación de entidades con datos que violan las reglas de negocio (por ejemplo, códigos de clase demasiado cortos, usuarios con roles inválidos).
- Verificación de que se lancen excepciones apropiadas cuando se intenta eliminar entidades que no deben ser eliminadas debido a restricciones de negocio.

### Documentación del API

Se creó la documentación en **Postman** para el API REST, incluyendo:

- Descripción de cada endpoint disponible.
- Ejemplos de peticiones con los datos necesarios.
- Ejemplos de respuestas, incluyendo códigos de estado y mensajes de error.

---

## Justificación de las Pruebas Seleccionadas

Decidí probar los casos seleccionados para asegurar que la lógica de negocio implementada en los servicios funcione correctamente y maneje adecuadamente las situaciones tanto esperadas como inesperadas. Al incluir casos negativos, como probar solicitudes con IDs inexistentes o datos que violan las restricciones de negocio, pude:

- **Validar la Robustez del Sistema**: Garantizar que el API maneje errores de forma controlada y proporcione mensajes de error al usuario.

- **Verificar las Validaciones de Negocio**: Asegurar que las reglas de negocio definidas (por ejemplo, restricciones en roles, validaciones de campos) se apliquen correctamente y prevengan operaciones no deseadas.

- **Mejorar la Experiencia del Usuario**: Al probar cómo el sistema responde a entradas inválidas, puedo mejorar la forma en que se comunican los errores al usuario final, facilitando la resolución de problemas.

- **Asegurar la Integridad de los Datos**: Evitar inconsistencias en la base de datos al garantizar que solo se permitan operaciones válidas y que se impidan aquellas que puedan causar conflictos o violaciones a las reglas establecidas.

---

## Instrucciones para Ejecutar el Proyecto

1. **Descargar el último Release**

   ```bash
   https://github.com/Navasanti19/Parcial2Web.git
   ```

2. **Instalar Dependencias**

   Navega al directorio del proyecto y ejecuta:

   ```bash
   npm install
   ```

3. **Configurar la Base de Datos**

   - Usar PostgreSQL.
   - Configurar las credenciales y la conexión en el archivo `app.module.ts` o en un archivo de configuración.


4. **Iniciar la Aplicación**

   ```bash
   npm run start
   ```

5. **Ejecutar las Pruebas**

   Para ejecutar las pruebas unitarias:

   ```bash
   npm run test
   ```

---

## Uso del API

- **Documentación en Postman**: Importa la colección de Postman incluida en el proyecto para acceder a ejemplos de peticiones y respuestas.
- **Endpoints Disponibles**:
  - `/usuarios`: CRUD de usuarios.
  - `/clases`: CRUD de clases.
  - `/bonos`: CRUD de bonos.
