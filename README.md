# CCSE Project - Aplicación de Preparación para el Examen CCSE

Una aplicación web moderna para la preparación del examen **CCSE (Conocimientos Constitucionales y Socioculturales de España)** desarrollada con Vue 3, Quasar Framework y AWS Amplify.

## 📋 Descripción

Esta aplicación es un **complemento de estudio** para preparar el examen CCSE del Instituto Cervantes. **No sustituye** la aplicación oficial, sino que ayuda a practicar de forma guiada y optimizar el tiempo de estudio.

### Características Principales

- 🎯 **Exámenes aleatorios** que respetan la distribución por tareas del CCSE
- 📊 **Panel de estadísticas** para identificar fortalezas y áreas de mejora
- 📚 **5 tareas temáticas** organizadas según el manual oficial
- 💾 **Almacenamiento en la nube** con AWS Amplify
- 📱 **Diseño responsivo** compatible con móviles y escritorio
- 🔄 **Sincronización en tiempo real** de progreso y estadísticas

## 🏗️ Arquitectura Técnica

### Frontend
- **Framework**: Quasar v2.16.0 (Vue 3.4.18)
- **Lenguaje**: TypeScript 5.5.3
- **Estado**: Pinia 3.0.1
- **Routing**: Vue Router 4.0.12
- **UI**: Material Design con Quasar Components

### Backend
- **Plataforma**: AWS Amplify
- **API**: GraphQL con AWS AppSync
- **Base de datos**: Amazon DynamoDB
- **Autenticación**: AWS Cognito (configurado para acceso público)
- **Hosting**: Amazon S3 + CloudFront

### Estructura de Datos

```graphql
type Tasks {
  task: Int! @primaryKey
  title: String!
  description: String
  questions: [Questions!]! @hasMany
}

type Questions {
  code: Int! @primaryKey
  task: Int! @index
  text: String!
  choices: [Choice!]!
  correctChoiceId: String!
  topicTags: [String!]
}

type Choice {
  id: String!    # A, B, C
  text: String!  # Texto de la opción
}
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- AWS CLI configurado
- Amplify CLI instalado globalmente
- Yarn o npm

### Configuración del Proyecto

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd ccse-project
```

2. **Instalar dependencias**
```bash
yarn install
# o
npm install
```

3. **Configurar AWS Amplify**
```bash
amplify configure
amplify init
amplify push
```

4. **Importar datos de preguntas**
```bash
cd sources
npm install
npm run import:all
```

5. **Ejecutar en desarrollo**
```bash
yarn dev
# o
npm run dev
```

## 📁 Estructura del Proyecto

```
ccse-project/
├── amplify/                 # Configuración AWS Amplify
│   ├── backend/
│   │   ├── api/             # Schema GraphQL
│   │   └── hosting/         # Configuración S3/CloudFront
├── sources/                 # Herramientas de importación
│   ├── data/               # Archivos JSON con preguntas
│   ├── src/                # Scripts de importación
│   └── Manual CCSE 2025_1.pdf
├── src/                    # Código fuente de la aplicación
│   ├── components/         # Componentes Vue reutilizables
│   ├── pages/             # Páginas de la aplicación
│   ├── graphql/           # Queries y mutations GraphQL
│   ├── layouts/           # Layouts de la aplicación
│   └── router/            # Configuración de rutas
└── public/                # Archivos estáticos
```

## 🎮 Funcionalidades

### Páginas Principales

1. **Página de Inicio** (`/`)
   - Bienvenida y explicación de la aplicación
   - Consejos de estudio
   - Navegación a funcionalidades principales

2. **Lista de Tareas** (`/tasks`)
   - 5 tareas temáticas del CCSE
   - Acceso directo a preguntas por tarea

3. **Preguntas por Tarea** (`/questions/:id`)
   - Visualización de todas las preguntas de una tarea
   - Respuestas correctas marcadas
   - Navegación intuitiva

4. **Panel de Estadísticas** (`/stats`)
   - Análisis de rendimiento por tarea
   - Identificación de áreas de mejora
   - Progreso histórico

### Características Técnicas

- **Almacenamiento local**: Gestión de sesiones con Quasar LocalStorage
- **Notificaciones**: Sistema de notificaciones integrado
- **Carga optimizada**: Lazy loading de componentes
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## 📊 Datos y Contenido

### Fuente de Preguntas
- **Manual CCSE 2025** del Instituto Cervantes
- **300+ preguntas** distribuidas en 5 tareas temáticas
- **Formato normalizado** con opciones múltiples (A, B, C)

### Distribución por Tareas
- **Tarea 0**: Preguntas generales
- **Tarea 1**: Gobierno, legislación y participación ciudadana
- **Tarea 2**: Historia de España
- **Tarea 3**: Cultura española
- **Tarea 4**: Geografía física y política de España

## 🛠️ Scripts Disponibles

### Desarrollo
```bash
yarn dev          # Servidor de desarrollo
yarn build        # Build de producción
yarn lint         # Linting del código
yarn format       # Formateo del código
```

### Importación de Datos
```bash
cd sources
npm run import:question    # Importar preguntas principales
npm run import:bycode     # Importar índice por código
npm run import:bytask     # Importar índice por tarea
npm run import:byrand     # Importar índice aleatorio
npm run import:all        # Importar todos los datos
```

## 🔧 Configuración de AWS

### Servicios Utilizados
- **AWS AppSync**: API GraphQL
- **Amazon DynamoDB**: Base de datos NoSQL
- **Amazon S3**: Almacenamiento de archivos estáticos
- **Amazon CloudFront**: CDN para distribución global
- **AWS Cognito**: Autenticación (configurado para acceso público)

### Variables de Entorno
El proyecto utiliza la configuración automática de Amplify a través de `amplifyconfiguration.json`.

## 🤝 Contribución

Este proyecto es de uso educativo. Para contribuir:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## ⚖️ Licencia

Este proyecto está bajo una licencia no comercial. Ver [LICENSE.md](LICENSE.md) para más detalles.

## 📞 Contacto

**Autor**: Eliezer Rangel  
**Email**: eliecer2000@gmail.com

## ⚠️ Disclaimer

Esta aplicación es un complemento de estudio y **NO sustituye** la preparación oficial del Instituto Cervantes. Es responsabilidad del usuario verificar la información y complementar su estudio con fuentes oficiales.

---

**Versión**: 0.0.1  
**Última actualización**: 2024