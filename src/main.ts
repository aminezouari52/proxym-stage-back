import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const appOptions = { cors: true }
  const app = await NestFactory.create(ApplicationModule, appOptions)
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.enableCors()
  app.setGlobalPrefix('api')

  const options = new DocumentBuilder()
    .setTitle('Proxym Trainees Platform')
    .setDescription('Trainees Platform')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document)

  await app.listen(3000)
}
bootstrap()
