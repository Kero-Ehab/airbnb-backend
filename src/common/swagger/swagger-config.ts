import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {API_TAGS} from "./constant";

export class SwaggerConfig {
    static setupSwagger(app: INestApplication) :void{
        const config = new DocumentBuilder()
        .setTitle("Airbnb clone API")
        .setDescription("This is APIs for airbnb clone")
        .setVersion('1.0')
        .build();
    

        const documentFactory = () => SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, documentFactory,{
            swaggerOptions:{
                filter:true,
                displayRequestDuration:true,                
          }
        });
    }
}