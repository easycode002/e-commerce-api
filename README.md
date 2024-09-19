## Project structure
```bash
├── nodemon.json
├── package.json
├── src
│   ├── app.ts
│   ├── configs
│   ├── config.ts
│   ├── controllers
│   │   ├── category.controller.ts
│   │   ├── product.controller.ts
│   │   └── types
│   │       ├── category-request.type.ts
│   │       ├── category-response.type.ts
│   │       ├── product-request.type.ts
│   │       └── product-response.type.ts
│   ├── database
│   │   ├── connection.ts
│   │   ├── models
│   │   │   ├── category.model.ts
│   │   │   └── product.model.ts
│   │   └── repositories
│   │       ├── category.repository.ts
│   │       └── product.repository.ts
│   ├── docs
│   │   └── swagger.json
│   ├── routes
│   │   └── v1
│   │       └── routes.ts
│   ├── schemas
│   │   ├── category.schema.ts
│   │   └── product.schema.ts
│   ├── server.ts
│   └── services
│       ├── category.service.ts
│       └── product.service.ts
├── tsconfig.json
└── tsoa.json
```